import { countLikelyPrompts } from './prompts'
import { useLikely } from './store'
import type { LikelyHeat, LikelyMode } from './prompts'
import { useSession } from '../../store/session'
import { useT } from '../../i18n/useT'
import { Button } from '../../components/ui/Button'
import { OptionCard } from '../../components/ui/OptionCard'
import { Screen } from '../../components/ui/Screen'
import { Stepper } from '../../components/ui/Stepper'
import { TopBar } from '../../components/ui/TopBar'

const MODES: LikelyMode[] = ['never', 'most']
const HEATS: LikelyHeat[] = ['normal', 'spicy']

export function LikelySetup() {
  const players = useSession((s) => s.players)
  const backToLobby = useSession((s) => s.backToLobby)
  const startPlay = useSession((s) => s.startPlay)
  const t = useT()

  const mode = useLikely((s) => s.mode)
  const heat = useLikely((s) => s.heat)
  const rounds = useLikely((s) => s.rounds)
  const setMode = useLikely((s) => s.setMode)
  const setHeat = useLikely((s) => s.setHeat)
  const setRounds = useLikely((s) => s.setRounds)
  const beginRound = useLikely((s) => s.beginRound)
  const reset = useLikely((s) => s.reset)

  const poolCount = countLikelyPrompts(mode, heat)

  const start = () => {
    beginRound()
    startPlay()
  }

  return (
    <Screen>
      <TopBar
        title={t('games.likely.name')}
        onBack={() => {
          reset()
          backToLobby()
        }}
      />

      <h2 className="font-display text-3xl font-bold tracking-tight">
        {t('likely.setup.title')}
      </h2>
      <p className="mt-2 text-fog-dim">
        {t('likely.setup.summary', { count: players.length })}
      </p>

      <div className="mt-8 space-y-3">
        <p className="label-caps text-sm font-medium text-fog-mute">
          {t('likely.setup.mode')}
        </p>
        <div className="grid grid-cols-1 gap-2">
          {MODES.map((m) => (
            <OptionCard
              key={m}
              selected={mode === m}
              onSelect={() => setMode(m)}
              title={
                m === 'never' ? t('likely.setup.never') : t('likely.setup.most')
              }
              hint={
                m === 'never'
                  ? t('likely.setup.neverHint')
                  : t('likely.setup.mostHint')
              }
            />
          ))}
        </div>

        <p className="label-caps pt-2 text-sm font-medium text-fog-mute">
          {t('likely.setup.heat')}
        </p>
        <div className="grid grid-cols-2 gap-2">
          {HEATS.map((h) => (
            <OptionCard
              key={h}
              selected={heat === h}
              onSelect={() => setHeat(h)}
              accent={h === 'spicy' ? 'spark' : 'gold'}
              title={
                h === 'normal'
                  ? t('likely.setup.normal')
                  : t('likely.setup.spicy')
              }
              hint={
                h === 'normal'
                  ? t('likely.setup.normalHint')
                  : t('likely.setup.spicyHint')
              }
            />
          ))}
        </div>
        <p className="text-xs text-fog-mute">
          {t('likely.setup.poolCount', { count: poolCount })}
        </p>

        <div className="space-y-2 pt-2">
          <Stepper
            label={t('likely.setup.rounds')}
            hint={t('likely.setup.roundsHint')}
            value={rounds}
            min={5}
            max={12}
            onChange={setRounds}
          />
        </div>
      </div>

      <div className="mt-auto pt-8">
        <Button className="w-full" size="xl" onClick={start}>
          {t('likely.setup.start')}
        </Button>
      </div>
    </Screen>
  )
}
