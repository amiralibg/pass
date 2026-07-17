import { motion } from 'motion/react'
import { Eye, EyeOff } from 'lucide-react'
import { useCountdown, useOnExpire, formatTime } from '../../hooks/useCountdown'
import { useSession } from '../../store/session'
import { useT } from '../../i18n/useT'
import { Button } from '../../components/ui/Button'
import { FadeSwap } from '../../components/ui/FadeSwap'
import { Screen } from '../../components/ui/Screen'
import { TopBar } from '../../components/ui/TopBar'
import { cn } from '../../lib/cn'
import { useImpostor } from './store'

export function ImpostorPlay() {
  const players = useSession((s) => s.players)
  const backToSetup = useSession((s) => s.backToSetup)
  const goHome = useSession((s) => s.goHome)
  const t = useT()

  const phase = useImpostor((s) => s.phase)
  const secretWord = useImpostor((s) => s.secretWord)
  const impostorIds = useImpostor((s) => s.impostorIds)
  const revealIndex = useImpostor((s) => s.revealIndex)
  const revealed = useImpostor((s) => s.revealed)
  const discussEndsAt = useImpostor((s) => s.discussEndsAt)
  const votes = useImpostor((s) => s.votes)
  const eliminatedId = useImpostor((s) => s.eliminatedId)
  const showReveal = useImpostor((s) => s.showReveal)
  const hideAndAdvance = useImpostor((s) => s.hideAndAdvance)
  const goToVote = useImpostor((s) => s.goToVote)
  const castVote = useImpostor((s) => s.castVote)
  const finishVote = useImpostor((s) => s.finishVote)
  const playAgain = useImpostor((s) => s.playAgain)
  const reset = useImpostor((s) => s.reset)

  const player = players[revealIndex]
  const isImpostor = player ? impostorIds.includes(player.id) : false
  const { remainingSec } = useCountdown(phase === 'discuss' ? discussEndsAt : null)
  useOnExpire(discussEndsAt, phase === 'discuss', goToVote)

  const leave = () => {
    reset()
    backToSetup()
  }

  if (phase === 'pass' || phase === 'reveal') {
    return (
      <Screen>
        <TopBar title={t('impostor.play.passTitle')} onBack={leave} />
        <FadeSwap id={`${player?.id}-${revealed ? 'on' : 'off'}`} className="flex flex-1 flex-col">
          {!revealed ? (
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <p className="label-caps text-sm font-medium text-gold">
                {t('impostor.play.handTo')}
              </p>
              <h2 className="mt-3 font-display text-5xl font-extrabold tracking-tight">
                {player?.name}
              </h2>
              <p className="mt-4 max-w-xs text-fog-dim">
                {t('impostor.play.lookAway', { name: player?.name ?? '' })}
              </p>
              <div className="mt-12 w-full">
                <Button className="w-full" size="xl" onClick={showReveal}>
                  <Eye className="size-5" />
                  {t('impostor.play.reveal', { name: player?.name ?? '' })}
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                className={cn(
                  'w-full rounded-[1.75rem] border px-6 py-10',
                  isImpostor
                    ? 'border-spark/40 bg-spark/15'
                    : 'border-gold/35 bg-gold/10',
                )}
              >
                <p
                  className={cn(
                    'label-caps text-sm font-semibold',
                    isImpostor ? 'text-spark' : 'text-gold',
                  )}
                >
                  {isImpostor
                    ? t('impostor.play.youAreImpostor')
                    : t('impostor.play.secretWord')}
                </p>
                <p className="mt-4 font-display text-4xl font-extrabold tracking-tight text-fog">
                  {isImpostor ? t('impostor.play.impostorLabel') : secretWord}
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-fog-dim">
                  {isImpostor
                    ? t('impostor.play.impostorHint')
                    : t('impostor.play.crewHint')}
                </p>
              </motion.div>
              <div className="mt-10 w-full">
                <Button className="w-full" size="xl" variant="secondary" onClick={hideAndAdvance}>
                  <EyeOff className="size-5" />
                  {t('impostor.play.hidePass')}
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
        <TopBar title={t('impostor.play.discussion')} onBack={leave} />
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <p className="label-caps text-sm font-medium text-gold">
            {t('impostor.play.timeLeft')}
          </p>
          <p className="mt-3 font-display text-7xl font-extrabold tracking-tight tabular-nums text-fog">
            {formatTime(remainingSec)}
          </p>
          <p className="mt-5 max-w-sm text-lg text-fog-dim">
            {t('impostor.play.discussHint', {
              plural: impostorIds.length > 1 ? 's' : '',
            })}
          </p>
        </div>
        <Button className="w-full" size="xl" variant="secondary" onClick={goToVote}>
          {t('impostor.play.skipVote')}
        </Button>
      </Screen>
    )
  }

  if (phase === 'vote') {
    const voter = players.find((p) => !votes[p.id])
    const allVoted = players.every((p) => votes[p.id])

    if (allVoted) {
      return (
        <Screen>
          <TopBar title={t('impostor.play.vote')} onBack={leave} />
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <h2 className="font-display text-4xl font-bold">
              {t('impostor.play.everyoneVoted')}
            </h2>
            <p className="mt-3 text-fog-dim">{t('impostor.play.readyResults')}</p>
          </div>
          <Button className="w-full" size="xl" onClick={finishVote}>
            {t('impostor.play.revealResults')}
          </Button>
        </Screen>
      )
    }

    return (
      <Screen>
        <TopBar title={t('impostor.play.vote')} onBack={leave} />
        <FadeSwap id={voter?.id ?? 'vote'} className="flex flex-1 flex-col">
          <p className="label-caps text-sm font-medium text-gold">
            {t('impostor.play.votingNow')}
          </p>
          <h2 className="mt-2 font-display text-4xl font-extrabold tracking-tight">
            {voter?.name}
          </h2>
          <p className="mt-2 text-fog-dim">{t('impostor.play.whoImpostor')}</p>

          <div className="mt-8 grid gap-2">
            {players
              .filter((p) => p.id !== voter?.id)
              .map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => voter && castVote(voter.id, p.id)}
                  className="rounded-2xl border border-fog/12 bg-ink/30 px-4 py-4 text-start text-lg font-semibold text-fog transition-colors hover:border-gold/40 hover:bg-gold/10"
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
    const eliminated = players.find((p) => p.id === eliminatedId)
    const impostors = players.filter((p) => impostorIds.includes(p.id))
    const caught =
      eliminatedId !== null && impostorIds.includes(eliminatedId)
    const tie = eliminatedId === null

    return (
      <Screen>
        <TopBar title={t('impostor.play.results')} onBack={leave} />
        <FadeSwap id="result" className="flex flex-1 flex-col">
          <div
            className={cn(
              'rounded-[1.75rem] border px-6 py-8 text-center',
              tie
                ? 'border-fog/15 bg-ink/30'
                : caught
                  ? 'border-gold/40 bg-gold/12'
                  : 'border-spark/40 bg-spark/12',
            )}
          >
            <p className="label-caps text-sm font-semibold text-fog-mute">
              {tie
                ? t('impostor.play.tieVote')
                : caught
                  ? t('impostor.play.tableWins')
                  : t('impostor.play.impostorWins')}
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight">
              {tie
                ? t('impostor.play.noEliminated')
                : caught
                  ? t('impostor.play.caught', { name: eliminated?.name ?? '' })
                  : t('impostor.play.innocent', { name: eliminated?.name ?? '' })}
            </h2>
            <p className="mt-4 text-fog-dim">
              {t('impostor.play.wordWas')}{' '}
              <span className="font-semibold text-fog">{secretWord}</span>
            </p>
            <p className="mt-2 text-sm text-fog-mute">
              {t('impostor.play.impostorsList', {
                plural: impostors.length > 1 ? 's' : '',
              })}{' '}
              {impostors.map((p) => p.name).join(', ')}
            </p>
          </div>
        </FadeSwap>

        <div className="mt-auto flex flex-col gap-3 pt-6">
          <Button className="w-full" size="xl" onClick={playAgain}>
            {t('impostor.play.playAgain')}
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
      <TopBar title={t('games.impostor.name')} onBack={leave} />
      <div className="flex flex-1 items-center justify-center">
        <Button onClick={() => useImpostor.getState().beginRound()}>
          {t('common.begin')}
        </Button>
      </div>
    </Screen>
  )
}
