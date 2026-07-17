import { motion } from 'motion/react'
import { Eye, EyeOff } from 'lucide-react'
import { useCountdown, useOnExpire, formatTime } from '../../hooks/useCountdown'
import { useSession } from '../../store/session'
import { Button } from '../../components/ui/Button'
import { FadeSwap } from '../../components/ui/FadeSwap'
import { Screen } from '../../components/ui/Screen'
import { TopBar } from '../../components/ui/TopBar'
import { cn } from '../../lib/cn'
import { useImpostor } from './store'

export function ImpostorPlay() {
  const players = useSession((s) => s.players)
  const backToSetup = useSession((s) => s.backToSetup)
  const goHome = useSession((s) => s.goHome)

  const phase = useImpostor((s) => s.phase)
  const secretWord = useImpostor((s) => s.secretWord)
  const impostorIds = useImpostor((s) => s.impostorIds)
  const revealIndex = useImpostor((s) => s.revealIndex)
  const revealed = useImpostor((s) => s.revealed)
  const discussEndsAt = useImpostor((s) => s.discussEndsAt)
  const votes = useImpostor((s) => s.votes)
  const eliminatedId = useImpostor((s) => s.eliminatedId)
  const showReveal = useImpostor((s) => s.showReveal)
  const hideAndAdvance = useImpostor((s) => s.hideAndAdvance)
  const goToVote = useImpostor((s) => s.goToVote)
  const castVote = useImpostor((s) => s.castVote)
  const finishVote = useImpostor((s) => s.finishVote)
  const playAgain = useImpostor((s) => s.playAgain)
  const reset = useImpostor((s) => s.reset)

  const player = players[revealIndex]
  const isImpostor = player ? impostorIds.includes(player.id) : false
  const { remainingSec } = useCountdown(phase === 'discuss' ? discussEndsAt : null)
  useOnExpire(discussEndsAt, phase === 'discuss', goToVote)

  const leave = () => {
    reset()
    backToSetup()
  }

  if (phase === 'pass' || phase === 'reveal') {
    return (
      <Screen>
        <TopBar title="Pass the phone" onBack={leave} />
        <FadeSwap id={`${player?.id}-${revealed ? 'on' : 'off'}`} className="flex flex-1 flex-col">
          {!revealed ? (
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <p className="text-sm font-medium tracking-[0.18em] text-gold uppercase">
                Hand to
              </p>
              <h2 className="mt-3 font-display text-5xl font-extrabold tracking-tight">
                {player?.name}
              </h2>
              <p className="mt-4 max-w-xs text-fog-dim">
                Everyone else: look away. Only {player?.name} should see the next screen.
              </p>
              <div className="mt-12 w-full">
                <Button className="w-full" size="xl" onClick={showReveal}>
                  <Eye className="size-5" />
                  I’m {player?.name} — reveal
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                className={cn(
                  'w-full rounded-[1.75rem] border px-6 py-10',
                  isImpostor
                    ? 'border-spark/40 bg-spark/15'
                    : 'border-gold/35 bg-gold/10',
                )}
              >
                <p
                  className={cn(
                    'text-sm font-semibold tracking-[0.2em] uppercase',
                    isImpostor ? 'text-spark' : 'text-gold',
                  )}
                >
                  {isImpostor ? 'You are the Impostor' : 'Secret word'}
                </p>
                <p className="mt-4 font-display text-4xl font-extrabold tracking-tight text-fog">
                  {isImpostor ? 'IMPOSTOR' : secretWord}
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-fog-dim">
                  {isImpostor
                    ? 'Blend in. Figure out the word from how people talk — then survive the vote.'
                    : 'Talk about this without saying it. Find who doesn’t know it.'}
                </p>
              </motion.div>
              <div className="mt-10 w-full">
                <Button className="w-full" size="xl" variant="secondary" onClick={hideAndAdvance}>
                  <EyeOff className="size-5" />
                  Hide & pass on
                </Button>
              </div>
            </div>
          )}
        </FadeSwap>
      </Screen>
    )
  }

  if (phase === 'discuss') {
    return (
      <Screen>
        <TopBar title="Discussion" onBack={leave} />
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <p className="text-sm font-medium tracking-[0.18em] text-gold uppercase">
            Time left
          </p>
          <p className="mt-3 font-display text-7xl font-extrabold tracking-tight tabular-nums text-fog">
            {formatTime(remainingSec)}
          </p>
          <p className="mt-5 max-w-sm text-lg text-fog-dim">
            Talk about the word. Don’t say it. Hunt for the impostor
            {impostorIds.length > 1 ? 's' : ''}.
          </p>
        </div>
        <Button className="w-full" size="xl" variant="secondary" onClick={goToVote}>
          Skip to vote
        </Button>
      </Screen>
    )
  }

  if (phase === 'vote') {
    const voter = players.find((p) => !votes[p.id])
    const allVoted = players.every((p) => votes[p.id])

    if (allVoted) {
      return (
        <Screen>
          <TopBar title="Vote" onBack={leave} />
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <h2 className="font-display text-4xl font-bold">Everyone voted</h2>
            <p className="mt-3 text-fog-dim">Ready to see who got pointed out?</p>
          </div>
          <Button className="w-full" size="xl" onClick={finishVote}>
            Reveal results
          </Button>
        </Screen>
      )
    }

    return (
      <Screen>
        <TopBar title="Vote" onBack={leave} />
        <FadeSwap id={voter?.id ?? 'vote'} className="flex flex-1 flex-col">
          <p className="text-sm font-medium tracking-[0.18em] text-gold uppercase">
            Voting now
          </p>
          <h2 className="mt-2 font-display text-4xl font-extrabold tracking-tight">
            {voter?.name}
          </h2>
          <p className="mt-2 text-fog-dim">
            Who is the impostor? Others: look away. Tap one name.
          </p>

          <div className="mt-8 grid gap-2">
            {players
              .filter((p) => p.id !== voter?.id)
              .map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => voter && castVote(voter.id, p.id)}
                  className="rounded-2xl border border-fog/12 bg-ink/30 px-4 py-4 text-left text-lg font-semibold text-fog transition-colors hover:border-gold/40 hover:bg-gold/10"
                >
                  {p.name}
                </button>
              ))}
          </div>
        </FadeSwap>
      </Screen>
    )
  }

  if (phase === 'result') {
    const eliminated = players.find((p) => p.id === eliminatedId)
    const impostors = players.filter((p) => impostorIds.includes(p.id))
    const caught =
      eliminatedId !== null && impostorIds.includes(eliminatedId)
    const tie = eliminatedId === null

    return (
      <Screen>
        <TopBar title="Results" onBack={leave} />
        <FadeSwap id="result" className="flex flex-1 flex-col">
          <div
            className={cn(
              'rounded-[1.75rem] border px-6 py-8 text-center',
              tie
                ? 'border-fog/15 bg-ink/30'
                : caught
                  ? 'border-gold/40 bg-gold/12'
                  : 'border-spark/40 bg-spark/12',
            )}
          >
            <p className="text-sm font-semibold tracking-[0.18em] text-fog-mute uppercase">
              {tie ? 'Tie vote' : caught ? 'Table wins' : 'Impostor wins'}
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight">
              {tie
                ? 'No one eliminated'
                : caught
                  ? `Caught ${eliminated?.name}`
                  : `${eliminated?.name} was innocent`}
            </h2>
            <p className="mt-4 text-fog-dim">
              The word was <span className="font-semibold text-fog">{secretWord}</span>
            </p>
            <p className="mt-2 text-sm text-fog-mute">
              Impostor{impostors.length > 1 ? 's' : ''}:{' '}
              {impostors.map((p) => p.name).join(', ')}
            </p>
          </div>
        </FadeSwap>

        <div className="mt-auto flex flex-col gap-3 pt-6">
          <Button className="w-full" size="xl" onClick={playAgain}>
            Same crew · new word
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
      <TopBar title="Impostor" onBack={leave} />
      <div className="flex flex-1 items-center justify-center">
        <Button onClick={() => useImpostor.getState().beginRound()}>Begin</Button>
      </div>
    </Screen>
  )
}
