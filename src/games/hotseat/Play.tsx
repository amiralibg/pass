import { motion } from 'motion/react'
import { useCountdown, useOnExpire, formatTime } from '../../hooks/useCountdown'
import { usePrefs } from '../../store/prefs'
import { useSession } from '../../store/session'
import { useT } from '../../i18n/useT'
import { Button } from '../../components/ui/Button'
import { FadeSwap } from '../../components/ui/FadeSwap'
import { Screen } from '../../components/ui/Screen'
import { TopBar } from '../../components/ui/TopBar'
import { cn } from '../../lib/cn'
import { useHotSeat } from './store'

export function HotSeatPlay() {
  const players = useSession((s) => s.players)
  const backToSetup = useSession((s) => s.backToSetup)
  const goHome = useSession((s) => s.goHome)
  const locale = usePrefs((s) => s.locale)
  const t = useT()

  const phase = useHotSeat((s) => s.phase)
  const order = useHotSeat((s) => s.order)
  const scores = useHotSeat((s) => s.scores)
  const turnIndex = useHotSeat((s) => s.turnIndex)
  const questionInTurn = useHotSeat((s) => s.questionInTurn)
  const questionsEach = useHotSeat((s) => s.questionsEach)
  const current = useHotSeat((s) => s.current)
  const choices = useHotSeat((s) => s.choices)
  const questionEndsAt = useHotSeat((s) => s.questionEndsAt)
  const lastCorrect = useHotSeat((s) => s.lastCorrect)
  const timedOut = useHotSeat((s) => s.timedOut)
  const selectedIndex = useHotSeat((s) => s.selectedIndex)
  const startQuestion = useHotSeat((s) => s.startQuestion)
  const answer = useHotSeat((s) => s.answer)
  const expireQuestion = useHotSeat((s) => s.expireQuestion)
  const advance = useHotSeat((s) => s.advance)
  const playAgain = useHotSeat((s) => s.playAgain)
  const reset = useHotSeat((s) => s.reset)

  const seatId = order[turnIndex]
  const seatPlayer = players.find((p) => p.id === seatId)
  const { remainingSec } = useCountdown(phase === 'question' ? questionEndsAt : null)
  useOnExpire(questionEndsAt, phase === 'question', expireQuestion)

  const leave = () => {
    reset()
    backToSetup()
  }

  if (phase === 'turn') {
    return (
      <Screen>
        <TopBar title={t('hotseat.play.hotSeat')} onBack={leave} />
        <FadeSwap id={`turn-${seatId}-${questionInTurn}`} className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <p className="label-caps text-sm font-medium text-ember">
              {t('hotseat.play.inTheSeat')}
            </p>
            <h2 className="mt-3 font-display text-5xl font-extrabold tracking-tight">
              {seatPlayer?.name}
            </h2>
            <p className="mt-4 max-w-xs text-fog-dim">
              {t('hotseat.play.lookAway', { name: seatPlayer?.name ?? '' })}
            </p>
            <p className="mt-6 text-sm text-fog-mute">
              {t('hotseat.play.progress', {
                current: questionInTurn + 1,
                total: questionsEach,
              })}
            </p>
          </div>
          <Button className="w-full" size="xl" onClick={startQuestion}>
            {t('hotseat.play.startQuestion')}
          </Button>
        </FadeSwap>
      </Screen>
    )
  }

  if (phase === 'question' && current) {
    const prompt = current.prompt[locale] ?? current.prompt.en
    return (
      <Screen>
        <TopBar title={seatPlayer?.name ?? t('games.hotseat.name')} onBack={leave} />
        <div className="flex items-center justify-between">
          <p className="label-caps text-sm font-medium text-ember">
            {t('hotseat.play.questionN', {
              current: questionInTurn + 1,
              total: questionsEach,
            })}
          </p>
          <p
            className={cn(
              'font-display text-2xl font-bold tabular-nums',
              remainingSec <= 3 ? 'text-spark' : 'text-fog',
            )}
          >
            {formatTime(remainingSec)}
          </p>
        </div>

        <motion.h2
          key={current.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 font-display text-2xl font-bold leading-snug tracking-tight text-fog"
        >
          {prompt}
        </motion.h2>

        <div className="mt-8 grid gap-2">
          {choices.map((c, i) => (
            <button
              key={`${current.id}-${i}`}
              type="button"
              onClick={() => answer(i)}
              className="rounded-2xl border border-fog/12 bg-ink/30 px-4 py-4 text-start text-lg font-semibold text-fog transition-colors hover:border-ember/45 hover:bg-ember/10"
            >
              {c.label}
            </button>
          ))}
        </div>
      </Screen>
    )
  }

  if (phase === 'feedback') {
    const correctLabel = choices.find((c) => c.correct)?.label ?? ''
    return (
      <Screen>
        <TopBar title={t('hotseat.play.result')} onBack={leave} />
        <FadeSwap id="feedback" className="flex flex-1 flex-col">
          <div
            className={cn(
              'rounded-[1.75rem] border px-6 py-10 text-center',
              lastCorrect
                ? 'border-ember/40 bg-ember/12'
                : 'border-spark/40 bg-spark/12',
            )}
          >
            <p
              className={cn(
                'label-caps text-sm font-semibold',
                lastCorrect ? 'text-ember' : 'text-spark',
              )}
            >
              {timedOut
                ? t('hotseat.play.timeUp')
                : lastCorrect
                  ? t('hotseat.play.correct')
                  : t('hotseat.play.wrong')}
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight">
              {lastCorrect
                ? t('hotseat.play.plusOne')
                : t('hotseat.play.answerWas', { answer: correctLabel })}
            </h2>
            {!lastCorrect && selectedIndex !== null ? (
              <p className="mt-3 text-fog-dim">
                {t('hotseat.play.youPicked', {
                  answer: choices[selectedIndex]?.label ?? '',
                })}
              </p>
            ) : null}
            <p className="mt-5 text-sm text-fog-mute">
              {t('hotseat.play.scoreNow', {
                name: seatPlayer?.name ?? '',
                score: scores[seatId!] ?? 0,
              })}
            </p>
          </div>
        </FadeSwap>
        <Button className="w-full" size="xl" onClick={advance}>
          {t('hotseat.play.next')}
        </Button>
      </Screen>
    )
  }

  if (phase === 'winner') {
    const ranked = [...order]
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
        <TopBar title={t('hotseat.play.final')} onBack={leave} />
        <FadeSwap id="winner" className="flex flex-1 flex-col">
          <div className="rounded-[1.75rem] border border-ember/40 bg-ember/12 px-6 py-8 text-center">
            <p className="label-caps text-sm font-semibold text-ember">
              {tied ? t('hotseat.play.tie') : t('hotseat.play.winner')}
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
              {t('hotseat.play.withScore', { score: top?.score ?? 0 })}
            </p>
          </div>

          <ol className="mt-6 space-y-2">
            {ranked.map((r, i) => (
              <li
                key={r.id}
                className="flex items-center justify-between rounded-2xl border border-fog/10 bg-ink/25 px-4 py-3"
              >
                <span className="flex items-center gap-3">
                  <span className="font-display text-sm font-bold text-ember">
                    {i + 1}
                  </span>
                  <span className="font-semibold text-fog">{r.name}</span>
                </span>
                <span className="tabular-nums text-fog-dim">
                  {t('hotseat.play.points', { score: r.score })}
                </span>
              </li>
            ))}
          </ol>
        </FadeSwap>

        <div className="mt-auto flex flex-col gap-3 pt-6">
          <Button className="w-full" size="xl" onClick={playAgain}>
            {t('hotseat.play.playAgain')}
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
      <TopBar title={t('games.hotseat.name')} onBack={leave} />
      <div className="flex flex-1 items-center justify-center">
        <Button onClick={() => useHotSeat.getState().beginRound()}>
          {t('common.begin')}
        </Button>
      </div>
    </Screen>
  )
}
