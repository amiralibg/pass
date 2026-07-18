import { Plus, Trash2 } from 'lucide-react'
import { useEffect } from 'react'
import { getGame } from '../games/registry'
import type { GameId } from '../games/types'
import { syncFuseDefaults } from '../games/fuse/store'
import { syncImpostorDefaults } from '../games/impostor/store'
import { syncSpyDefaults } from '../games/spy/store'
import { syncHotSeatDefaults } from '../games/hotseat/store'
import { syncStoryDefaults } from '../games/story/store'
import { syncBondDefaults } from '../games/bond/store'
import { syncLikelyDefaults } from '../games/likely/store'
import { useT } from '../i18n/useT'
import type { MessageKey } from '../i18n/messages'
import { useSession } from '../store/session'
import { Button } from '../components/ui/Button'
import { Screen } from '../components/ui/Screen'
import { TopBar } from '../components/ui/TopBar'
import { cn } from '../lib/cn'

const gameNameKey: Record<GameId, MessageKey> = {
  impostor: 'games.impostor.name',
  fuse: 'games.fuse.name',
  spy: 'games.spy.name',
  hotseat: 'games.hotseat.name',
  story: 'games.story.name',
  bond: 'games.bond.name',
  likely: 'games.likely.name',
  act: 'games.act.name',
  truthdare: 'games.truthdare.name',
}

export function LobbyScreen() {
  const selectedGameId = useSession((s) => s.selectedGameId)
  const players = useSession((s) => s.players)
  const goHome = useSession((s) => s.goHome)
  const openSetup = useSession((s) => s.openSetup)
  const openHowTo = useSession((s) => s.openHowTo)
  const addPlayer = useSession((s) => s.addPlayer)
  const removePlayer = useSession((s) => s.removePlayer)
  const renamePlayer = useSession((s) => s.renamePlayer)
  const ensurePlayerCount = useSession((s) => s.ensurePlayerCount)
  const t = useT()

  const game = selectedGameId ? getGame(selectedGameId) : null

  useEffect(() => {
    if (!game) return
    ensurePlayerCount(game.minPlayers, game.maxPlayers, game.defaultPlayers)
  }, [selectedGameId]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!game || !selectedGameId) return null

  const canContinue =
    players.length >= game.minPlayers &&
    players.length <= game.maxPlayers &&
    players.every((p) => p.name.trim().length > 0)

  const handleContinue = () => {
    ensurePlayerCount(game.minPlayers, game.maxPlayers)
    if (selectedGameId === 'impostor') syncImpostorDefaults()
    if (selectedGameId === 'fuse') syncFuseDefaults()
    if (selectedGameId === 'spy') syncSpyDefaults()
    if (selectedGameId === 'hotseat') syncHotSeatDefaults()
    if (selectedGameId === 'story') syncStoryDefaults()
    if (selectedGameId === 'bond') syncBondDefaults()
    if (selectedGameId === 'likely') syncLikelyDefaults()
    openSetup()
  }

  const gameName = t(gameNameKey[selectedGameId])

  return (
    <Screen className="gap-2">
      <TopBar title={gameName} onBack={goHome} />

      <div className="mb-4">
        <h2 className="font-display text-3xl font-bold tracking-tight text-fog">
          {t('lobby.title')}
        </h2>
        <p className="mt-2 text-fog-dim">
          {t('lobby.hint', { min: game.minPlayers, max: game.maxPlayers })}
        </p>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto pb-4">
        {players.map((player, index) => (
          <div
            key={player.id}
            className="flex items-center gap-2 rounded-2xl border border-fog/10 bg-ink/25 py-2 pe-2 ps-3"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-smoke font-display text-sm font-bold text-gold">
              {index + 1}
            </span>
            <input
              value={player.name}
              onChange={(e) => renamePlayer(player.id, e.target.value)}
              className="min-w-0 flex-1 bg-transparent py-2 text-[17px] text-fog outline-none placeholder:text-fog-mute"
              placeholder={t('lobby.playerPlaceholder', { n: index + 1 })}
              maxLength={18}
              aria-label={t('lobby.nameFor', { n: index + 1 })}
            />
            <button
              type="button"
              aria-label={t('lobby.removePlayer', { name: player.name })}
              disabled={players.length <= game.minPlayers}
              onClick={() => removePlayer(player.id)}
              className={cn(
                'inline-flex size-10 items-center justify-center rounded-xl text-fog-mute transition-colors hover:bg-smoke hover:text-spark',
                players.length <= game.minPlayers && 'opacity-30',
              )}
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-3 pt-2">
        <Button
          variant="secondary"
          disabled={players.length >= game.maxPlayers}
          onClick={() => addPlayer()}
          className="w-full"
        >
          <Plus className="size-4" />
          {t('lobby.addPlayer')}
        </Button>
        <Button
          variant="ghost"
          size="md"
          onClick={() => openHowTo(selectedGameId)}
          className="w-full"
        >
          {t('lobby.howToPlay', { name: gameName })}
        </Button>
        <Button
          disabled={!canContinue}
          onClick={handleContinue}
          className="w-full"
          size="xl"
        >
          {t('lobby.continue')}
        </Button>
      </div>
    </Screen>
  )
}
