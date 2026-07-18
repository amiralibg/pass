import type { GameDefinition, GameId } from './types'
import { ImpostorSetup } from './impostor/Setup'
import { ImpostorPlay } from './impostor/Play'
import { FuseSetup } from './fuse/Setup'
import { FusePlay } from './fuse/Play'
import { SpySetup } from './spy/Setup'
import { SpyPlay } from './spy/Play'
import { HotSeatSetup } from './hotseat/Setup'
import { HotSeatPlay } from './hotseat/Play'
import { StorySetup } from './story/Setup'
import { StoryPlay } from './story/Play'
import { BondSetup } from './bond/Setup'
import { BondPlay } from './bond/Play'
import { LikelySetup } from './likely/Setup'
import { LikelyPlay } from './likely/Play'

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
  {
    id: 'spy',
    name: 'Spy',
    tagline: 'One of you doesn’t know the location.',
    description:
      'Everyone gets a place and a role — except the spy. Ask questions, vote them out.',
    minPlayers: 3,
    maxPlayers: 12,
    defaultPlayers: 6,
    accent: 'mint',
    Setup: SpySetup,
    Play: SpyPlay,
  },
  {
    id: 'hotseat',
    name: 'Hot Seat',
    tagline: 'Timed trivia. One phone. Pass when you’re done.',
    description:
      'Take turns answering multiple-choice questions against the clock. Highest score wins.',
    minPlayers: 2,
    maxPlayers: 12,
    defaultPlayers: 4,
    accent: 'ember',
    Setup: HotSeatSetup,
    Play: HotSeatPlay,
  },
  {
    id: 'story',
    name: 'Story',
    tagline: 'One line each. Only the last line shows. Chaos at the end.',
    description:
      'Pass the phone. Each player continues the story from the previous line — then read the mess aloud.',
    minPlayers: 2,
    maxPlayers: 12,
    defaultPlayers: 4,
    accent: 'sky',
    Setup: StorySetup,
    Play: StoryPlay,
  },
  {
    id: 'bond',
    name: 'Know You',
    tagline: 'How well do your friends actually know you?',
    description:
      'One person answers privately. Everyone else guesses. Highest score knows them best.',
    minPlayers: 2,
    maxPlayers: 12,
    defaultPlayers: 4,
    accent: 'rose',
    Setup: BondSetup,
    Play: BondPlay,
  },
  {
    id: 'likely',
    name: 'Likely',
    tagline: 'Never have I ever… or who’s most likely to?',
    description:
      'Two modes: tap who “takes a sip”, or pass-and-vote who’s most likely.',
    minPlayers: 2,
    maxPlayers: 12,
    defaultPlayers: 5,
    accent: 'gold',
    Setup: LikelySetup,
    Play: LikelyPlay,
  },
]

/** Games with a working room / online path (everyone on their own phone). */
export const ONLINE_GAME_IDS: GameId[] = ['impostor', 'spy', 'likely']

export function getGame(id: GameId): GameDefinition {
  const game = GAMES.find((g) => g.id === id)
  if (!game) throw new Error(`Unknown game: ${id}`)
  return game
}
