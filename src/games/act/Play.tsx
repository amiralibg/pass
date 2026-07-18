import { useCallback, useEffect, useRef, useState } from 'react'
import { Check, RotateCw, SkipForward, Smartphone } from 'lucide-react'
import { useCountdown, useOnExpire } from '../../hooks/useCountdown'
import { useTilt } from '../../hooks/useTilt'
import { usePrefs } from '../../store/prefs'
import { useSession } from '../../store/session'
import { useT } from '../../i18n/useT'
import { Button } from '../../components/ui/Button'
import { FadeSwap } from '../../components/ui/FadeSwap'
import { Screen } from '../../components/ui/Screen'
import { TopBar } from '../../components/ui/TopBar'
import { cn } from '../../lib/cn'
import { useAct } from './store'

export function ActPlay() {
  const players = useSession((s) => s.players)
  const backToSetup = useSession((s) => s.backToSetup)
  const goHome = useSession((s) => s.goHome)
  const locale = usePrefs((s) => s.locale)
  const t = useT()

  const phase = useAct((s) => s.phase)
  const order = useAct((s) => s.order)
  const turnIndex = useAct((s) => s.turnIndex)
  const scores = useAct((s) => s.scores)
  const current = useAct((s) => s.current)
  const endsAt = useAct((s) => s.endsAt)
  const guessed = useAct((s) => s.guessed)
  const skipped = useAct((s) => s.skipped)
  const turnSeconds = useAct((s) => s.turnSeconds)
  const controlMode = useAct((s) => s.controlMode)
  const startTurn = useAct((s) => s.startTurn)
  const gotIt = useAct((s) => s.gotIt)
  const skip = useAct((s) => s.skip)
  const endTurn = useAct((s) => s.endTurn)
  const nextTurn = useAct((s) => s.nextTurn)
  const playAgain = useAct((s) => s.playAgain)
  const reset = useAct((s) => s.reset)

  const { remainingMs, remainingSec } = useCountdown(
    phase === 'turn' ? endsAt : null,
  )
  useOnExpire(endsAt, phase === 'turn', endTurn)

  const [flash, setFlash] = useState<null | 'got' | 'skip'>(null)
  const flashTimer = useRef<number | undefined>(undefined)

  const triggerFlash = useCallback((kind: 'got' | 'skip') => {
    window.clearTimeout(flashTimer.current)
    setFlash(kind)
    flashTimer.current = window.setTimeout(() => setFlash(null), 600)
  }, [])

  const handleGotIt = useCallback(() => {
    gotIt()
    triggerFlash('got')
  }, [gotIt, triggerFlash])

  const handleSkip = useCallback(() => {
    skip()
    triggerFlash('skip')
  }, [skip, triggerFlash])

  const { permission, requestPermission } = useTilt({
    active: phase === 'turn' && controlMode === 'tilt',
    onGotIt: handleGotIt,
    onSkip: handleSkip,
  })

  useEffect(() => () => window.clearTimeout(flashTimer.current), [])

  const actorId = order[turnIndex]
  const actor = players.find((p) => p.id === actorId)
  const wordText = current ? (current.text[locale] ?? current.text.en) : ''

  const leave = () => {
    reset()
    backToSetup()
  }

  const beginTurn = async () => {
    if (controlMode === 'tilt') {
      // iOS requires the motion-permission prompt to fire from a user gesture.
      await requestPermission()
    }
    startTurn()
  }

  if (phase === 'handoff') {
    return (
      <Screen>
        <TopBar title={t('games.act.name')} onBack={leave} />
        <FadeSwap id={`handoff-${turnIndex}`} className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <p className="label-caps text-sm font-medium text-mint">
              {t('act.play.turn', {
                current: turnIndex + 1,
                total: order.length,
              })}
            </p>
            <h2 className="mt-3 font-display text-5xl font-extrabold tracking-tight">
              {actor?.name}
            </h2>
            <p className="mt-4 max-w-xs text-fog-dim">
              {controlMode === 'tilt'
                ? t('act.play.foreheadHint', { name: actor?.name ?? '' })
                : t('act.play.handoffHint', { name: actor?.name ?? '' })}
            </p>
            {controlMode === 'tilt' ? (
              <div className="mt-6 flex items-center gap-4 text-sm text-fog-mute">
                <span className="flex items-center gap-1.5">
                  <span className="text-mint">↓</span>
                  {t('act.play.tiltDownLegend')}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-ember">↑</span>
                  {t('act.play.tiltUpLegend')}
                </span>
              </div>
            ) : null}
          </div>
          <Button className="w-full" size="xl" onClick={beginTurn}>
            {controlMode === 'tilt' ? (
              <Smartphone className="size-5" />
            ) : null}
            {t('act.play.startTurn', {
              name: actor?.name ?? '',
              seconds: turnSeconds,
            })}
          </Button>
        </FadeSwap>
      </Screen>
    )
  }

  if (phase === 'turn' && current) {
    const progress = Math.max(0, Math.min(1, remainingMs / (turnSeconds * 1000)))
    const tiltReady = controlMode === 'tilt' && permission === 'granted'
    const tiltBlocked =
      controlMode === 'tilt' &&
      (permission === 'denied' || permission === 'unsupported')

    return (
      <div className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-ink text-fog">
        {/* Full-screen feedback flash */}
        <div
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-0 z-30 flex items-center justify-center transition-opacity duration-150',
            flash ? 'opacity-100' : 'opacity-0',
            flash === 'got' ? 'bg-mint/90' : flash === 'skip' ? 'bg-ember/90' : '',
          )}
        >
          {flash ? (
            <span className="font-display text-6xl font-extrabold tracking-tight text-contrast">
              {flash === 'got' ? t('act.play.gotFlash') : t('act.play.skipFlash')}
            </span>
          ) : null}
        </div>

        {/* Tap zones (fallback + hand-held play) sit behind the content */}
        <button
          type="button"
          aria-label={t('act.play.skip')}
          onClick={handleSkip}
          className="absolute inset-y-0 left-0 z-0 w-1/2"
        />
        <button
          type="button"
          aria-label={t('act.play.gotIt')}
          onClick={handleGotIt}
          className="absolute inset-y-0 right-0 z-0 w-1/2"
        />

        {/* Content overlay — transparent to taps except the controls */}
        <div className="pointer-events-none relative z-10 flex h-full flex-col p-4">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={leave}
              aria-label={t('common.back')}
              className="pointer-events-auto flex size-10 items-center justify-center rounded-full bg-smoke text-fog-dim"
            >
              ←
            </button>
            <span className="label-caps text-sm font-medium text-mint">
              {t('act.play.guessedCount', { count: guessed.length })}
            </span>
            <span className="font-display text-3xl font-extrabold tabular-nums">
              {remainingSec}
            </span>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-smoke">
            <div
              className="h-full rounded-full bg-mint transition-[width] duration-100 ease-linear"
              style={{ width: `${progress * 100}%` }}
            />
          </div>

          <FadeSwap
            id={`word-${current.id}`}
            className="flex flex-1 items-center justify-center"
          >
            <h2
              className="text-center font-display font-extrabold leading-[1.05] tracking-tight"
              style={{ fontSize: 'clamp(2.75rem, 11vw, 7rem)' }}
            >
              {wordText}
            </h2>
          </FadeSwap>

          {/* Bottom hint row */}
          <div className="flex items-end justify-between gap-4 text-sm">
            <span className="flex items-center gap-1.5 text-ember">
              <SkipForward className="size-4" />
              {tiltReady ? t('act.play.tiltUpLegend') : t('act.play.skip')}
            </span>
            <span className="pointer-events-none flex-1 text-center text-xs text-fog-mute">
              {tiltReady
                ? t('act.play.tiltActive')
                : tiltBlocked
                  ? t('act.play.tiltFallback')
                  : t('act.play.tapHintPlay')}
            </span>
            <span className="flex items-center gap-1.5 text-mint">
              {tiltReady ? t('act.play.tiltDownLegend') : t('act.play.gotIt')}
              <Check className="size-4" />
            </span>
          </div>
        </div>
      </div>
    )
  }

  if (phase === 'turnEnd') {
    return (
      <Screen>
        <TopBar title={t('act.play.timeUp')} onBack={leave} />
        <FadeSwap id={`turn-end-${turnIndex}`} className="flex flex-1 flex-col">
          <div className="rounded-[1.75rem] border border-mint/40 bg-mint/12 px-6 py-8 text-center">
            <p className="label-caps text-sm font-semibold text-mint">
              {actor?.name}
            </p>
            <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight">
              {t('act.play.turnScore', { count: guessed.length })}
            </h2>
          </div>
          {guessed.length > 0 ? (
            <div className="mt-6">
              <p className="label-caps text-sm font-medium text-fog-mute">
                {t('act.play.guessedList')}
              </p>
              <ul className="mt-2 space-y-1.5">
                {guessed.map((w) => (
                  <li
                    key={w.id}
                    className="rounded-2xl border border-fog/10 bg-ink/25 px-4 py-2.5 font-semibold text-fog"
                  >
                    {w.text[locale] ?? w.text.en}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {skipped.length > 0 ? (
            <div className="mt-5">
              <p className="label-caps text-sm font-medium text-fog-mute">
                {t('act.play.skippedList')}
              </p>
              <ul className="mt-2 space-y-1.5">
                {skipped.map((w) => (
                  <li
                    key={w.id}
                    className="rounded-2xl border border-fog/8 bg-ink/15 px-4 py-2.5 text-fog-dim"
                  >
                    {w.text[locale] ?? w.text.en}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </FadeSwap>
        <Button className="mt-6 w-full" size="xl" onClick={nextTurn}>
          {turnIndex + 1 >= order.length
            ? t('act.play.seeResults')
            : t('act.play.nextActor')}
        </Button>
      </Screen>
    )
  }

  if (phase === 'results') {
    const ranked = [...players]
      .map((p) => ({ id: p.id, name: p.name, score: scores[p.id] ?? 0 }))
      .sort((a, b) => b.score - a.score)
    const top = ranked[0]
    const tied = ranked.length > 1 && ranked[1]!.score === top!.score

    return (
      <Screen>
        <TopBar title={t('act.play.final')} onBack={leave} />
        <FadeSwap id="results" className="flex flex-1 flex-col">
          <div className="rounded-[1.75rem] border border-mint/40 bg-mint/12 px-6 py-8 text-center">
            <p className="label-caps text-sm font-semibold text-mint">
              {tied ? t('act.play.tie') : t('act.play.topActor')}
            </p>
            <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight">
              {tied
                ? ranked
                    .filter((r) => r.score === top!.score)
                    .map((r) => r.name)
                    .join(' · ')
                : top?.name}
            </h2>
          </div>
          <ol className="mt-6 space-y-2">
            {ranked.map((r, i) => (
              <li
                key={r.id}
                className="flex items-center justify-between rounded-2xl border border-fog/10 bg-ink/25 px-4 py-3"
              >
                <span className="flex items-center gap-3">
                  <span className="font-display text-sm font-bold text-mint">
                    {i + 1}
                  </span>
                  <span className="font-semibold text-fog">{r.name}</span>
                </span>
                <span className="tabular-nums text-fog-dim">
                  {t('act.play.turnScore', { count: r.score })}
                </span>
              </li>
            ))}
          </ol>
        </FadeSwap>
        <div className="mt-auto flex flex-col gap-3 pt-6">
          <Button className="w-full" size="xl" onClick={playAgain}>
            <RotateCw className="size-5" />
            {t('act.play.playAgain')}
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
      <TopBar title={t('games.act.name')} onBack={leave} />
      <div className="flex flex-1 items-center justify-center">
        <Button onClick={() => useAct.getState().begin()}>
          {t('common.begin')}
        </Button>
      </div>
    </Screen>
  )
}
