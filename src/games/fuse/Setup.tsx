import { useFuse } from './store'
import { useSession } from '../../store/session'
import { Button } from '../../components/ui/Button'
import { Screen } from '../../components/ui/Screen'
import { Stepper } from '../../components/ui/Stepper'
import { TopBar } from '../../components/ui/TopBar'

export function FuseSetup() {
  const players = useSession((s) => s.players)
  const backToLobby = useSession((s) => s.backToLobby)
  const startPlay = useSession((s) => s.startPlay)

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
        title="Fuse"
        onBack={() => {
          reset()
          backToLobby()
        }}
      />

      <h2 className="font-display text-3xl font-bold tracking-tight">Round setup</h2>
      <p className="mt-2 text-fog-dim">
        {players.length} players · one secret fuse for the whole hot-potato run.
      </p>

      <div className="mt-8 space-y-2">
        <Stepper
          label="Lives each"
          hint="Lose one when the fuse blows in your hands"
          value={livesEach}
          min={1}
          max={5}
          onChange={setLivesEach}
        />
        <Stepper
          label="Shortest fuse"
          hint="Minimum seconds before it can blow"
          value={minSeconds}
          min={8}
          max={Math.max(8, maxSeconds - 3)}
          suffix="s"
          onChange={setMinSeconds}
        />
        <Stepper
          label="Longest fuse"
          hint="Maximum seconds before it can blow"
          value={maxSeconds}
          min={minSeconds + 3}
          max={60}
          suffix="s"
          onChange={setMaxSeconds}
        />
      </div>

      <div className="mt-auto pt-8">
        <Button className="w-full" size="xl" variant="danger" onClick={start}>
          Light the fuse
        </Button>
      </div>
    </Screen>
  )
}
