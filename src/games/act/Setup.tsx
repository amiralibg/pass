import { ACT_PACKS, getActWords } from './words'
import { useAct } from './store'
import { useSession } from '../../store/session'
import { useT } from '../../i18n/useT'
import type { MessageKey } from '../../i18n/messages'
import { Button } from '../../components/ui/Button'
import { OptionCard } from '../../components/ui/OptionCard'
import { Screen } from '../../components/ui/Screen'
import { Stepper } from '../../components/ui/Stepper'
import { TopBar } from '../../components/ui/TopBar'

const packNameKey: Record<string, MessageKey> = {
  mix: 'packs.mix',
  movies: 'packs.movies',
  animals: 'packs.animals',
  jobs: 'packs.jobs',
  hard: 'packs.hard',
  afterdark: 'packs.afterdark',
}

const TURN_SECONDS = [30, 45, 60, 90]

export function ActSetup() {
  const players = useSession((s) => s.players)
  const backToLobby = useSession((s) => s.backToLobby)
  const startPlay = useSession((s) => s.startPlay)
  const t = useT()

  const packId = useAct((s) => s.packId)
  const turnSeconds = useAct((s) => s.turnSeconds)
  const roundsEach = useAct((s) => s.roundsEach)
  const controlMode = useAct((s) => s.controlMode)
  const setPackId = useAct((s) => s.setPackId)
  const setTurnSeconds = useAct((s) => s.setTurnSeconds)
  const setRoundsEach = useAct((s) => s.setRoundsEach)
  const setControlMode = useAct((s) => s.setControlMode)
  const begin = useAct((s) => s.begin)
  const reset = useAct((s) => s.reset)

  const start = () => {
    begin()
    startPlay()
  }

  return (
    <Screen>
      <TopBar
        title={t('games.act.name')}
        onBack={() => {
          reset()
          backToLobby()
        }}
      />

      <h2 className="font-display text-3xl font-bold tracking-tight">
        {t('act.setup.title')}
      </h2>
      <p className="mt-2 text-fog-dim">
        {t('act.setup.summary', { count: players.length })}
      </p>

      <div className="mt-8 space-y-3">
        <p className="label-caps text-sm font-medium text-fog-mute">
          {t('act.setup.wordPack')}
        </p>
        <div className="grid grid-cols-2 gap-2">
          {ACT_PACKS.map((pack) => (
            <OptionCard
              key={pack.id}
              selected={packId === pack.id}
              onSelect={() => setPackId(pack.id)}
              accent={pack.id === 'afterdark' ? 'spark' : 'mint'}
              title={t(packNameKey[pack.id] ?? 'packs.mix')}
              hint={t('act.setup.wordsCount', {
                count: getActWords(pack.id).length,
              })}
            />
          ))}
        </div>

        <p className="label-caps pt-2 text-sm font-medium text-fog-mute">
          {t('act.setup.control')}
        </p>
        <div className="grid grid-cols-2 gap-2">
          <OptionCard
            selected={controlMode === 'tilt'}
            onSelect={() => setControlMode('tilt')}
            accent="mint"
            title={t('act.setup.tilt')}
            hint={t('act.setup.tiltHint')}
          />
          <OptionCard
            selected={controlMode === 'tap'}
            onSelect={() => setControlMode('tap')}
            accent="mint"
            title={t('act.setup.tap')}
            hint={t('act.setup.tapHint')}
          />
        </div>

        <p className="label-caps pt-2 text-sm font-medium text-fog-mute">
          {t('act.setup.turnTime')}
        </p>
        <div className="grid grid-cols-4 gap-2">
          {TURN_SECONDS.map((s) => (
            <OptionCard
              key={s}
              selected={turnSeconds === s}
              onSelect={() => setTurnSeconds(s)}
              accent="mint"
              title={t('act.setup.secondsShort', { count: s })}
              className="text-center"
            />
          ))}
        </div>

        <div className="space-y-2 pt-2">
          <Stepper
            label={t('act.setup.rounds')}
            hint={t('act.setup.roundsHint')}
            value={roundsEach}
            min={1}
            max={4}
            onChange={setRoundsEach}
          />
        </div>
      </div>

      <div className="mt-auto pt-8">
        <Button className="w-full" size="xl" onClick={start}>
          {t('act.setup.start')}
        </Button>
      </div>
    </Screen>
  )
}
