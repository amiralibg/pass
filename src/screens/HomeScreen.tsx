import { motion } from 'motion/react'
import { HelpCircle, Users } from 'lucide-react'
import { FuseMark, ImpostorMark, PassMark } from '../components/icons/BrandMarks'
import { HomeControls } from '../components/ui/HomeControls'
import { GAMES } from '../games/registry'
import type { GameId } from '../games/types'
import { useT } from '../i18n/useT'
import type { MessageKey } from '../i18n/messages'
import { useSession } from '../store/session'
import { Button } from '../components/ui/Button'
import { Screen } from '../components/ui/Screen'
import { cn } from '../lib/cn'

const marks = {
  impostor: ImpostorMark,
  fuse: FuseMark,
} as const

const gameNameKey: Record<GameId, MessageKey> = {
  impostor: 'games.impostor.name',
  fuse: 'games.fuse.name',
}

const gameTaglineKey: Record<GameId, MessageKey> = {
  impostor: 'games.impostor.tagline',
  fuse: 'games.fuse.tagline',
}

export function HomeScreen() {
  const selectGame = useSession((s) => s.selectGame)
  const openHowTo = useSession((s) => s.openHowTo)
  const t = useT()

  return (
    <Screen className="justify-between gap-8 pb-8">
      <div className="pt-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <HomeControls />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mt-5 flex items-center gap-3">
            <PassMark className="size-12 shadow-[0_8px_30px_rgb(61_222_176_/_0.15)]" />
            <div>
              <p className="label-caps text-xs font-semibold text-mint">
                {t('home.eyebrow')}
              </p>
              <h1 className="font-display text-[3.4rem] leading-none font-extrabold tracking-tight text-fog">
                Pass
              </h1>
            </div>
          </div>
          <p className="home-tagline mt-5 max-w-[19rem] text-lg leading-snug text-fog-dim">
            {t('home.tagline')}
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
                  'group relative w-full overflow-hidden rounded-[1.4rem] border border-fog/10 px-4 py-4 text-start transition-[transform,background-color,border-color] duration-200',
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
                      {t(gameNameKey[game.id])}
                    </p>
                    <p className="mt-0.5 text-[15px] leading-snug text-fog-dim">
                      {t(gameTaglineKey[game.id])}
                    </p>
                    <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-fog-mute">
                      <Users className="size-3.5" strokeWidth={2.25} />
                      {t('home.playersRange', {
                        min: game.minPlayers,
                        max: game.maxPlayers,
                      })}
                    </p>
                  </div>
                  <span
                    className={cn(
                      'label-caps shrink-0 rounded-full px-3 py-1 text-xs font-semibold',
                      game.accent === 'spark'
                        ? 'bg-spark/20 text-spark'
                        : 'bg-gold/20 text-gold',
                    )}
                  >
                    {t('home.play')}
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
          {t('home.howPass')}
        </Button>
        <p className="text-center text-sm text-fog-mute">{t('home.footer')}</p>
      </motion.div>
    </Screen>
  )
}
