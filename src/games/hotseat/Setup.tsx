import { getPackQuestions, QUESTION_PACKS } from './questions'
import { useHotSeat } from './store'
import { useSession } from '../../store/session'
import { useT } from '../../i18n/useT'
import type { MessageKey } from '../../i18n/messages'
import { Button } from '../../components/ui/Button'
import { OptionCard } from '../../components/ui/OptionCard'
import { Screen } from '../../components/ui/Screen'
import { Stepper } from '../../components/ui/Stepper'
import { TopBar } from '../../components/ui/TopBar'

const packNameKey: Record<string, MessageKey> = {
  general: 'packs.general',
  pop: 'packs.pop',
  sports: 'packs.sports',
  science: 'packs.science',
}

export function HotSeatSetup() {
  const players = useSession((s) => s.players)
  const backToLobby = useSession((s) => s.backToLobby)
  const startPlay = useSession((s) => s.startPlay)
  const t = useT()

  const packId = useHotSeat((s) => s.packId)
  const secondsPerQuestion = useHotSeat((s) => s.secondsPerQuestion)
  const questionsEach = useHotSeat((s) => s.questionsEach)
  const setPackId = useHotSeat((s) => s.setPackId)
  const setSecondsPerQuestion = useHotSeat((s) => s.setSecondsPerQuestion)
  const setQuestionsEach = useHotSeat((s) => s.setQuestionsEach)
  const beginRound = useHotSeat((s) => s.beginRound)
  const reset = useHotSeat((s) => s.reset)

  const start = () => {
    beginRound()
    startPlay()
  }

  return (
    <Screen>
      <TopBar
        title={t('games.hotseat.name')}
        onBack={() => {
          reset()
          backToLobby()
        }}
      />

      <h2 className="font-display text-3xl font-bold tracking-tight">
        {t('hotseat.setup.title')}
      </h2>
      <p className="mt-2 text-fog-dim">
        {t('hotseat.setup.summary', { count: players.length })}
      </p>

      <div className="mt-8 space-y-3">
        <p className="label-caps text-sm font-medium text-fog-mute">
          {t('hotseat.setup.questionPack')}
        </p>
        <div className="grid grid-cols-2 gap-2">
          {QUESTION_PACKS.map((pack) => {
            const count = getPackQuestions(pack.id).length
            return (
              <OptionCard
                key={pack.id}
                selected={packId === pack.id}
                onSelect={() => setPackId(pack.id)}
                accent="ember"
                title={t(packNameKey[pack.id] ?? 'packs.general')}
                hint={t('hotseat.setup.questionsCount', { count })}
              />
            )
          })}
        </div>

        <div className="space-y-2 pt-4">
          <Stepper
            label={t('hotseat.setup.perPlayer')}
            hint={t('hotseat.setup.perPlayerHint')}
            value={questionsEach}
            min={2}
            max={5}
            onChange={setQuestionsEach}
          />
          <Stepper
            label={t('hotseat.setup.timer')}
            hint={t('hotseat.setup.timerHint')}
            value={secondsPerQuestion}
            min={8}
            max={20}
            suffix="s"
            onChange={setSecondsPerQuestion}
          />
        </div>
      </div>

      <div className="mt-auto pt-8">
        <Button className="w-full" size="xl" onClick={start}>
          {t('hotseat.setup.start')}
        </Button>
      </div>
    </Screen>
  )
}
