import { BOND_PACKS, getBondQuestions } from './questions'
import { useBond } from './store'
import { useSession } from '../../store/session'
import { useT } from '../../i18n/useT'
import type { MessageKey } from '../../i18n/messages'
import { Button } from '../../components/ui/Button'
import { Screen } from '../../components/ui/Screen'
import { Stepper } from '../../components/ui/Stepper'
import { TopBar } from '../../components/ui/TopBar'
import { cn } from '../../lib/cn'

const packNameKey: Record<string, MessageKey> = {
  friends: 'packs.friends',
  couple: 'packs.couple',
}

export function BondSetup() {
  const players = useSession((s) => s.players)
  const backToLobby = useSession((s) => s.backToLobby)
  const startPlay = useSession((s) => s.startPlay)
  const t = useT()

  const packId = useBond((s) => s.packId)
  const questionsEach = useBond((s) => s.questionsEach)
  const setPackId = useBond((s) => s.setPackId)
  const setQuestionsEach = useBond((s) => s.setQuestionsEach)
  const beginRound = useBond((s) => s.beginRound)
  const reset = useBond((s) => s.reset)

  const start = () => {
    beginRound()
    startPlay()
  }

  return (
    <Screen>
      <TopBar
        title={t('games.bond.name')}
        onBack={() => {
          reset()
          backToLobby()
        }}
      />

      <h2 className="font-display text-3xl font-bold tracking-tight">
        {t('bond.setup.title')}
      </h2>
      <p className="mt-2 text-fog-dim">
        {t('bond.setup.summary', { count: players.length })}
      </p>

      <div className="mt-8 space-y-3">
        <p className="label-caps text-sm font-medium text-fog-mute">
          {t('bond.setup.questionPack')}
        </p>
        <div className="grid grid-cols-2 gap-2">
          {BOND_PACKS.map((pack) => {
            const count = getBondQuestions(pack.id).length
            return (
              <button
                key={pack.id}
                type="button"
                onClick={() => setPackId(pack.id)}
                className={cn(
                  'rounded-2xl border px-4 py-3 text-start transition-colors',
                  packId === pack.id
                    ? 'border-rose/50 bg-rose/15 text-fog'
                    : 'border-fog/10 bg-ink/25 text-fog-dim hover:border-fog/20',
                )}
              >
                <span className="block font-semibold text-fog">
                  {t(packNameKey[pack.id] ?? 'packs.friends')}
                </span>
                <span className="mt-0.5 block text-xs text-fog-mute">
                  {t('bond.setup.questionsCount', { count })}
                </span>
              </button>
            )
          })}
        </div>

        <div className="space-y-2 pt-4">
          <Stepper
            label={t('bond.setup.questions')}
            hint={t('bond.setup.questionsHint')}
            value={questionsEach}
            min={3}
            max={8}
            onChange={setQuestionsEach}
          />
        </div>
      </div>

      <div className="mt-auto pt-8">
        <Button className="w-full" size="xl" onClick={start}>
          {t('bond.setup.start')}
        </Button>
      </div>
    </Screen>
  )
}
