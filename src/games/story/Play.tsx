import { Eye, EyeOff } from 'lucide-react'
import { useSession } from '../../store/session'
import { useT } from '../../i18n/useT'
import { Button } from '../../components/ui/Button'
import { FadeSwap } from '../../components/ui/FadeSwap'
import { Screen } from '../../components/ui/Screen'
import { TopBar } from '../../components/ui/TopBar'
import { useStory } from './store'

export function StoryPlay() {
  const players = useSession((s) => s.players)
  const backToSetup = useSession((s) => s.backToSetup)
  const goHome = useSession((s) => s.goHome)
  const t = useT()

  const phase = useStory((s) => s.phase)
  const order = useStory((s) => s.order)
  const turnIndex = useStory((s) => s.turnIndex)
  const starter = useStory((s) => s.starter)
  const lines = useStory((s) => s.lines)
  const draft = useStory((s) => s.draft)
  const linesEach = useStory((s) => s.linesEach)
  const setDraft = useStory((s) => s.setDraft)
  const showWrite = useStory((s) => s.showWrite)
  const submitLine = useStory((s) => s.submitLine)
  const playAgain = useStory((s) => s.playAgain)
  const reset = useStory((s) => s.reset)

  const playerId = order[turnIndex]
  const player = players.find((p) => p.id === playerId)
  const previous = lines[lines.length - 1]?.text
  const total = order.length * linesEach
  const progress = lines.length + 1

  const leave = () => {
    reset()
    backToSetup()
  }

  if (phase === 'pass') {
    return (
      <Screen>
        <TopBar title={t('story.play.passTitle')} onBack={leave} />
        <FadeSwap id={`pass-${playerId}-${lines.length}`} className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <p className="label-caps text-sm font-medium text-sky">
              {t('story.play.handTo')}
            </p>
            <h2 className="mt-3 font-display text-5xl font-extrabold tracking-tight">
              {player?.name}
            </h2>
            <p className="mt-4 max-w-xs text-fog-dim">
              {t('story.play.lookAway', { name: player?.name ?? '' })}
            </p>
            <p className="mt-6 text-sm text-fog-mute">
              {t('story.play.progress', { current: progress, total })}
            </p>
          </div>
          <Button className="w-full" size="xl" onClick={showWrite}>
            <Eye className="size-5" />
            {t('story.play.reveal', { name: player?.name ?? '' })}
          </Button>
        </FadeSwap>
      </Screen>
    )
  }

  if (phase === 'write') {
    return (
      <Screen>
        <TopBar title={player?.name ?? t('games.story.name')} onBack={leave} />
        <FadeSwap id={`write-${playerId}-${lines.length}`} className="flex flex-1 flex-col">
          <p className="label-caps text-sm font-medium text-sky">
            {lines.length === 0 ? t('story.play.starter') : t('story.play.continueFrom')}
          </p>
          <p className="mt-3 rounded-2xl border border-sky/30 bg-sky/10 px-4 py-4 text-lg leading-relaxed text-fog">
            {lines.length === 0 ? starter : previous}
          </p>
          <label className="mt-6 block">
            <span className="flex items-center justify-between gap-3">
              <span className="label-caps text-sm font-medium text-fog-mute">
                {t('story.play.yourLine')}
              </span>
              <span className="text-xs tabular-nums text-fog-mute">
                {draft.length}/220
              </span>
            </span>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={4}
              maxLength={220}
              autoFocus
              placeholder={t('story.play.placeholder')}
              className="mt-2 w-full resize-none rounded-2xl border border-fog/12 bg-ink/30 px-4 py-3 text-[17px] text-fog outline-none placeholder:text-fog-mute focus:border-sky/45"
            />
          </label>
          <p className="mt-2 text-sm text-fog-mute">{t('story.play.privateHint')}</p>
        </FadeSwap>
        <Button
          className="w-full"
          size="xl"
          disabled={!draft.trim()}
          onClick={submitLine}
        >
          <EyeOff className="size-5" />
          {t('story.play.hidePass')}
        </Button>
      </Screen>
    )
  }

  if (phase === 'reveal') {
    return (
      <Screen>
        <TopBar title={t('story.play.theStory')} onBack={leave} />
        <FadeSwap id="reveal" className="flex flex-1 flex-col overflow-hidden">
          <p className="label-caps text-sm font-medium text-sky">
            {t('story.play.readAloud')}
          </p>
          <div className="mt-4 flex-1 space-y-4 overflow-y-auto pb-4">
            <p className="text-lg leading-relaxed text-fog-dim italic">{starter}</p>
            {lines.map((line, i) => {
              const name = players.find((p) => p.id === line.playerId)?.name ?? '?'
              return (
                <div key={`${line.playerId}-${i}`}>
                  <p className="text-xs font-medium text-sky">{name}</p>
                  <p className="mt-1 text-lg leading-relaxed text-fog">{line.text}</p>
                </div>
              )
            })}
          </div>
        </FadeSwap>
        <div className="mt-auto flex flex-col gap-3 pt-4">
          <Button className="w-full" size="xl" onClick={playAgain}>
            {t('story.play.playAgain')}
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
      <TopBar title={t('games.story.name')} onBack={leave} />
      <div className="flex flex-1 items-center justify-center">
        <Button onClick={() => useStory.getState().beginRound()}>
          {t('common.begin')}
        </Button>
      </div>
    </Screen>
  )
}
