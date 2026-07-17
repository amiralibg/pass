import { STARTER_PACKS, getPackStarters } from './starters'
import { useStory } from './store'
import { useSession } from '../../store/session'
import { useT } from '../../i18n/useT'
import type { MessageKey } from '../../i18n/messages'
import { Button } from '../../components/ui/Button'
import { Screen } from '../../components/ui/Screen'
import { Stepper } from '../../components/ui/Stepper'
import { TopBar } from '../../components/ui/TopBar'
import { cn } from '../../lib/cn'

const packNameKey: Record<string, MessageKey> = {
  cozy: 'packs.cozy',
  wild: 'packs.wild',
  mystery: 'packs.mystery',
  adventure: 'packs.adventure',
}

export function StorySetup() {
  const players = useSession((s) => s.players)
  const backToLobby = useSession((s) => s.backToLobby)
  const startPlay = useSession((s) => s.startPlay)
  const t = useT()

  const packId = useStory((s) => s.packId)
  const linesEach = useStory((s) => s.linesEach)
  const setPackId = useStory((s) => s.setPackId)
  const setLinesEach = useStory((s) => s.setLinesEach)
  const beginRound = useStory((s) => s.beginRound)
  const reset = useStory((s) => s.reset)

  const start = () => {
    beginRound()
    startPlay()
  }

  return (
    <Screen>
      <TopBar
        title={t('games.story.name')}
        onBack={() => {
          reset()
          backToLobby()
        }}
      />

      <h2 className="font-display text-3xl font-bold tracking-tight">
        {t('story.setup.title')}
      </h2>
      <p className="mt-2 text-fog-dim">
        {t('story.setup.summary', { count: players.length })}
      </p>

      <div className="mt-8 space-y-3">
        <p className="label-caps text-sm font-medium text-fog-mute">
          {t('story.setup.starterPack')}
        </p>
        <div className="grid grid-cols-2 gap-2">
          {STARTER_PACKS.map((pack) => {
            const count = getPackStarters(pack.id).length
            return (
              <button
                key={pack.id}
                type="button"
                onClick={() => setPackId(pack.id)}
                className={cn(
                  'rounded-2xl border px-4 py-3 text-start transition-colors',
                  packId === pack.id
                    ? 'border-sky/50 bg-sky/15 text-fog'
                    : 'border-fog/10 bg-ink/25 text-fog-dim hover:border-fog/20',
                )}
              >
                <span className="block font-semibold text-fog">
                  {t(packNameKey[pack.id] ?? 'packs.cozy')}
                </span>
                <span className="mt-0.5 block text-xs text-fog-mute">
                  {t('story.setup.startersCount', { count })}
                </span>
              </button>
            )
          })}
        </div>

        <div className="space-y-2 pt-4">
          <Stepper
            label={t('story.setup.linesEach')}
            hint={t('story.setup.linesEachHint')}
            value={linesEach}
            min={1}
            max={3}
            onChange={setLinesEach}
          />
        </div>
      </div>

      <div className="mt-auto pt-8">
        <Button className="w-full" size="xl" onClick={start}>
          {t('story.setup.start')}
        </Button>
      </div>
    </Screen>
  )
}
