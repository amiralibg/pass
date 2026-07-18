import { motion } from 'motion/react'
import { Eye, EyeOff } from 'lucide-react'
import { useEffect } from 'react'
import { Button } from '../../components/ui/Button'
import { FadeSwap } from '../../components/ui/FadeSwap'
import { Screen } from '../../components/ui/Screen'
import { TopBar } from '../../components/ui/TopBar'
import { useCountdown, useOnExpire, formatTime } from '../../hooks/useCountdown'
import { useT } from '../../i18n/useT'
import { cn } from '../../lib/cn'
import { useRoom } from '../../room/store'
import { useSession } from '../../store/session'
import type { SpyPublicRound } from '../../room/types'

export function SpyRoomPlay() {
  const t = useT()
  const goHome = useSession((s) => s.goHome)
  const openRoomLobby = useSession((s) => s.openRoomLobby)

  const pub = useRoom((s) => s.public)
  const priv = useRoom((s) => s.private)
  const playerId = useRoom((s) => s.playerId)
  const ackReveal = useRoom((s) => s.ackReveal)
  const forceDiscuss = useRoom((s) => s.forceDiscuss)
  const startVote = useRoom((s) => s.startVote)
  const castVote = useRoom((s) => s.castVote)
  const playAgain = useRoom((s) => s.playAgain)
  const leave = useRoom((s) => s.leave)

  const phase = pub?.phase
  const round = pub?.game?.id === 'spy' ? (pub.game.round as SpyPublicRound | undefined) : undefined
  const players = pub?.players ?? []
  const isHost = pub?.youAreHost ?? false

  useEffect(() => {
    if (!pub) return
    if (pub.phase === 'lobby' || pub.phase === 'setup') {
      openRoomLobby()
    }
  }, [pub, openRoomLobby])

  const discussEndsAt = round?.discussEndsAt ?? null
  const { remainingSec } = useCountdown(phase === 'discuss' ? discussEndsAt : null)
  useOnExpire(discussEndsAt, phase === 'discuss', () => {
    if (isHost) startVote()
  })

  const onLeave = () => {
    leave()
    goHome()
  }

  if (!pub || !round || !playerId) {
    return (
      <Screen>
        <TopBar title={t('games.spy.name')} onBack={onLeave} />
        <p className="text-fog-dim">{t('room.join.connecting')}</p>
      </Screen>
    )
  }

  if (phase === 'reveal') {
    const isSpy = priv?.role === 'spy'
    const acked = Boolean(round.youAcked)
    const ackCount = round.ackCount ?? 0
    const playerCount = round.playerCount ?? players.length

    return (
      <Screen>
        <TopBar title={t('room.play.yourCard')} onBack={onLeave} />
        <FadeSwap id={acked ? 'acked' : 'card'} className="flex flex-1 flex-col">
          {acked ? (
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <EyeOff className="size-10 text-fog-mute" />
              <h2 className="mt-4 font-display text-3xl font-bold">
                {t('room.play.waitingOthers')}
              </h2>
              <p className="mt-3 text-fog-dim">
                {t('room.play.ackProgress', { done: ackCount, total: playerCount })}
              </p>
              {isHost && (
                <Button className="mt-10 w-full" variant="secondary" onClick={forceDiscuss}>
                  {t('room.play.forceDiscuss')}
                </Button>
              )}
            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                className={cn(
                  'w-full rounded-[1.75rem] border px-6 py-10',
                  isSpy ? 'border-mint/40 bg-mint/15' : 'border-gold/35 bg-gold/10',
                )}
              >
                <p
                  className={cn(
                    'label-caps text-sm font-semibold',
                    isSpy ? 'text-mint' : 'text-gold',
                  )}
                >
                  {isSpy ? t('spy.play.youAreSpy') : t('spy.play.yourLocation')}
                </p>
                <p className="mt-4 font-display text-4xl font-extrabold tracking-tight text-fog">
                  {isSpy ? t('spy.play.spyLabel') : (priv?.locationName ?? '')}
                </p>
                {!isSpy && priv?.playerRole && (
                  <p className="mt-3 text-lg font-semibold text-fog-dim">
                    {t('spy.play.yourRole', { role: priv.playerRole })}
                  </p>
                )}
                <p className="mt-4 text-[15px] leading-relaxed text-fog-dim">
                  {isSpy ? t('spy.play.spyHint') : t('spy.play.crewHint')}
                </p>
              </motion.div>
              <div className="mt-10 w-full">
                <Button className="w-full" size="xl" onClick={ackReveal}>
                  <Eye className="size-5" />
                  {t('room.play.gotIt')}
                </Button>
              </div>
            </div>
          )}
        </FadeSwap>
      </Screen>
    )
  }

  if (phase === 'discuss') {
    return (
      <Screen>
        <TopBar title={t('spy.play.discussion')} onBack={onLeave} />
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <p className="label-caps text-sm font-medium text-mint">
            {t('spy.play.timeLeft')}
          </p>
          <p className="mt-3 font-display text-7xl font-extrabold tracking-tight tabular-nums text-fog">
            {formatTime(remainingSec)}
          </p>
          <p className="mt-5 max-w-sm text-lg text-fog-dim">
            {t('spy.play.discussHint', {
              plural: (round.spyCount ?? 1) > 1 ? 's' : '',
            })}
          </p>
        </div>
        {isHost && (
          <Button className="w-full" size="xl" variant="secondary" onClick={startVote}>
            {t('spy.play.skipVote')}
          </Button>
        )}
      </Screen>
    )
  }

  if (phase === 'vote') {
    const youVoted = Boolean(round.youVoted)
    const voteCount = round.voteCount ?? 0

    if (youVoted) {
      return (
        <Screen>
          <TopBar title={t('spy.play.vote')} onBack={onLeave} />
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
        <TopBar title={t('spy.play.vote')} onBack={onLeave} />
        <FadeSwap id="room-vote" className="flex flex-1 flex-col">
          <p className="label-caps text-sm font-medium text-mint">
            {t('room.play.yourVote')}
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight">
            {t('room.play.whoSpy')}
          </h2>
          <div className="mt-8 grid gap-2">
            {players
              .filter((p) => p.id !== playerId)
              .map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => castVote(p.id)}
                  className="rounded-2xl border border-fog/12 bg-ink/30 px-4 py-4 text-start text-lg font-semibold text-fog transition-colors hover:border-mint/40 hover:bg-mint/10"
                >
                  {p.name}
                </button>
              ))}
          </div>
        </FadeSwap>
      </Screen>
    )
  }

  if (phase === 'result') {
    const eliminatedId = round.eliminatedId
    const spyIds = round.spyIds ?? []
    const locationName = round.locationName ?? ''
    const eliminated = players.find((p) => p.id === eliminatedId)
    const spies = players.filter((p) => spyIds.includes(p.id))
    const caught = eliminatedId !== null && spyIds.includes(eliminatedId)
    const tie = eliminatedId === null

    return (
      <Screen>
        <TopBar title={t('spy.play.results')} onBack={onLeave} />
        <FadeSwap id="room-result" className="flex flex-1 flex-col">
          <div
            className={cn(
              'rounded-[1.75rem] border px-6 py-8 text-center',
              tie
                ? 'border-fog/15 bg-ink/30'
                : caught
                  ? 'border-mint/40 bg-mint/12'
                  : 'border-spark/40 bg-spark/12',
            )}
          >
            <p className="label-caps text-sm font-semibold text-fog-mute">
              {tie
                ? t('spy.play.tieVote')
                : caught
                  ? t('spy.play.tableWins')
                  : t('spy.play.spyWins')}
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight">
              {tie
                ? t('spy.play.noEliminated')
                : caught
                  ? t('spy.play.caught', { name: eliminated?.name ?? '' })
                  : t('spy.play.innocent', { name: eliminated?.name ?? '' })}
            </h2>
            <p className="mt-4 text-fog-dim">
              {t('spy.play.locationWas')}{' '}
              <span className="font-semibold text-fog">{locationName}</span>
            </p>
            <p className="mt-2 text-sm text-fog-mute">
              {t('spy.play.spiesList', {
                plural: spies.length > 1 ? 's' : '',
              })}{' '}
              {spies.map((p) => p.name).join(', ')}
            </p>
          </div>
        </FadeSwap>

        <div className="mt-auto flex flex-col gap-3 pt-6">
          {isHost && (
            <Button className="w-full" size="xl" onClick={playAgain}>
              {t('spy.play.playAgain')}
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
      <TopBar title={t('games.spy.name')} onBack={onLeave} />
      <p className="text-fog-dim">{t('room.join.connecting')}</p>
    </Screen>
  )
}
