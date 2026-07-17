import { Eye } from 'lucide-react'
import { usePrefs } from '../../store/prefs'
import { useSession } from '../../store/session'
import { useT } from '../../i18n/useT'
import { Button } from '../../components/ui/Button'
import { FadeSwap } from '../../components/ui/FadeSwap'
import { Screen } from '../../components/ui/Screen'
import { TopBar } from '../../components/ui/TopBar'
import { cn } from '../../lib/cn'
import { useLikely } from './store'

export function LikelyPlay() {
  const players = useSession((s) => s.players)
  const backToSetup = useSession((s) => s.backToSetup)
  const goHome = useSession((s) => s.goHome)
  const locale = usePrefs((s) => s.locale)
  const t = useT()

  const phase = useLikely((s) => s.phase)
  const mode = useLikely((s) => s.mode)
  const queue = useLikely((s) => s.queue)
  const roundIndex = useLikely((s) => s.roundIndex)
  const sips = useLikely((s) => s.sips)
  const received = useLikely((s) => s.received)
  const voterOrder = useLikely((s) => s.voterOrder)
  const voterIndex = useLikely((s) => s.voterIndex)
  const lastRoundTop = useLikely((s) => s.lastRoundTop)
  const roundVotes = useLikely((s) => s.roundVotes)
  const toggleSip = useLikely((s) => s.toggleSip)
  const nextNever = useLikely((s) => s.nextNever)
  const showMostVote = useLikely((s) => s.showMostVote)
  const castVote = useLikely((s) => s.castVote)
  const nextMost = useLikely((s) => s.nextMost)
  const playAgain = useLikely((s) => s.playAgain)
  const reset = useLikely((s) => s.reset)

  const prompt = queue[roundIndex]
  const promptText = prompt
    ? (prompt.text[locale] ?? prompt.text.en)
    : ''
  const voterId = voterOrder[voterIndex]
  const voter = players.find((p) => p.id === voterId)

  const leave = () => {
    reset()
    backToSetup()
  }

  if (phase === 'never' && prompt) {
    return (
      <Screen>
        <TopBar title={t('likely.play.neverTitle')} onBack={leave} />
        <FadeSwap id={`never-${prompt.id}`} className="flex flex-1 flex-col">
          <div className="flex items-center justify-between">
            <p className="label-caps text-sm font-medium text-gold">
              {t('likely.play.round', {
                current: roundIndex + 1,
                total: queue.length,
              })}
            </p>
          </div>
          <h2 className="mt-6 font-display text-2xl font-bold leading-snug tracking-tight">
            {promptText}
          </h2>
          <p className="mt-3 text-sm text-fog-mute">{t('likely.play.sipHint')}</p>
          <div className="mt-6 grid gap-2">
            {players.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => toggleSip(p.id)}
                className="flex items-center justify-between rounded-2xl border border-fog/12 bg-ink/30 px-4 py-3 text-start transition-colors hover:border-gold/40 hover:bg-gold/10"
              >
                <span className="font-semibold text-fog">{p.name}</span>
                <span className="tabular-nums text-gold">
                  {t('likely.play.sips', { count: sips[p.id] ?? 0 })}
                </span>
              </button>
            ))}
          </div>
        </FadeSwap>
        <Button className="mt-6 w-full" size="xl" onClick={nextNever}>
          {roundIndex + 1 >= queue.length
            ? t('likely.play.seeResults')
            : t('likely.play.nextPrompt')}
        </Button>
      </Screen>
    )
  }

  if (phase === 'mostPass' && prompt) {
    return (
      <Screen>
        <TopBar title={t('likely.play.mostTitle')} onBack={leave} />
        <FadeSwap id={`most-pass-${voterId}-${roundIndex}`} className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <p className="label-caps text-sm font-medium text-gold">
              {t('likely.play.round', {
                current: roundIndex + 1,
                total: queue.length,
              })}
            </p>
            <h2 className="mt-3 font-display text-5xl font-extrabold tracking-tight">
              {voter?.name}
            </h2>
            <p className="mt-4 max-w-xs text-fog-dim">
              {t('likely.play.lookAway', { name: voter?.name ?? '' })}
            </p>
          </div>
          <Button className="w-full" size="xl" onClick={showMostVote}>
            <Eye className="size-5" />
            {t('likely.play.reveal', { name: voter?.name ?? '' })}
          </Button>
        </FadeSwap>
      </Screen>
    )
  }

  if (phase === 'mostVote' && prompt) {
    return (
      <Screen>
        <TopBar title={voter?.name ?? t('games.likely.name')} onBack={leave} />
        <p className="label-caps text-sm font-medium text-gold">
          {t('likely.play.yourVote')}
        </p>
        <h2 className="mt-4 font-display text-2xl font-bold leading-snug tracking-tight">
          {promptText}
        </h2>
        <div className="mt-8 grid gap-2">
          {players.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => castVote(p.id)}
              className={cn(
                'rounded-2xl border px-4 py-4 text-start text-lg font-semibold transition-colors',
                p.id === voterId
                  ? 'border-fog/8 bg-ink/15 text-fog-mute'
                  : 'border-fog/12 bg-ink/30 text-fog hover:border-gold/45 hover:bg-gold/10',
              )}
            >
              {p.name}
              {p.id === voterId ? ` · ${t('likely.play.you')}` : ''}
            </button>
          ))}
        </div>
      </Screen>
    )
  }

  if (phase === 'mostTally' && prompt) {
    const roundCounts = new Map<string, number>()
    for (const target of Object.values(roundVotes)) {
      roundCounts.set(target, (roundCounts.get(target) ?? 0) + 1)
    }
    const ranked = players
      .map((p) => ({
        id: p.id,
        name: p.name,
        votes: roundCounts.get(p.id) ?? 0,
      }))
      .sort((a, b) => b.votes - a.votes)

    const topNames = lastRoundTop
      .map((id) => players.find((p) => p.id === id)?.name ?? '?')
      .join(' · ')

    return (
      <Screen>
        <TopBar title={t('likely.play.tally')} onBack={leave} />
        <FadeSwap id={`tally-${roundIndex}`} className="flex flex-1 flex-col">
          <p className="text-sm text-fog-mute">{promptText}</p>
          <div className="mt-4 rounded-[1.75rem] border border-gold/40 bg-gold/12 px-6 py-8 text-center">
            <p className="label-caps text-sm font-semibold text-gold">
              {t('likely.play.thisRound')}
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight">
              {topNames}
            </h2>
          </div>
          <ol className="mt-6 space-y-2">
            {ranked.map((r) => (
              <li
                key={r.id}
                className="flex items-center justify-between rounded-2xl border border-fog/10 bg-ink/25 px-4 py-3"
              >
                <span className="font-semibold text-fog">{r.name}</span>
                <span className="tabular-nums text-fog-dim">
                  {t('likely.play.votes', { count: r.votes })}
                </span>
              </li>
            ))}
          </ol>
        </FadeSwap>
        <Button className="mt-6 w-full" size="xl" onClick={nextMost}>
          {roundIndex + 1 >= queue.length
            ? t('likely.play.seeResults')
            : t('likely.play.nextPrompt')}
        </Button>
      </Screen>
    )
  }

  if (phase === 'results') {
    const scores = mode === 'never' ? sips : received
    const ranked = [...players]
      .map((p) => ({
        id: p.id,
        name: p.name,
        score: scores[p.id] ?? 0,
      }))
      .sort((a, b) => b.score - a.score)
    const top = ranked[0]
    const tied =
      ranked.length > 1 && ranked[1]!.score === top!.score

    return (
      <Screen>
        <TopBar title={t('likely.play.final')} onBack={leave} />
        <FadeSwap id="results" className="flex flex-1 flex-col">
          <div className="rounded-[1.75rem] border border-gold/40 bg-gold/12 px-6 py-8 text-center">
            <p className="label-caps text-sm font-semibold text-gold">
              {tied
                ? t('likely.play.tie')
                : mode === 'never'
                  ? t('likely.play.mostSips')
                  : t('likely.play.mostVoted')}
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
                  <span className="font-display text-sm font-bold text-gold">
                    {i + 1}
                  </span>
                  <span className="font-semibold text-fog">{r.name}</span>
                </span>
                <span className="tabular-nums text-fog-dim">
                  {mode === 'never'
                    ? t('likely.play.sips', { count: r.score })
                    : t('likely.play.votes', { count: r.score })}
                </span>
              </li>
            ))}
          </ol>
        </FadeSwap>
        <div className="mt-auto flex flex-col gap-3 pt-6">
          <Button className="w-full" size="xl" onClick={playAgain}>
            {t('likely.play.playAgain')}
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
      <TopBar title={t('games.likely.name')} onBack={leave} />
      <div className="flex flex-1 items-center justify-center">
        <Button onClick={() => useLikely.getState().beginRound()}>
          {t('common.begin')}
        </Button>
      </div>
    </Screen>
  )
}
