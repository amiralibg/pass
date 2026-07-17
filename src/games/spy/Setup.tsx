import { useEffect } from 'react'
import { getPackLocations, LOCATION_PACKS, suggestedSpyCount } from './locations'
import { useSpy } from './store'
import { useSession } from '../../store/session'
import { useT } from '../../i18n/useT'
import type { MessageKey } from '../../i18n/messages'
import { Button } from '../../components/ui/Button'
import { Screen } from '../../components/ui/Screen'
import { Stepper } from '../../components/ui/Stepper'
import { TopBar } from '../../components/ui/TopBar'
import { cn } from '../../lib/cn'

const packNameKey: Record<string, MessageKey> = {
  classic: 'packs.classic',
  trip: 'packs.trip',
  nightlife: 'packs.nightlife',
}

export function SpySetup() {
  const players = useSession((s) => s.players)
  const backToLobby = useSession((s) => s.backToLobby)
  const startPlay = useSession((s) => s.startPlay)
  const t = useT()

  const packId = useSpy((s) => s.packId)
  const spyCount = useSpy((s) => s.spyCount)
  const discussSeconds = useSpy((s) => s.discussSeconds)
  const setPackId = useSpy((s) => s.setPackId)
  const setSpyCount = useSpy((s) => s.setSpyCount)
  const setDiscussSeconds = useSpy((s) => s.setDiscussSeconds)
  const beginRound = useSpy((s) => s.beginRound)
  const reset = useSpy((s) => s.reset)

  const maxSpies = Math.max(1, players.length - 1)
  const suggested = suggestedSpyCount(players.length)

  useEffect(() => {
    if (spyCount > maxSpies) setSpyCount(maxSpies)
  }, [spyCount, maxSpies, setSpyCount])

  const start = () => {
    beginRound()
    startPlay()
  }

  return (
    <Screen>
      <TopBar
        title={t('games.spy.name')}
        onBack={() => {
          reset()
          backToLobby()
        }}
      />

      <h2 className="font-display text-3xl font-bold tracking-tight">
        {t('spy.setup.title')}
      </h2>
      <p className="mt-2 text-fog-dim">
        {t('spy.setup.summary', {
          count: players.length,
          suggested,
          plural: suggested === 1 ? '' : 's',
        })}
      </p>

      <div className="mt-8 space-y-3">
        <p className="label-caps text-sm font-medium text-fog-mute">
          {t('spy.setup.locationPack')}
        </p>
        <div className="grid grid-cols-2 gap-2">
          {LOCATION_PACKS.map((pack) => {
            const locationCount = getPackLocations(pack.id).length
            return (
              <button
                key={pack.id}
                type="button"
                onClick={() => setPackId(pack.id)}
                className={cn(
                  'rounded-2xl border px-4 py-3 text-start transition-colors',
                  packId === pack.id
                    ? 'border-mint/50 bg-mint/15 text-fog'
                    : 'border-fog/10 bg-ink/25 text-fog-dim hover:border-fog/20',
                )}
              >
                <span className="block font-semibold text-fog">
                  {t(packNameKey[pack.id] ?? 'packs.classic')}
                </span>
                <span className="mt-0.5 block text-xs text-fog-mute">
                  {t('spy.setup.locationsCount', { count: locationCount })}
                </span>
              </button>
            )
          })}
        </div>

        <div className="space-y-2 pt-4">
          <Stepper
            label={t('spy.setup.spies')}
            hint={t('spy.setup.spiesHint')}
            value={spyCount}
            min={1}
            max={maxSpies}
            onChange={setSpyCount}
          />
          <Stepper
            label={t('spy.setup.discussion')}
            hint={t('spy.setup.discussionHint')}
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
          {t('spy.setup.start')}
        </Button>
      </div>
    </Screen>
  )
}
