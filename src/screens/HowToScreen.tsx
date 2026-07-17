import type { GameId } from '../games/types'
import { useT } from '../i18n/useT'
import type { MessageKey } from '../i18n/messages'
import { useSession } from '../store/session'
import { Screen } from '../components/ui/Screen'
import { TopBar } from '../components/ui/TopBar'
import { Button } from '../components/ui/Button'

const HOW_TO_KEYS: Record<string, { title: MessageKey; steps: MessageKey[] }> = {
  pass: {
    title: 'howto.pass.title',
    steps: ['howto.pass.1', 'howto.pass.2', 'howto.pass.3', 'howto.pass.4'],
  },
  impostor: {
    title: 'howto.impostor.title',
    steps: [
      'howto.impostor.1',
      'howto.impostor.2',
      'howto.impostor.3',
      'howto.impostor.4',
    ],
  },
  fuse: {
    title: 'howto.fuse.title',
    steps: ['howto.fuse.1', 'howto.fuse.2', 'howto.fuse.3', 'howto.fuse.4'],
  },
  spy: {
    title: 'howto.spy.title',
    steps: ['howto.spy.1', 'howto.spy.2', 'howto.spy.3', 'howto.spy.4'],
  },
  hotseat: {
    title: 'howto.hotseat.title',
    steps: [
      'howto.hotseat.1',
      'howto.hotseat.2',
      'howto.hotseat.3',
      'howto.hotseat.4',
    ],
  },
}

const gameNameKey: Record<GameId, MessageKey> = {
  impostor: 'games.impostor.name',
  fuse: 'games.fuse.name',
  spy: 'games.spy.name',
  hotseat: 'games.hotseat.name',
}

export function HowToScreen() {
  const howToGameId = useSession((s) => s.howToGameId)
  const selectedGameId = useSession((s) => s.selectedGameId)
  const goHome = useSession((s) => s.goHome)
  const backToLobby = useSession((s) => s.backToLobby)
  const t = useT()

  const key = howToGameId ?? 'pass'
  const content = HOW_TO_KEYS[key] ?? HOW_TO_KEYS.pass!
  const gameName = howToGameId ? t(gameNameKey[howToGameId]) : null

  const onBack = () => {
    if (selectedGameId) backToLobby()
    else goHome()
  }

  return (
    <Screen>
      <TopBar title={gameName ?? 'Pass'} onBack={onBack} />
      <h2 className="font-display text-3xl font-bold tracking-tight text-fog">
        {t(content.title)}
      </h2>
      <ol className="mt-8 space-y-4">
        {content.steps.map((step, i) => (
          <li key={step} className="flex gap-4">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gold/20 font-display text-sm font-bold text-gold">
              {i + 1}
            </span>
            <p className="pt-1.5 text-[17px] leading-relaxed text-fog-dim">{t(step)}</p>
          </li>
        ))}
      </ol>
      <div className="mt-auto pt-10">
        <Button className="w-full" size="xl" onClick={onBack}>
          {t('howto.gotIt')}
        </Button>
      </div>
    </Screen>
  )
}
