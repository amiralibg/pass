import { motion } from 'motion/react'
import { Eye, EyeOff } from 'lucide-react'
import { useCountdown, useOnExpire, formatTime } from '../../hooks/useCountdown'
import { usePrefs } from '../../store/prefs'
import { useSession } from '../../store/session'
import { useT } from '../../i18n/useT'
import { Button } from '../../components/ui/Button'
import { FadeSwap } from '../../components/ui/FadeSwap'
import { Screen } from '../../components/ui/Screen'
import { TopBar } from '../../components/ui/TopBar'
import { cn } from '../../lib/cn'
import { useSpy } from './store'

export function SpyPlay() {
  const players = useSession((s) => s.players)
  const backToSetup = useSession((s) => s.backToSetup)
  const goHome = useSession((s) => s.goHome)
  const locale = usePrefs((s) => s.locale)
  const t = useT()

  const phase = useSpy((s) => s.phase)
  const location = useSpy((s) => s.location)
  const spyIds = useSpy((s) => s.spyIds)
  const rolesByPlayer = useSpy((s) => s.rolesByPlayer)
  const revealIndex = useSpy((s) => s.revealIndex)
  const revealed = useSpy((s) => s.revealed)
  const discussEndsAt = useSpy((s) => s.discussEndsAt)
  const votes = useSpy((s) => s.votes)
  const eliminatedId = useSpy((s) => s.eliminatedId)
  const showReveal = useSpy((s) => s.showReveal)
  const hideAndAdvance = useSpy((s) => s.hideAndAdvance)
  const goToVote = useSpy((s) => s.goToVote)
  const castVote = useSpy((s) => s.castVote)
  const finishVote = useSpy((s) => s.finishVote)
  const playAgain = useSpy((s) => s.playAgain)
  const reset = useSpy((s) => s.reset)

  const player = players[revealIndex]
  const isSpy = player ? spyIds.includes(player.id) : false
  const role = player ? rolesByPlayer[player.id] : undefined
  const locationName = location?.name[locale] ?? location?.name.en ?? ''
  const { remainingSec } = useCountdown(phase === 'discuss' ? discussEndsAt : null)
  useOnExpire(discussEndsAt, phase === 'discuss', goToVote)

  const leave = () => {
    reset()
    backToSetup()
  }

  if (phase === 'pass' || phase === 'reveal') {
    return (
      <Screen>
        <TopBar title={t('spy.play.passTitle')} onBack={leave} />
        <FadeSwap id={`${player?.id}-${revealed ? 'on' : 'off'}`} className="flex flex-1 flex-col">
          {!revealed ? (
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <p className="label-caps text-sm font-medium text-mint">
                {t('spy.play.handTo')}
              </p>
              <h2 className="mt-3 font-display text-5xl font-extrabold tracking-tight">
                {player?.name}
              </h2>
              <p className="mt-4 max-w-xs text-fog-dim">
                {t('spy.play.lookAway', { name: player?.name ?? '' })}
              </p>
              <div className="mt-12 w-full">
                <Button className="w-full" size="xl" onClick={showReveal}>
                  <Eye className="size-5" />
                  {t('spy.play.reveal', { name: player?.name ?? '' })}
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
                  isSpy
                    ? 'border-spark/40 bg-spark/15'
                    : 'border-mint/40 bg-mint/12',
                )}
              >
                <p
                  className={cn(
                    'label-caps text-sm font-semibold',
                    isSpy ? 'text-spark' : 'text-mint',
                  )}
                >
                  {isSpy ? t('spy.play.youAreSpy') : t('spy.play.yourLocation')}
                </p>
                <p className="mt-4 font-display text-4xl font-extrabold tracking-tight text-fog">
                  {isSpy ? t('spy.play.spyLabel') : locationName}
                </p>
                {!isSpy && role ? (
                  <p className="mt-3 text-lg font-semibold text-mint">
                    {t('spy.play.yourRole', { role })}
                  </p>
                ) : null}
                <p className="mt-4 text-[15px] leading-relaxed text-fog-dim">
                  {isSpy ? t('spy.play.spyHint') : t('spy.play.crewHint')}
                </p>
              </motion.div>
              <div className="mt-10 w-full">
                <Button className="w-full" size="xl" variant="secondary" onClick={hideAndAdvance}>
                  <EyeOff className="size-5" />
                  {t('spy.play.hidePass')}
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
        <TopBar title={t('spy.play.discussion')} onBack={leave} />
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <p className="label-caps text-sm font-medium text-mint">
            {t('spy.play.timeLeft')}
          </p>
          <p className="mt-3 font-display text-7xl font-extrabold tracking-tight tabular-nums text-fog">
            {formatTime(remainingSec)}
          </p>
          <p className="mt-5 max-w-sm text-lg text-fog-dim">
            {t('spy.play.discussHint', {
              plural: spyIds.length > 1 ? 's' : '',
            })}
          </p>
        </div>
        <Button className="w-full" size="xl" variant="secondary" onClick={goToVote}>
          {t('spy.play.skipVote')}
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
          <TopBar title={t('spy.play.vote')} onBack={leave} />
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <h2 className="font-display text-4xl font-bold">
              {t('spy.play.everyoneVoted')}
            </h2>
            <p className="mt-3 text-fog-dim">{t('spy.play.readyResults')}</p>
          </div>
          <Button className="w-full" size="xl" onClick={finishVote}>
            {t('spy.play.revealResults')}
          </Button>
        </Screen>
      )
    }

    return (
      <Screen>
        <TopBar title={t('spy.play.vote')} onBack={leave} />
        <FadeSwap id={voter?.id ?? 'vote'} className="flex flex-1 flex-col">
          <p className="label-caps text-sm font-medium text-mint">
            {t('spy.play.votingNow')}
          </p>
          <h2 className="mt-2 font-display text-4xl font-extrabold tracking-tight">
            {voter?.name}
          </h2>
          <p className="mt-2 text-fog-dim">{t('spy.play.whoSpy')}</p>

          <div className="mt-8 grid gap-2">
            {players
              .filter((p) => p.id !== voter?.id)
              .map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => voter && castVote(voter.id, p.id)}
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
    const eliminated = players.find((p) => p.id === eliminatedId)
    const spies = players.filter((p) => spyIds.includes(p.id))
    const caught = eliminatedId !== null && spyIds.includes(eliminatedId)
    const tie = eliminatedId === null

    return (
      <Screen>
        <TopBar title={t('spy.play.results')} onBack={leave} />
        <FadeSwap id="result" className="flex flex-1 flex-col">
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
          <Button className="w-full" size="xl" onClick={playAgain}>
            {t('spy.play.playAgain')}
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
      <TopBar title={t('games.spy.name')} onBack={leave} />
      <div className="flex flex-1 items-center justify-center">
        <Button onClick={() => useSpy.getState().beginRound()}>
          {t('common.begin')}
        </Button>
      </div>
    </Screen>
  )
}
