import { useEffect } from 'react'
import { getPackWords, suggestedImpostorCount, WORD_PACKS } from './words'
import { useImpostor } from './store'
import { usePrefs } from '../../store/prefs'
import { useSession } from '../../store/session'
import { useT } from '../../i18n/useT'
import type { MessageKey } from '../../i18n/messages'
import { Button } from '../../components/ui/Button'
import { Screen } from '../../components/ui/Screen'
import { Stepper } from '../../components/ui/Stepper'
import { TopBar } from '../../components/ui/TopBar'
import { cn } from '../../lib/cn'

const packNameKey: Record<string, MessageKey> = {
  everyday: 'packs.everyday',
  food: 'packs.food',
  places: 'packs.places',
  wild: 'packs.wild',
}

export function ImpostorSetup() {
  const players = useSession((s) => s.players)
  const backToLobby = useSession((s) => s.backToLobby)
  const startPlay = useSession((s) => s.startPlay)
  const locale = usePrefs((s) => s.locale)
  const t = useT()

  const packId = useImpostor((s) => s.packId)
  const impostorCount = useImpostor((s) => s.impostorCount)
  const discussSeconds = useImpostor((s) => s.discussSeconds)
  const setPackId = useImpostor((s) => s.setPackId)
  const setImpostorCount = useImpostor((s) => s.setImpostorCount)
  const setDiscussSeconds = useImpostor((s) => s.setDiscussSeconds)
  const beginRound = useImpostor((s) => s.beginRound)
  const reset = useImpostor((s) => s.reset)

  const maxImpostors = Math.max(1, players.length - 1)
  const suggested = suggestedImpostorCount(players.length)

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
        title={t('games.impostor.name')}
        onBack={() => {
          reset()
          backToLobby()
        }}
      />

      <h2 className="font-display text-3xl font-bold tracking-tight">
        {t('impostor.setup.title')}
      </h2>
      <p className="mt-2 text-fog-dim">
        {t('impostor.setup.summary', {
          count: players.length,
          suggested,
          plural: suggested === 1 ? '' : 's',
        })}
      </p>

      <div className="mt-8 space-y-3">
        <p className="label-caps text-sm font-medium text-fog-mute">
          {t('impostor.setup.wordPack')}
        </p>
        <div className="grid grid-cols-2 gap-2">
          {WORD_PACKS.map((pack) => {
            const wordCount = getPackWords(pack.id, locale).length
            return (
              <button
                key={pack.id}
                type="button"
                onClick={() => setPackId(pack.id)}
                className={cn(
                  'rounded-2xl border px-4 py-3 text-start transition-colors',
                  packId === pack.id
                    ? 'border-gold/50 bg-gold/15 text-fog'
                    : 'border-fog/10 bg-ink/25 text-fog-dim hover:border-fog/20',
                )}
              >
                <span className="block font-semibold text-fog">
                  {t(packNameKey[pack.id] ?? 'packs.everyday')}
                </span>
                <span className="mt-0.5 block text-xs text-fog-mute">
                  {t('impostor.setup.wordsCount', { count: wordCount })}
                </span>
              </button>
            )
          })}
        </div>

        <div className="space-y-2 pt-4">
          <Stepper
            label={t('impostor.setup.impostors')}
            hint={t('impostor.setup.impostorsHint')}
            value={impostorCount}
            min={1}
            max={maxImpostors}
            onChange={setImpostorCount}
          />
          <Stepper
            label={t('impostor.setup.discussion')}
            hint={t('impostor.setup.discussionHint')}
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
          {t('impostor.setup.start')}
        </Button>
      </div>
    </Screen>
  )
}
