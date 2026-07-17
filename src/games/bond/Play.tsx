import { Eye } from 'lucide-react'
import { usePrefs } from '../../store/prefs'
import { useSession } from '../../store/session'
import { useT } from '../../i18n/useT'
import { Button } from '../../components/ui/Button'
import { FadeSwap } from '../../components/ui/FadeSwap'
import { Screen } from '../../components/ui/Screen'
import { TopBar } from '../../components/ui/TopBar'
import { cn } from '../../lib/cn'
import { useBond } from './store'

export function BondPlay() {
  const players = useSession((s) => s.players)
  const backToSetup = useSession((s) => s.backToSetup)
  const goHome = useSession((s) => s.goHome)
  const locale = usePrefs((s) => s.locale)
  const t = useT()

  const phase = useBond((s) => s.phase)
  const subjectId = useBond((s) => s.subjectId)
  const queue = useBond((s) => s.queue)
  const answerIndex = useBond((s) => s.answerIndex)
  const subjectAnswers = useBond((s) => s.subjectAnswers)
  const guesserOrder = useBond((s) => s.guesserOrder)
  const guesserIndex = useBond((s) => s.guesserIndex)
  const guessQuestionIndex = useBond((s) => s.guessQuestionIndex)
  const scores = useBond((s) => s.scores)
  const lastCorrect = useBond((s) => s.lastCorrect)
  const lastGuess = useBond((s) => s.lastGuess)
  const pickSubject = useBond((s) => s.pickSubject)
  const showAnswer = useBond((s) => s.showAnswer)
  const submitAnswer = useBond((s) => s.submitAnswer)
  const showGuess = useBond((s) => s.showGuess)
  const submitGuess = useBond((s) => s.submitGuess)
  const advanceFeedback = useBond((s) => s.advanceFeedback)
  const playAgain = useBond((s) => s.playAgain)
  const reset = useBond((s) => s.reset)

  const subject = players.find((p) => p.id === subjectId)
  const guesserId = guesserOrder[guesserIndex]
  const guesser = players.find((p) => p.id === guesserId)

  const leave = () => {
    reset()
    backToSetup()
  }

  if (phase === 'pick') {
    return (
      <Screen>
        <TopBar title={t('bond.play.pickTitle')} onBack={leave} />
        <FadeSwap id="pick" className="flex flex-1 flex-col">
          <h2 className="font-display text-3xl font-bold tracking-tight">
            {t('bond.play.whoStar')}
          </h2>
          <p className="mt-2 text-fog-dim">{t('bond.play.whoStarHint')}</p>
          <div className="mt-8 grid gap-2">
            {players.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => pickSubject(p.id)}
                className="rounded-2xl border border-fog/12 bg-ink/30 px-4 py-4 text-start text-lg font-semibold text-fog transition-colors hover:border-rose/45 hover:bg-rose/10"
              >
                {p.name}
              </button>
            ))}
          </div>
        </FadeSwap>
      </Screen>
    )
  }

  if (phase === 'answerPass') {
    return (
      <Screen>
        <TopBar title={t('bond.play.passTitle')} onBack={leave} />
        <FadeSwap id={`answer-pass-${answerIndex}`} className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <p className="label-caps text-sm font-medium text-rose">
              {t('bond.play.starAnswers')}
            </p>
            <h2 className="mt-3 font-display text-5xl font-extrabold tracking-tight">
              {subject?.name}
            </h2>
            <p className="mt-4 max-w-xs text-fog-dim">
              {t('bond.play.lookAway', { name: subject?.name ?? '' })}
            </p>
            <p className="mt-6 text-sm text-fog-mute">
              {t('bond.play.progress', {
                current: answerIndex + 1,
                total: queue.length,
              })}
            </p>
          </div>
          <Button className="w-full" size="xl" onClick={showAnswer}>
            <Eye className="size-5" />
            {t('bond.play.reveal', { name: subject?.name ?? '' })}
          </Button>
        </FadeSwap>
      </Screen>
    )
  }

  if (phase === 'answer') {
    const q = queue[answerIndex]
    if (!q) return null
    const prompt = q.prompt[locale] ?? q.prompt.en
    const choices = q.choices[locale] ?? q.choices.en
    return (
      <Screen>
        <TopBar title={subject?.name ?? t('games.bond.name')} onBack={leave} />
        <div className="flex items-center justify-between gap-3">
          <p className="label-caps text-sm font-medium text-rose">
            {t('bond.play.aboutYou')}
          </p>
          <p className="text-sm text-fog-mute">
            {t('bond.play.progress', {
              current: answerIndex + 1,
              total: queue.length,
            })}
          </p>
        </div>
        <h2 className="mt-4 font-display text-2xl font-bold leading-snug tracking-tight">
          {prompt}
        </h2>
        <div className="mt-8 grid gap-2">
          {choices.map((label, i) => (
            <button
              key={`${q.id}-${i}`}
              type="button"
              onClick={() => submitAnswer(i)}
              className="rounded-2xl border border-fog/12 bg-ink/30 px-4 py-4 text-start text-lg font-semibold text-fog transition-colors hover:border-rose/45 hover:bg-rose/10"
            >
              {label}
            </button>
          ))}
        </div>
      </Screen>
    )
  }

  if (phase === 'guessPass') {
    return (
      <Screen>
        <TopBar title={t('bond.play.passTitle')} onBack={leave} />
        <FadeSwap id={`guess-pass-${guesserId}-${guessQuestionIndex}`} className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <p className="label-caps text-sm font-medium text-rose">
              {t('bond.play.guessing')}
            </p>
            <h2 className="mt-3 font-display text-5xl font-extrabold tracking-tight">
              {guesser?.name}
            </h2>
            <p className="mt-4 max-w-xs text-fog-dim">
              {t('bond.play.guessHint', { star: subject?.name ?? '' })}
            </p>
            <p className="mt-6 text-sm text-fog-mute">
              {t('bond.play.progress', {
                current: guessQuestionIndex + 1,
                total: queue.length,
              })}
            </p>
          </div>
          <Button className="w-full" size="xl" onClick={showGuess}>
            <Eye className="size-5" />
            {t('bond.play.reveal', { name: guesser?.name ?? '' })}
          </Button>
        </FadeSwap>
      </Screen>
    )
  }

  if (phase === 'guess') {
    const q = queue[guessQuestionIndex]
    if (!q) return null
    const prompt = q.prompt[locale] ?? q.prompt.en
    const choices = q.choices[locale] ?? q.choices.en
    return (
      <Screen>
        <TopBar title={guesser?.name ?? t('games.bond.name')} onBack={leave} />
        <div className="flex items-center justify-between gap-3">
          <p className="label-caps text-sm font-medium text-rose">
            {t('bond.play.aboutStar', { name: subject?.name ?? '' })}
          </p>
          <p className="text-sm text-fog-mute">
            {t('bond.play.progress', {
              current: guessQuestionIndex + 1,
              total: queue.length,
            })}
          </p>
        </div>
        <h2 className="mt-4 font-display text-2xl font-bold leading-snug tracking-tight">
          {prompt}
        </h2>
        <div className="mt-8 grid gap-2">
          {choices.map((label, i) => (
            <button
              key={`${q.id}-g-${i}`}
              type="button"
              onClick={() => submitGuess(i)}
              className="rounded-2xl border border-fog/12 bg-ink/30 px-4 py-4 text-start text-lg font-semibold text-fog transition-colors hover:border-rose/45 hover:bg-rose/10"
            >
              {label}
            </button>
          ))}
        </div>
      </Screen>
    )
  }

  if (phase === 'feedback') {
    const q = queue[guessQuestionIndex]
    const choices = q ? (q.choices[locale] ?? q.choices.en) : []
    const correctIndex = subjectAnswers[guessQuestionIndex]
    const correctLabel =
      correctIndex !== undefined ? (choices[correctIndex] ?? '') : ''
    return (
      <Screen>
        <TopBar title={t('bond.play.result')} onBack={leave} />
        <FadeSwap id="feedback" className="flex flex-1 flex-col">
          <div
            className={cn(
              'rounded-[1.75rem] border px-6 py-10 text-center',
              lastCorrect
                ? 'border-rose/40 bg-rose/12'
                : 'border-spark/40 bg-spark/12',
            )}
          >
            <p
              className={cn(
                'label-caps text-sm font-semibold',
                lastCorrect ? 'text-rose' : 'text-spark',
              )}
            >
              {lastCorrect ? t('bond.play.correct') : t('bond.play.wrong')}
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight">
              {lastCorrect
                ? t('bond.play.plusOne')
                : t('bond.play.answerWas', { answer: correctLabel })}
            </h2>
            {!lastCorrect && lastGuess !== null ? (
              <p className="mt-3 text-fog-dim">
                {t('bond.play.youPicked', {
                  answer: choices[lastGuess] ?? '',
                })}
              </p>
            ) : null}
            <p className="mt-5 text-sm text-fog-mute">
              {t('bond.play.scoreNow', {
                name: guesser?.name ?? '',
                score: scores[guesserId!] ?? 0,
              })}
            </p>
          </div>
        </FadeSwap>
        <Button className="w-full" size="xl" onClick={advanceFeedback}>
          {t('bond.play.next')}
        </Button>
      </Screen>
    )
  }

  if (phase === 'results') {
    const ranked = [...guesserOrder]
      .map((id) => ({
        id,
        name: players.find((p) => p.id === id)?.name ?? '?',
        score: scores[id] ?? 0,
      }))
      .sort((a, b) => b.score - a.score)
    const top = ranked[0]
    const tied =
      ranked.length > 1 && ranked[1]!.score === top!.score

    return (
      <Screen>
        <TopBar title={t('bond.play.final')} onBack={leave} />
        <FadeSwap id="results" className="flex flex-1 flex-col">
          <div className="rounded-[1.75rem] border border-rose/40 bg-rose/12 px-6 py-8 text-center">
            <p className="label-caps text-sm font-semibold text-rose">
              {tied ? t('bond.play.tie') : t('bond.play.knowsBest')}
            </p>
            <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight">
              {tied
                ? ranked
                    .filter((r) => r.score === top!.score)
                    .map((r) => r.name)
                    .join(' · ')
                : top?.name}
            </h2>
            <p className="mt-3 text-fog-dim">
              {t('bond.play.aboutStar', { name: subject?.name ?? '' })}
            </p>
          </div>
          <ol className="mt-6 space-y-2">
            {ranked.map((r, i) => (
              <li
                key={r.id}
                className="flex items-center justify-between rounded-2xl border border-fog/10 bg-ink/25 px-4 py-3"
              >
                <span className="flex items-center gap-3">
                  <span className="font-display text-sm font-bold text-rose">
                    {i + 1}
                  </span>
                  <span className="font-semibold text-fog">{r.name}</span>
                </span>
                <span className="tabular-nums text-fog-dim">
                  {t('bond.play.points', { score: r.score })}
                </span>
              </li>
            ))}
          </ol>
        </FadeSwap>
        <div className="mt-auto flex flex-col gap-3 pt-6">
          <Button className="w-full" size="xl" onClick={playAgain}>
            {t('bond.play.playAgain')}
          </Button>
          <Button
            className="w-full"
            variant="secondary"
            onClick={() => {
              reset()
              backToSetup()
            }}
          >
            {t('common.changeSettings')}
          </Button>
          <Button
            className="w-full"
            variant="ghost"
            size="md"
            onClick={() => {
              reset()
              goHome()
            }}
          >
            {t('common.backToPass')}
          </Button>
        </div>
      </Screen>
    )
  }

  return (
    <Screen>
      <TopBar title={t('games.bond.name')} onBack={leave} />
      <div className="flex flex-1 items-center justify-center">
        <Button onClick={() => useBond.getState().beginRound()}>
          {t('common.begin')}
        </Button>
      </div>
    </Screen>
  )
}
