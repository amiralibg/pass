import { Flame, MessageCircle, Shuffle, X } from 'lucide-react'
import { usePrefs } from '../../store/prefs'
import { useSession } from '../../store/session'
import { useT } from '../../i18n/useT'
import { Button } from '../../components/ui/Button'
import { FadeSwap } from '../../components/ui/FadeSwap'
import { Screen } from '../../components/ui/Screen'
import { TopBar } from '../../components/ui/TopBar'
import { cn } from '../../lib/cn'
import { useTruthDare } from './store'

export function TruthDarePlay() {
  const players = useSession((s) => s.players)
  const backToSetup = useSession((s) => s.backToSetup)
  const goHome = useSession((s) => s.goHome)
  const locale = usePrefs((s) => s.locale)
  const t = useT()

  const phase = useTruthDare((s) => s.phase)
  const order = useTruthDare((s) => s.order)
  const turnIndex = useTruthDare((s) => s.turnIndex)
  const completed = useTruthDare((s) => s.completed)
  const chickened = useTruthDare((s) => s.chickened)
  const kind = useTruthDare((s) => s.kind)
  const current = useTruthDare((s) => s.current)
  const ready = useTruthDare((s) => s.ready)
  const pick = useTruthDare((s) => s.pick)
  const done = useTruthDare((s) => s.done)
  const chicken = useTruthDare((s) => s.chicken)
  const playAgain = useTruthDare((s) => s.playAgain)
  const reset = useTruthDare((s) => s.reset)

  const playerId = order[turnIndex]
  const player = players.find((p) => p.id === playerId)
  const promptText = current ? (current.text[locale] ?? current.text.en) : ''

  const leave = () => {
    reset()
    backToSetup()
  }

  if (phase === 'handoff') {
    return (
      <Screen>
        <TopBar title={t('games.truthdare.name')} onBack={leave} />
        <FadeSwap id={`handoff-${turnIndex}`} className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <p className="label-caps text-sm font-medium text-rose">
              {t('truthdare.play.turn', {
                current: turnIndex + 1,
                total: order.length,
              })}
            </p>
            <h2 className="mt-3 font-display text-5xl font-extrabold tracking-tight">
              {player?.name}
            </h2>
            <p className="mt-4 max-w-xs text-fog-dim">
              {t('truthdare.play.handoffHint', { name: player?.name ?? '' })}
            </p>
          </div>
          <Button className="w-full" size="xl" onClick={ready}>
            {t('truthdare.play.imReady')}
          </Button>
          <p className="mt-3 text-center text-xs text-fog-mute">
            {t('truthdare.play.readyHint')}
          </p>
        </FadeSwap>
      </Screen>
    )
  }

  if (phase === 'choose') {
    return (
      <Screen>
        <TopBar title={player?.name ?? t('games.truthdare.name')} onBack={leave} />
        <div className="flex flex-1 flex-col items-center justify-center">
          <p className="label-caps text-sm font-medium text-rose">
            {t('truthdare.play.chooseFor', { name: player?.name ?? '' })}
          </p>
          <div className="mt-8 grid w-full gap-3">
            <ChoiceButton
              accent="sky"
              icon={<MessageCircle className="size-6" />}
              label={t('truthdare.play.truth')}
              onClick={() => pick('truth')}
            />
            <ChoiceButton
              accent="spark"
              icon={<Flame className="size-6" />}
              label={t('truthdare.play.dare')}
              onClick={() => pick('dare')}
            />
            <ChoiceButton
              accent="gold"
              icon={<Shuffle className="size-6" />}
              label={t('truthdare.play.random')}
              onClick={() => pick('random')}
            />
          </div>
        </div>
      </Screen>
    )
  }

  if (phase === 'prompt' && current) {
    const isTruth = kind === 'truth'
    return (
      <Screen>
        <TopBar title={player?.name ?? t('games.truthdare.name')} onBack={leave} />
        <FadeSwap id={`prompt-${current.id}`} className="flex flex-1 flex-col">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold',
                isTruth ? 'bg-sky/20 text-sky' : 'bg-spark/20 text-spark',
              )}
            >
              {isTruth ? (
                <MessageCircle className="size-4" />
              ) : (
                <Flame className="size-4" />
              )}
              {isTruth
                ? t('truthdare.play.truth')
                : t('truthdare.play.dare')}
            </span>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <h2 className="font-display text-3xl font-bold leading-snug tracking-tight">
              {promptText}
            </h2>
          </div>
        </FadeSwap>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="secondary" size="xl" onClick={chicken}>
            <X className="size-5" />
            {t('truthdare.play.chicken')}
          </Button>
          <Button size="xl" onClick={done}>
            {t('truthdare.play.done')}
          </Button>
        </div>
      </Screen>
    )
  }

  if (phase === 'results') {
    const rankedDaring = [...players]
      .map((p) => ({ id: p.id, name: p.name, score: completed[p.id] ?? 0 }))
      .sort((a, b) => b.score - a.score)
    const rankedChicken = [...players]
      .map((p) => ({ id: p.id, name: p.name, score: chickened[p.id] ?? 0 }))
      .sort((a, b) => b.score - a.score)

    const daring = rankedDaring[0]
    const daringTied =
      rankedDaring.length > 1 && rankedDaring[1]!.score === daring!.score
    const chickenTop = rankedChicken[0]
    const showChicken = chickenTop != null && chickenTop.score > 0

    return (
      <Screen>
        <TopBar title={t('truthdare.play.final')} onBack={leave} />
        <FadeSwap id="results" className="flex flex-1 flex-col">
          <div className="rounded-[1.75rem] border border-spark/40 bg-spark/12 px-6 py-8 text-center">
            <p className="label-caps text-sm font-semibold text-spark">
              {daringTied
                ? t('truthdare.play.tie')
                : t('truthdare.play.mostDaring')}
            </p>
            <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight">
              {daringTied
                ? rankedDaring
                    .filter((r) => r.score === daring!.score)
                    .map((r) => r.name)
                    .join(' · ')
                : daring?.name}
            </h2>
          </div>
          {showChicken ? (
            <div className="mt-4 rounded-2xl border border-fog/12 bg-ink/25 px-5 py-4 text-center">
              <p className="label-caps text-xs font-semibold text-fog-mute">
                {t('truthdare.play.chickenOfNight')}
              </p>
              <p className="mt-1 font-display text-xl font-bold text-fog">
                {chickenTop.name}
                <span className="ms-2 text-sm font-normal text-fog-mute">
                  {t('truthdare.play.chickenCount', { count: chickenTop.score })}
                </span>
              </p>
            </div>
          ) : null}
          <ol className="mt-6 space-y-2">
            {rankedDaring.map((r, i) => (
              <li
                key={r.id}
                className="flex items-center justify-between rounded-2xl border border-fog/10 bg-ink/25 px-4 py-3"
              >
                <span className="flex items-center gap-3">
                  <span className="font-display text-sm font-bold text-spark">
                    {i + 1}
                  </span>
                  <span className="font-semibold text-fog">{r.name}</span>
                </span>
                <span className="tabular-nums text-fog-dim">
                  {t('truthdare.play.doneCount', { count: r.score })}
                </span>
              </li>
            ))}
          </ol>
        </FadeSwap>
        <div className="mt-auto flex flex-col gap-3 pt-6">
          <Button className="w-full" size="xl" onClick={playAgain}>
            {t('truthdare.play.playAgain')}
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
      <TopBar title={t('games.truthdare.name')} onBack={leave} />
      <div className="flex flex-1 items-center justify-center">
        <Button onClick={() => useTruthDare.getState().begin()}>
          {t('common.begin')}
        </Button>
      </div>
    </Screen>
  )
}

function ChoiceButton({
  accent,
  icon,
  label,
  onClick,
}: {
  accent: 'sky' | 'spark' | 'gold'
  icon: React.ReactNode
  label: string
  onClick: () => void
}) {
  const styles: Record<string, string> = {
    sky: 'border-sky/40 bg-sky/12 text-fog hover:border-sky/60 hover:bg-sky/20',
    spark:
      'border-spark/40 bg-spark/12 text-fog hover:border-spark/60 hover:bg-spark/20',
    gold: 'border-gold/40 bg-gold/12 text-fog hover:border-gold/60 hover:bg-gold/20',
  }
  const iconColor: Record<string, string> = {
    sky: 'text-sky',
    spark: 'text-spark',
    gold: 'text-gold',
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center gap-4 rounded-2xl border px-6 py-5 text-start transition-colors',
        styles[accent],
      )}
    >
      <span className={iconColor[accent]}>{icon}</span>
      <span className="font-display text-2xl font-bold tracking-tight">
        {label}
      </span>
    </button>
  )
}
