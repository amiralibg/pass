import type { GameDefinition, GameId } from './types'
import { ImpostorSetup } from './impostor/Setup'
import { ImpostorPlay } from './impostor/Play'
import { FuseSetup } from './fuse/Setup'
import { FusePlay } from './fuse/Play'

/**
 * Game registry — add a new party game by appending here.
 * Each game owns Setup + Play; the shell handles lobby & navigation.
 */
export const GAMES: GameDefinition[] = [
  {
    id: 'impostor',
    name: 'Impostor',
    tagline: 'Find who doesn’t know the secret word.',
    description:
      'Pass the phone. Most players see a word — impostors bluff. Talk, vote, catch them.',
    minPlayers: 3,
    maxPlayers: 12,
    defaultPlayers: 5,
    accent: 'gold',
    Setup: ImpostorSetup,
    Play: ImpostorPlay,
  },
  {
    id: 'fuse',
    name: 'Fuse',
    tagline: 'Answer fast. Pass faster. Don’t explode.',
    description:
      'A live fuse with a secret timer. Answer the prompt, pass the device, survive.',
    minPlayers: 2,
    maxPlayers: 12,
    defaultPlayers: 4,
    accent: 'spark',
    Setup: FuseSetup,
    Play: FusePlay,
  },
]

export function getGame(id: GameId): GameDefinition {
  const game = GAMES.find((g) => g.id === id)
  if (!game) throw new Error(`Unknown game: ${id}`)
  return game
}
