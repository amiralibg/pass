import { useEffect } from 'react'
import { Button } from '../../components/ui/Button'
import { FadeSwap } from '../../components/ui/FadeSwap'
import { Screen } from '../../components/ui/Screen'
import { TopBar } from '../../components/ui/TopBar'
import { useT } from '../../i18n/useT'
import { cn } from '../../lib/cn'
import { useRoom } from '../../room/store'
import type { LikelyPublicRound } from '../../room/types'
import { useSession } from '../../store/session'

export function LikelyRoomPlay() {
  const t = useT()
  const goHome = useSession((s) => s.goHome)
  const openRoomLobby = useSession((s) => s.openRoomLobby)

  const pub = useRoom((s) => s.public)
  const playerId = useRoom((s) => s.playerId)
  const castVote = useRoom((s) => s.castVote)
  const toggleSip = useRoom((s) => s.toggleSip)
  const nextNever = useRoom((s) => s.nextNever)
  const nextMost = useRoom((s) => s.nextMost)
  const playAgain = useRoom((s) => s.playAgain)
  const leave = useRoom((s) => s.leave)

  const phase = pub?.phase
  const round =
    pub?.game?.id === 'likely' ? (pub.game.round as LikelyPublicRound | undefined) : undefined
  const players = pub?.players ?? []
  const isHost = pub?.youAreHost ?? false

  useEffect(() => {
    if (!pub) return
    if (pub.phase === 'lobby' || pub.phase === 'setup') {
      openRoomLobby()
    }
  }, [pub, openRoomLobby])

  const onLeave = () => {
    leave()
    goHome()
  }

  if (!pub || !round || !playerId) {
    return (
      <Screen>
        <TopBar title={t('games.likely.name')} onBack={onLeave} />
        <p className="text-fog-dim">{t('room.join.connecting')}</p>
      </Screen>
    )
  }

  if (phase === 'never') {
    const yourSips = round.yourSips ?? 0
    return (
      <Screen>
        <TopBar title={t('likely.play.neverTitle')} onBack={onLeave} />
        <FadeSwap id={`never-${round.promptId}`} className="flex flex-1 flex-col">
          <p className="label-caps text-sm font-medium text-gold">
            {t('likely.play.round', {
              current: round.roundIndex + 1,
              total: round.totalRounds,
            })}
          </p>
          <h2 className="mt-6 font-display text-2xl font-bold leading-snug tracking-tight">
            {round.promptText}
          </h2>
          <p className="mt-3 text-sm text-fog-mute">{t('room.play.sipHint')}</p>

          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => toggleSip(-1)}
                disabled={yourSips <= 0}
                className="flex size-14 items-center justify-center rounded-2xl border border-fog/12 bg-ink/30 text-2xl font-bold text-fog-mute transition-colors hover:bg-smoke disabled:opacity-25"
              >
                −
              </button>
              <button
                type="button"
                onClick={() => toggleSip(1)}
                className="flex size-14 items-center justify-center rounded-2xl border border-gold/40 bg-gold/15 text-2xl font-bold text-gold transition-colors hover:bg-gold/25"
              >
                +
              </button>
            </div>
            <p className="tabular-nums text-lg text-fog">
              {t('likely.play.sips', { count: yourSips })}
            </p>
          </div>

          <ul className="mt-8 space-y-2">
            {players.map((p) => (
              <li
                key={p.id}
                className="flex items-center justify-between rounded-2xl border border-fog/10 bg-ink/25 px-4 py-3"
              >
                <span className="font-semibold text-fog">{p.name}</span>
                <span className="tabular-nums text-gold">
                  {t('likely.play.sips', { count: round.sips?.[p.id] ?? 0 })}
                </span>
              </li>
            ))}
          </ul>
        </FadeSwap>

        {isHost ? (
          <Button className="mt-6 w-full" size="xl" onClick={nextNever}>
            {round.roundIndex + 1 >= round.totalRounds
              ? t('likely.play.seeResults')
              : t('likely.play.nextPrompt')}
          </Button>
        ) : (
          <p className="mt-6 text-center text-sm text-fog-mute">
            {t('room.play.waitHostNext')}
          </p>
        )}
      </Screen>
    )
  }

  if (phase === 'mostVote') {
    const youVoted = Boolean(round.youVoted)
    const voteCount = round.voteCount ?? 0

    if (youVoted) {
      return (
        <Screen>
          <TopBar title={t('likely.play.mostTitle')} onBack={onLeave} />
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <h2 className="font-display text-3xl font-bold">
              {t('room.play.voteSaved')}
            </h2>
            <p className="mt-3 text-fog-dim">
              {t('room.play.voteProgress', {
                done: voteCount,
                total: players.length,
              })}
            </p>
          </div>
        </Screen>
      )
    }

    return (
      <Screen>
        <TopBar title={t('likely.play.mostTitle')} onBack={onLeave} />
        <FadeSwap id={`most-${round.promptId}`} className="flex flex-1 flex-col">
          <p className="label-caps text-sm font-medium text-gold">
            {t('likely.play.round', {
              current: round.roundIndex + 1,
              total: round.totalRounds,
            })}
          </p>
          <p className="mt-2 label-caps text-sm font-medium text-fog-mute">
            {t('likely.play.yourVote')}
          </p>
          <h2 className="mt-4 font-display text-2xl font-bold leading-snug tracking-tight">
            {round.promptText}
          </h2>
          <div className="mt-8 grid gap-2">
            {players.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => castVote(p.id)}
                className={cn(
                  'rounded-2xl border px-4 py-4 text-start text-lg font-semibold transition-colors',
                  'border-fog/12 bg-ink/30 text-fog hover:border-gold/45 hover:bg-gold/10',
                )}
              >
                {p.name}
                {p.id === playerId ? ` · ${t('likely.play.you')}` : ''}
              </button>
            ))}
          </div>
        </FadeSwap>
      </Screen>
    )
  }

  if (phase === 'mostTally') {
    const roundCounts = new Map<string, number>()
    for (const target of Object.values(round.votes)) {
      roundCounts.set(target, (roundCounts.get(target) ?? 0) + 1)
    }
    const ranked = players
      .map((p) => ({
        id: p.id,
        name: p.name,
        votes: roundCounts.get(p.id) ?? 0,
      }))
      .sort((a, b) => b.votes - a.votes)

    const topNames = round.lastRoundTop
      .map((id) => players.find((p) => p.id === id)?.name ?? '?')
      .join(' · ')

    return (
      <Screen>
        <TopBar title={t('likely.play.tally')} onBack={onLeave} />
        <FadeSwap id={`tally-${round.roundIndex}`} className="flex flex-1 flex-col">
          <p className="text-sm text-fog-mute">{round.promptText}</p>
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
        {isHost ? (
          <Button className="mt-6 w-full" size="xl" onClick={nextMost}>
            {round.roundIndex + 1 >= round.totalRounds
              ? t('likely.play.seeResults')
              : t('likely.play.nextPrompt')}
          </Button>
        ) : (
          <p className="mt-6 text-center text-sm text-fog-mute">
            {t('room.play.waitHostNext')}
          </p>
        )}
      </Screen>
    )
  }

  if (phase === 'results') {
    const scores = round.mode === 'never' ? (round.sips ?? {}) : (round.received ?? {})
    const ranked = [...players]
      .map((p) => ({
        id: p.id,
        name: p.name,
        score: scores[p.id] ?? 0,
      }))
      .sort((a, b) => b.score - a.score)
    const top = ranked[0]
    const tied = ranked.length > 1 && ranked[1]!.score === top!.score

    return (
      <Screen>
        <TopBar title={t('likely.play.final')} onBack={onLeave} />
        <FadeSwap id="results" className="flex flex-1 flex-col">
          <div className="rounded-[1.75rem] border border-gold/40 bg-gold/12 px-6 py-8 text-center">
            <p className="label-caps text-sm font-semibold text-gold">
              {tied
                ? t('likely.play.tie')
                : round.mode === 'never'
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
                  {round.mode === 'never'
                    ? t('likely.play.sips', { count: r.score })
                    : t('likely.play.votes', { count: r.score })}
                </span>
              </li>
            ))}
          </ol>
        </FadeSwap>

        <div className="mt-auto flex flex-col gap-3 pt-6">
          {isHost && (
            <Button className="w-full" size="xl" onClick={playAgain}>
              {t('likely.play.playAgain')}
            </Button>
          )}
          {!isHost && (
            <p className="text-center text-sm text-fog-mute">
              {t('room.play.waitHostAgain')}
            </p>
          )}
          <Button className="w-full" variant="ghost" size="md" onClick={onLeave}>
            {t('room.lobby.leave')}
          </Button>
        </div>
      </Screen>
    )
  }

  return (
    <Screen>
      <TopBar title={t('games.likely.name')} onBack={onLeave} />
      <p className="text-fog-dim">{t('room.join.connecting')}</p>
    </Screen>
  )
}
