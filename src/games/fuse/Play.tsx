import { motion } from 'motion/react'
import { useOnExpire } from '../../hooks/useCountdown'
import { useSession } from '../../store/session'
import { Button } from '../../components/ui/Button'
import { FadeSwap } from '../../components/ui/FadeSwap'
import { Screen } from '../../components/ui/Screen'
import { TopBar } from '../../components/ui/TopBar'
import { BombMark } from '../../components/icons/BrandMarks'
import { Heart } from 'lucide-react'
import { cn } from '../../lib/cn'
import { useFuse } from './store'

export function FusePlay() {
  const players = useSession((s) => s.players)
  const backToSetup = useSession((s) => s.backToSetup)
  const goHome = useSession((s) => s.goHome)

  const phase = useFuse((s) => s.phase)
  const order = useFuse((s) => s.order)
  const holderIndex = useFuse((s) => s.holderIndex)
  const lives = useFuse((s) => s.lives)
  const prompt = useFuse((s) => s.prompt)
  const fuseEndsAt = useFuse((s) => s.fuseEndsAt)
  const lastEliminatedId = useFuse((s) => s.lastEliminatedId)
  const winnerId = useFuse((s) => s.winnerId)
  const passBomb = useFuse((s) => s.passBomb)
  const explode = useFuse((s) => s.explode)
  const continueAfterBoom = useFuse((s) => s.continueAfterBoom)
  const playAgain = useFuse((s) => s.playAgain)
  const reset = useFuse((s) => s.reset)

  useOnExpire(fuseEndsAt, phase === 'hold', explode)

  const leave = () => {
    reset()
    backToSetup()
  }

  const holderId = order[holderIndex]
  const holder = players.find((p) => p.id === holderId)
  const winner = players.find((p) => p.id === winnerId)
  const boomPlayer = players.find((p) => p.id === lastEliminatedId)

  const lifeRow = order.map((id) => {
    const p = players.find((pl) => pl.id === id)
    return { id, name: p?.name ?? '?', lives: lives[id] ?? 0 }
  })

  if (phase === 'hold') {
    return (
      <Screen>
        <TopBar title="Fuse" onBack={leave} />
        <FadeSwap id={holderId ?? 'hold'} className="flex flex-1 flex-col">
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            {lifeRow.map((row) => (
              <div
                key={row.id}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm',
                  row.id === holderId
                    ? 'border-spark/50 bg-spark/15 text-fog'
                    : row.lives === 0
                      ? 'border-fog/5 text-fog-mute line-through opacity-40'
                      : 'border-fog/10 bg-ink/40 text-fog-dim',
                )}
              >
                <span className="font-medium">{row.name}</span>
                <span className="inline-flex items-center gap-0.5">
                  {Array.from({ length: Math.max(row.lives, 0) }).map((_, i) => (
                    <Heart
                      key={i}
                      className="size-3 fill-gold text-gold"
                      strokeWidth={0}
                    />
                  ))}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.15, repeat: Infinity, ease: 'easeInOut' }}
              className="relative mb-8 flex size-40 items-center justify-center"
            >
              <div className="absolute inset-2 rounded-full bg-spark/25 blur-2xl" />
              <BombMark className="relative size-28" />
            </motion.div>

            <p className="text-sm font-medium tracking-[0.18em] text-spark uppercase">
              {holder?.name} holds the fuse
            </p>
            <h2 className="mt-4 max-w-sm font-display text-3xl font-extrabold tracking-tight text-fog">
              {prompt}
            </h2>
            <p className="mt-4 max-w-xs text-fog-dim">
              Answer out loud, then pass — the timer is secret.
            </p>
          </div>

          <Button className="w-full" size="xl" variant="danger" onClick={passBomb}>
            Pass it on
          </Button>
        </FadeSwap>
      </Screen>
    )
  }

  if (phase === 'boom') {
    return (
      <Screen>
        <TopBar title="Boom" onBack={leave} />
        <FadeSwap
          id={`boom-${lastEliminatedId}`}
          className="flex flex-1 flex-col items-center justify-center text-center"
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 16 }}
            className="w-full rounded-[1.75rem] border border-spark/35 bg-spark/12 px-8 py-10"
          >
            <p className="font-display text-6xl font-extrabold tracking-tight text-spark">
              BOOM
            </p>
            <p className="mt-4 text-xl text-fog">{boomPlayer?.name} loses a life</p>
            <p className="mt-2 inline-flex items-center justify-center gap-1 text-fog-mute">
              <Heart className="size-3.5 fill-gold text-gold" strokeWidth={0} />
              {lives[lastEliminatedId ?? ''] ?? 0} left
            </p>
          </motion.div>
        </FadeSwap>
        <Button className="w-full" size="xl" onClick={continueAfterBoom}>
          Keep going
        </Button>
      </Screen>
    )
  }

  if (phase === 'winner') {
    return (
      <Screen>
        <TopBar title="Winner" onBack={leave} />
        <FadeSwap
          id="winner"
          className="flex flex-1 flex-col items-center justify-center text-center"
        >
          <p className="text-sm font-medium tracking-[0.18em] text-gold uppercase">
            Last standing
          </p>
          <h2 className="mt-3 font-display text-5xl font-extrabold tracking-tight">
            {winner?.name ?? 'Nobody'}
          </h2>
          <p className="mt-4 text-fog-dim">Survived the fuse. Absolute legend.</p>
        </FadeSwap>
        <div className="mt-auto flex flex-col gap-3">
          <Button className="w-full" size="xl" variant="danger" onClick={playAgain}>
            Rematch
          </Button>
          <Button
            className="w-full"
            variant="secondary"
            onClick={() => {
              reset()
              backToSetup()
            }}
          >
            Change settings
          </Button>
          <Button
            className="w-full"
            variant="ghost"
            size="md"
            onClick={() => {
              reset()
              goHome()
            }}
          >
            Back to Pass
          </Button>
        </div>
      </Screen>
    )
  }

  return (
    <Screen>
      <TopBar title="Fuse" onBack={leave} />
      <div className="flex flex-1 items-center justify-center">
        <Button variant="danger" onClick={() => useFuse.getState().beginRound()}>
          Light it
        </Button>
      </div>
    </Screen>
  )
}
