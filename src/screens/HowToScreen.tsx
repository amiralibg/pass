import { getGame } from '../games/registry'
import { useSession } from '../store/session'
import { Screen } from '../components/ui/Screen'
import { TopBar } from '../components/ui/TopBar'
import { Button } from '../components/ui/Button'

const HOW_TO: Record<string, { title: string; steps: string[] }> = {
  pass: {
    title: 'How Pass works',
    steps: [
      'Put one phone or tablet in the middle of the table.',
      'Pick a game, add everyone sitting around you.',
      'When it’s someone’s turn, hand them the device — then look away.',
      'New games plug into the same lobby, so the party can grow.',
    ],
  },
  impostor: {
    title: 'How Impostor works',
    steps: [
      'Pass the phone. Everyone sees a secret word — except the impostors.',
      'Talk about the word without saying it out loud. Bluff if you’re the impostor.',
      'When time’s up, vote who you think is faking it.',
      'If you catch an impostor, the table wins. If not — they do.',
    ],
  },
  fuse: {
    title: 'How Fuse works',
    steps: [
      'Someone holds a live fuse with a secret timer.',
      'Answer the prompt out loud, then tap Pass to hand the bomb on.',
      'When it blows, that person loses a life.',
      'Last player with lives left wins the round.',
    ],
  },
}

export function HowToScreen() {
  const howToGameId = useSession((s) => s.howToGameId)
  const selectedGameId = useSession((s) => s.selectedGameId)
  const goHome = useSession((s) => s.goHome)
  const backToLobby = useSession((s) => s.backToLobby)

  const key = howToGameId ?? 'pass'
  const content = HOW_TO[key] ?? HOW_TO.pass!
  const gameName = howToGameId ? getGame(howToGameId).name : null

  const onBack = () => {
    if (selectedGameId) backToLobby()
    else goHome()
  }

  return (
    <Screen>
      <TopBar title={gameName ?? 'Pass'} onBack={onBack} />
      <h2 className="font-display text-3xl font-bold tracking-tight text-fog">
        {content.title}
      </h2>
      <ol className="mt-8 space-y-4">
        {content.steps.map((step, i) => (
          <li key={step} className="flex gap-4">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gold/20 font-display text-sm font-bold text-gold">
              {i + 1}
            </span>
            <p className="pt-1.5 text-[17px] leading-relaxed text-fog-dim">{step}</p>
          </li>
        ))}
      </ol>
      <div className="mt-auto pt-10">
        <Button className="w-full" size="xl" onClick={onBack}>
          Got it
        </Button>
      </div>
    </Screen>
  )
}
