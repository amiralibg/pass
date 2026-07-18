import { countTdPrompts } from './prompts'
import { useTruthDare } from './store'
import { useSession } from '../../store/session'
import { useT } from '../../i18n/useT'
import type { Heat } from '../types'
import { Button } from '../../components/ui/Button'
import { OptionCard } from '../../components/ui/OptionCard'
import { Screen } from '../../components/ui/Screen'
import { Stepper } from '../../components/ui/Stepper'
import { TopBar } from '../../components/ui/TopBar'

const HEATS: Heat[] = ['normal', 'spicy']

export function TruthDareSetup() {
  const players = useSession((s) => s.players)
  const backToLobby = useSession((s) => s.backToLobby)
  const startPlay = useSession((s) => s.startPlay)
  const t = useT()

  const heat = useTruthDare((s) => s.heat)
  const roundsEach = useTruthDare((s) => s.roundsEach)
  const setHeat = useTruthDare((s) => s.setHeat)
  const setRoundsEach = useTruthDare((s) => s.setRoundsEach)
  const begin = useTruthDare((s) => s.begin)
  const reset = useTruthDare((s) => s.reset)

  const poolCount = countTdPrompts(heat)

  const start = () => {
    begin()
    startPlay()
  }

  return (
    <Screen>
      <TopBar
        title={t('games.truthdare.name')}
        onBack={() => {
          reset()
          backToLobby()
        }}
      />

      <h2 className="font-display text-3xl font-bold tracking-tight">
        {t('truthdare.setup.title')}
      </h2>
      <p className="mt-2 text-fog-dim">
        {t('truthdare.setup.summary', { count: players.length })}
      </p>

      <div className="mt-8 space-y-3">
        <p className="label-caps text-sm font-medium text-fog-mute">
          {t('truthdare.setup.heat')}
        </p>
        <div className="grid grid-cols-2 gap-2">
          {HEATS.map((h) => (
            <OptionCard
              key={h}
              selected={heat === h}
              onSelect={() => setHeat(h)}
              accent={h === 'spicy' ? 'spark' : 'rose'}
              title={
                h === 'normal'
                  ? t('truthdare.setup.normal')
                  : t('truthdare.setup.spicy')
              }
              hint={
                h === 'normal'
                  ? t('truthdare.setup.normalHint')
                  : t('truthdare.setup.spicyHint')
              }
            />
          ))}
        </div>
        <p className="text-xs text-fog-mute">
          {t('truthdare.setup.poolCount', { count: poolCount })}
        </p>
        {heat === 'spicy' ? (
          <p className="rounded-2xl border border-spark/30 bg-spark/10 px-4 py-3 text-sm text-fog-dim">
            {t('truthdare.setup.spicyWarn')}
          </p>
        ) : null}

        <div className="space-y-2 pt-2">
          <Stepper
            label={t('truthdare.setup.rounds')}
            hint={t('truthdare.setup.roundsHint')}
            value={roundsEach}
            min={1}
            max={6}
            onChange={setRoundsEach}
          />
        </div>
      </div>

      <div className="mt-auto pt-8">
        <Button className="w-full" size="xl" onClick={start}>
          {t('truthdare.setup.start')}
        </Button>
      </div>
    </Screen>
  )
}
