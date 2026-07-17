import { useEffect } from 'react'
import { WORD_PACKS } from './words'
import { useImpostor } from './store'
import { useSession } from '../../store/session'
import { Button } from '../../components/ui/Button'
import { Screen } from '../../components/ui/Screen'
import { Stepper } from '../../components/ui/Stepper'
import { TopBar } from '../../components/ui/TopBar'
import { cn } from '../../lib/cn'
import { suggestedImpostorCount } from './words'

export function ImpostorSetup() {
  const players = useSession((s) => s.players)
  const backToLobby = useSession((s) => s.backToLobby)
  const startPlay = useSession((s) => s.startPlay)

  const packId = useImpostor((s) => s.packId)
  const impostorCount = useImpostor((s) => s.impostorCount)
  const discussSeconds = useImpostor((s) => s.discussSeconds)
  const setPackId = useImpostor((s) => s.setPackId)
  const setImpostorCount = useImpostor((s) => s.setImpostorCount)
  const setDiscussSeconds = useImpostor((s) => s.setDiscussSeconds)
  const beginRound = useImpostor((s) => s.beginRound)
  const reset = useImpostor((s) => s.reset)

  const maxImpostors = Math.max(1, players.length - 1)

  useEffect(() => {
    if (impostorCount > maxImpostors) {
      setImpostorCount(maxImpostors)
    }
  }, [impostorCount, maxImpostors, setImpostorCount])

  const start = () => {
    beginRound()
    startPlay()
  }

  return (
    <Screen>
      <TopBar
        title="Impostor"
        onBack={() => {
          reset()
          backToLobby()
        }}
      />

      <h2 className="font-display text-3xl font-bold tracking-tight">Round setup</h2>
      <p className="mt-2 text-fog-dim">
        {players.length} players · suggested {suggestedImpostorCount(players.length)} impostor
        {suggestedImpostorCount(players.length) === 1 ? '' : 's'}
      </p>

      <div className="mt-8 space-y-3">
        <p className="text-sm font-medium tracking-wide text-fog-mute uppercase">
          Word pack
        </p>
        <div className="grid grid-cols-2 gap-2">
          {WORD_PACKS.map((pack) => (
            <button
              key={pack.id}
              type="button"
              onClick={() => setPackId(pack.id)}
              className={cn(
                'rounded-2xl border px-4 py-3 text-left transition-colors',
                packId === pack.id
                  ? 'border-gold/50 bg-gold/15 text-fog'
                  : 'border-fog/10 bg-ink/25 text-fog-dim hover:border-fog/20',
              )}
            >
              <span className="block font-semibold text-fog">{pack.name}</span>
              <span className="mt-0.5 block text-xs text-fog-mute">
                {pack.words.length} words
              </span>
            </button>
          ))}
        </div>

        <div className="space-y-2 pt-4">
          <Stepper
            label="Impostors"
            hint="More impostors = harder for the table"
            value={impostorCount}
            min={1}
            max={maxImpostors}
            onChange={setImpostorCount}
          />
          <Stepper
            label="Discussion"
            hint="Minutes of talking before the vote"
            value={Math.round(discussSeconds / 60)}
            min={1}
            max={5}
            suffix="m"
            onChange={(m) => setDiscussSeconds(m * 60)}
          />
        </div>
      </div>

      <div className="mt-auto pt-8">
        <Button className="w-full" size="xl" onClick={start}>
          Start passing
        </Button>
      </div>
    </Screen>
  )
}
