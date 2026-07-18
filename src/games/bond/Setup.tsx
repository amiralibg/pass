import { BOND_PACKS, getBondQuestions } from './questions'
import { useBond } from './store'
import { useSession } from '../../store/session'
import { useT } from '../../i18n/useT'
import type { MessageKey } from '../../i18n/messages'
import { Button } from '../../components/ui/Button'
import { OptionCard } from '../../components/ui/OptionCard'
import { Screen } from '../../components/ui/Screen'
import { Stepper } from '../../components/ui/Stepper'
import { TopBar } from '../../components/ui/TopBar'

const packNameKey: Record<string, MessageKey> = {
  friends: 'packs.friends',
  couple: 'packs.couple',
  spicy: 'packs.spicy',
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
              <OptionCard
                key={pack.id}
                selected={packId === pack.id}
                onSelect={() => setPackId(pack.id)}
                accent={pack.id === 'spicy' ? 'spark' : 'rose'}
                title={t(packNameKey[pack.id] ?? 'packs.friends')}
                hint={t('bond.setup.questionsCount', { count })}
              />
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
