import { AnimatePresence, motion } from 'motion/react'
import { PrefsSync } from './components/PrefsSync'
import { getGame } from './games/registry'
import { useSession } from './store/session'
import { HomeScreen } from './screens/HomeScreen'
import { LobbyScreen } from './screens/LobbyScreen'
import { HowToScreen } from './screens/HowToScreen'

export default function App() {
  const screen = useSession((s) => s.screen)
  const selectedGameId = useSession((s) => s.selectedGameId)

  const game = selectedGameId ? getGame(selectedGameId) : null
  const Setup = game?.Setup
  const Play = game?.Play

  return (
    <>
      <PrefsSync />
      <AnimatePresence mode="wait">
        <motion.div
          key={screen + (selectedGameId ?? '')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="min-h-dvh"
        >
          {screen === 'home' && <HomeScreen />}
          {screen === 'lobby' && <LobbyScreen />}
          {screen === 'howto' && <HowToScreen />}
          {screen === 'setup' && Setup && <Setup />}
          {screen === 'play' && Play && <Play />}
        </motion.div>
      </AnimatePresence>
    </>
  )
}
