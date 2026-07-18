import { useMemo, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { HelpCircle, Smartphone, Users, Wifi } from 'lucide-react'
import {
  BondMark,
  FuseMark,
  HotSeatMark,
  ImpostorMark,
  LikelyMark,
  PassMark,
  SpyMark,
  StoryMark,
} from '../components/icons/BrandMarks'
import { HomeControls } from '../components/ui/HomeControls'
import { GAMES, ONLINE_GAME_IDS } from '../games/registry'
import type { GameDefinition, GameId, PlayMode } from '../games/types'
import { useT } from '../i18n/useT'
import type { MessageKey } from '../i18n/messages'
import { useSession } from '../store/session'
import { Button } from '../components/ui/Button'
import { Screen } from '../components/ui/Screen'
import { cn } from '../lib/cn'

const marks = {
  impostor: ImpostorMark,
  fuse: FuseMark,
  spy: SpyMark,
  hotseat: HotSeatMark,
  story: StoryMark,
  bond: BondMark,
  likely: LikelyMark,
} as const

const gameNameKey: Record<GameId, MessageKey> = {
  impostor: 'games.impostor.name',
  fuse: 'games.fuse.name',
  spy: 'games.spy.name',
  hotseat: 'games.hotseat.name',
  story: 'games.story.name',
  bond: 'games.bond.name',
  likely: 'games.likely.name',
}

const gameTaglineKey: Record<GameId, MessageKey> = {
  impostor: 'games.impostor.tagline',
  fuse: 'games.fuse.tagline',
  spy: 'games.spy.tagline',
  hotseat: 'games.hotseat.tagline',
  story: 'games.story.tagline',
  bond: 'games.bond.tagline',
  likely: 'games.likely.tagline',
}

function accentText(accent: GameDefinition['accent']) {
  if (accent === 'spark') return 'text-spark'
  if (accent === 'mint') return 'text-mint'
  if (accent === 'ember') return 'text-ember'
  if (accent === 'sky') return 'text-sky'
  if (accent === 'rose') return 'text-rose'
  return 'text-gold'
}

function accentPill(accent: GameDefinition['accent']) {
  if (accent === 'spark') return 'bg-spark/20 text-spark'
  if (accent === 'mint') return 'bg-mint/20 text-mint'
  if (accent === 'ember') return 'bg-ember/20 text-ember'
  if (accent === 'sky') return 'bg-sky/20 text-sky'
  if (accent === 'rose') return 'bg-rose/20 text-rose'
  return 'bg-gold/20 text-gold'
}

export function HomeScreen() {
  const selectGame = useSession((s) => s.selectGame)
  const openHowTo = useSession((s) => s.openHowTo)
  const openRoomJoin = useSession((s) => s.openRoomJoin)
  const playMode = useSession((s) => s.playMode)
  const setPlayMode = useSession((s) => s.setPlayMode)
  const t = useT()

  const tab: PlayMode = playMode === 'room' ? 'room' : 'table'

  const listed = useMemo(() => {
    if (tab === 'table') return GAMES
    return GAMES.filter((g) => ONLINE_GAME_IDS.includes(g.id))
  }, [tab])

  const soonGames = useMemo(() => {
    if (tab !== 'room') return []
    return GAMES.filter((g) => !ONLINE_GAME_IDS.includes(g.id))
  }, [tab])

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
          <p className="home-tagline mt-5 max-w-[20rem] text-lg leading-snug text-fog-dim">
            {tab === 'table' ? t('home.taglineTable') : t('home.taglineRoom')}
          </p>
        </motion.div>

        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.35 }}
        >
          <div
            role="tablist"
            aria-label={t('home.tabsLabel')}
            className="grid grid-cols-2 gap-1 rounded-2xl border border-fog/10 bg-ink/45 p-1"
          >
            <TabButton
              active={tab === 'table'}
              onClick={() => setPlayMode('table')}
              icon={<Smartphone className="size-4" strokeWidth={2.25} />}
              label={t('home.modeTable')}
            />
            <TabButton
              active={tab === 'room'}
              onClick={() => setPlayMode('room')}
              icon={<Wifi className="size-4" strokeWidth={2.25} />}
              label={t('home.modeRoom')}
            />
          </div>
        </motion.div>

        <motion.div
          key={tab}
          className="mt-6 space-y-2.5"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="label-caps text-xs font-semibold text-fog-mute">
            {tab === 'table' ? t('home.tableSection') : t('home.onlineSection')}
          </p>

          {listed.map((game) => {
            const Mark = marks[game.id]
            return (
              <button
                key={game.id}
                type="button"
                onClick={() => {
                  if (tab === 'room') {
                    openRoomJoin(game.id)
                    return
                  }
                  selectGame(game.id)
                }}
                className={cn(
                  'group relative w-full overflow-hidden rounded-[1.25rem] border border-fog/10 px-3.5 py-3 text-start transition-[transform,background-color,border-color] duration-200',
                  'bg-ink/40 hover:-translate-y-0.5 hover:border-fog/22 hover:bg-ink/55',
                )}
              >
                <div className="flex items-center gap-3">
                  <Mark className="size-12" />
                  <div className="min-w-0 flex-1">
                    <p
                      className={cn(
                        'font-display text-xl font-bold tracking-tight',
                        accentText(game.accent),
                      )}
                    >
                      {t(gameNameKey[game.id])}
                    </p>
                    <p className="mt-0.5 line-clamp-2 text-[14px] leading-snug text-fog-dim">
                      {t(gameTaglineKey[game.id])}
                    </p>
                    <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-fog-mute">
                      <Users className="size-3.5" strokeWidth={2.25} />
                      {t('home.playersRange', {
                        min: game.minPlayers,
                        max: game.maxPlayers,
                      })}
                    </p>
                  </div>
                  <span
                    className={cn(
                      'label-caps shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold',
                      tab === 'room' ? 'bg-mint/20 text-mint' : accentPill(game.accent),
                    )}
                  >
                    {tab === 'room' ? t('home.onlineBadge') : t('home.play')}
                  </span>
                </div>
              </button>
            )
          })}

          {soonGames.length > 0 && (
            <div className="pt-3">
              <p className="label-caps text-xs font-semibold text-fog-mute">
                {t('home.comingSoon')}
              </p>
              <ul className="mt-2 space-y-1.5">
                {soonGames.map((game) => (
                  <li
                    key={game.id}
                    className="flex items-center justify-between rounded-xl border border-fog/8 bg-ink/25 px-3.5 py-2.5 opacity-55"
                  >
                    <span className="text-sm font-medium text-fog-dim">
                      {t(gameNameKey[game.id])}
                    </span>
                    <span className="label-caps text-[10px] font-semibold text-fog-mute">
                      {t('home.soon')}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
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

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean
  onClick: () => void
  icon: ReactNode
  label: string
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-[0.9rem] px-3 py-2.5 text-sm font-semibold transition-colors',
        active
          ? 'bg-mint/20 text-mint'
          : 'text-fog-mute hover:bg-fog/5 hover:text-fog-dim',
      )}
    >
      {icon}
      {label}
    </button>
  )
}
