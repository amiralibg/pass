import { motion } from 'motion/react'
import { HelpCircle, Users } from 'lucide-react'
import { FuseMark, ImpostorMark, PassMark } from '../components/icons/BrandMarks'
import { GAMES } from '../games/registry'
import { useSession } from '../store/session'
import { Button } from '../components/ui/Button'
import { Screen } from '../components/ui/Screen'
import { cn } from '../lib/cn'

const marks = {
  impostor: ImpostorMark,
  fuse: FuseMark,
} as const

export function HomeScreen() {
  const selectGame = useSession((s) => s.selectGame)
  const openHowTo = useSession((s) => s.openHowTo)

  return (
    <Screen className="justify-between gap-8 pb-8">
      <div className="pt-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3">
            <PassMark className="size-12 shadow-[0_8px_30px_rgb(61_222_176_/_0.15)]" />
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] text-mint uppercase">
                One device · many players
              </p>
              <h1 className="font-display text-[3.4rem] leading-none font-extrabold tracking-tight text-fog">
                Pass
              </h1>
            </div>
          </div>
          <p className="mt-5 max-w-[19rem] text-lg leading-snug text-fog-dim">
            Party games you hand around the table. Start with two — grow the night.
          </p>
        </motion.div>

        <motion.div
          className="mt-10 space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {GAMES.map((game) => {
            const Mark = marks[game.id]
            return (
              <button
                key={game.id}
                type="button"
                onClick={() => selectGame(game.id)}
                className={cn(
                  'group relative w-full overflow-hidden rounded-[1.4rem] border border-fog/10 px-4 py-4 text-left transition-[transform,background-color,border-color] duration-200',
                  'bg-ink/40 hover:-translate-y-0.5 hover:border-fog/22 hover:bg-ink/55',
                )}
              >
                <div className="flex items-center gap-4">
                  <Mark className="size-14" />
                  <div className="min-w-0 flex-1">
                    <p
                      className={cn(
                        'font-display text-2xl font-bold tracking-tight',
                        game.accent === 'spark' ? 'text-spark' : 'text-gold',
                      )}
                    >
                      {game.name}
                    </p>
                    <p className="mt-0.5 text-[15px] leading-snug text-fog-dim">
                      {game.tagline}
                    </p>
                    <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-fog-mute">
                      <Users className="size-3.5" strokeWidth={2.25} />
                      {game.minPlayers}–{game.maxPlayers} players
                    </p>
                  </div>
                  <span
                    className={cn(
                      'shrink-0 rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase',
                      game.accent === 'spark'
                        ? 'bg-spark/20 text-spark'
                        : 'bg-gold/20 text-gold',
                    )}
                  >
                    Play
                  </span>
                </div>
              </button>
            )
          })}
        </motion.div>
      </div>

      <motion.div
        className="flex flex-col gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
      >
        <Button variant="secondary" onClick={() => openHowTo()} className="w-full">
          <HelpCircle className="size-4" />
          How Pass works
        </Button>
        <p className="text-center text-sm text-fog-mute">
          Built to expand — drop new games into the same lobby.
        </p>
      </motion.div>
    </Screen>
  )
}
