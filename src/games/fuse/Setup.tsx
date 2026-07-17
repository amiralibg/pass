import { useFuse } from './store'
import { useSession } from '../../store/session'
import { useT } from '../../i18n/useT'
import { Button } from '../../components/ui/Button'
import { Screen } from '../../components/ui/Screen'
import { Stepper } from '../../components/ui/Stepper'
import { TopBar } from '../../components/ui/TopBar'

export function FuseSetup() {
  const players = useSession((s) => s.players)
  const backToLobby = useSession((s) => s.backToLobby)
  const startPlay = useSession((s) => s.startPlay)
  const t = useT()

  const livesEach = useFuse((s) => s.livesEach)
  const minSeconds = useFuse((s) => s.minSeconds)
  const maxSeconds = useFuse((s) => s.maxSeconds)
  const setLivesEach = useFuse((s) => s.setLivesEach)
  const setMinSeconds = useFuse((s) => s.setMinSeconds)
  const setMaxSeconds = useFuse((s) => s.setMaxSeconds)
  const beginRound = useFuse((s) => s.beginRound)
  const reset = useFuse((s) => s.reset)

  const start = () => {
    beginRound()
    startPlay()
  }

  return (
    <Screen>
      <TopBar
        title={t('games.fuse.name')}
        onBack={() => {
          reset()
          backToLobby()
        }}
      />

      <h2 className="font-display text-3xl font-bold tracking-tight">
        {t('fuse.setup.title')}
      </h2>
      <p className="mt-2 text-fog-dim">
        {t('fuse.setup.summary', { count: players.length })}
      </p>

      <div className="mt-8 space-y-2">
        <Stepper
          label={t('fuse.setup.lives')}
          hint={t('fuse.setup.livesHint')}
          value={livesEach}
          min={1}
          max={5}
          onChange={setLivesEach}
        />
        <Stepper
          label={t('fuse.setup.shortest')}
          hint={t('fuse.setup.shortestHint')}
          value={minSeconds}
          min={8}
          max={Math.max(8, maxSeconds - 3)}
          suffix="s"
          onChange={setMinSeconds}
        />
        <Stepper
          label={t('fuse.setup.longest')}
          hint={t('fuse.setup.longestHint')}
          value={maxSeconds}
          min={minSeconds + 3}
          max={60}
          suffix="s"
          onChange={setMaxSeconds}
        />
      </div>

      <div className="mt-auto pt-8">
        <Button className="w-full" size="xl" variant="danger" onClick={start}>
          {t('fuse.setup.start')}
        </Button>
      </div>
    </Screen>
  )
}
