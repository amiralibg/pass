export type OnlineGameId = 'impostor' | 'spy' | 'likely'

export type RoomPhase =
  | 'lobby'
  | 'setup'
  | 'reveal'
  | 'discuss'
  | 'vote'
  | 'result'
  | 'never'
  | 'mostVote'
  | 'mostTally'
  | 'results'

export interface RoomPlayer {
  id: string
  name: string
  connected: boolean
}

export interface ImpostorSettings {
  packId: string
  impostorCount: number
  discussSeconds: number
  locale: 'en' | 'fa'
}

export interface SpySettings {
  packId: string
  spyCount: number
  discussSeconds: number
  locale: 'en' | 'fa'
}

export interface LikelySettings {
  mode: 'never' | 'most'
  heat: 'normal' | 'spicy'
  rounds: number
  locale: 'en' | 'fa'
}

export interface ImpostorPublicRound {
  phase: 'reveal' | 'discuss' | 'vote' | 'result'
  packId: string
  impostorCount: number
  discussSeconds: number
  discussEndsAt: number | null
  votes: Record<string, string>
  voteCount: number
  eliminatedId: string | null
  secretWord: string | null
  impostorIds: string[] | null
  ackCount?: number
  playerCount?: number
  youAcked?: boolean
  youVoted?: boolean
}

export interface SpyPublicRound {
  phase: 'reveal' | 'discuss' | 'vote' | 'result'
  packId: string
  spyCount: number
  discussSeconds: number
  discussEndsAt: number | null
  votes: Record<string, string>
  voteCount: number
  eliminatedId: string | null
  locationName: string | null
  spyIds: string[] | null
  ackCount?: number
  playerCount?: number
  youAcked?: boolean
  youVoted?: boolean
}

export interface LikelyPublicRound {
  phase: 'never' | 'mostVote' | 'mostTally' | 'results'
  mode: 'never' | 'most'
  heat: 'normal' | 'spicy'
  roundIndex: number
  totalRounds: number
  promptText: string
  promptId: string | null
  sips: Record<string, number> | null
  received: Record<string, number> | null
  votes: Record<string, string>
  voteCount: number
  lastRoundTop: string[]
  playerCount?: number
  youVoted?: boolean
  yourSips?: number
}

export type PublicGameState =
  | {
      id: 'impostor'
      settings: ImpostorSettings
      round?: ImpostorPublicRound
    }
  | {
      id: 'spy'
      settings: SpySettings
      round?: SpyPublicRound
    }
  | {
      id: 'likely'
      settings: LikelySettings
      round?: LikelyPublicRound
    }

export interface PublicRoomState {
  code: string
  hostId: string
  phase: RoomPhase
  gameId: OnlineGameId | null
  players: RoomPlayer[]
  youAreHost: boolean
  packs: string[]
  game: PublicGameState | null
}

export interface PrivateRoomView {
  gameId?: string | null
  role?: 'impostor' | 'crew' | 'spy' | null
  secretWord?: string | null
  locationName?: string | null
  playerRole?: string | null
}

export type ServerMessage =
  | {
      type: 'hello_ok'
      playerId: string
      code: string
      public: PublicRoomState
      private: PrivateRoomView
    }
  | {
      type: 'state'
      public: PublicRoomState
      private: PrivateRoomView
    }
  | { type: 'error'; code?: string; message: string }
  | { type: 'left' }

export type ClientMessage =
  | { type: 'hello'; code: string; playerId?: string; name: string }
  | { type: 'rename'; name: string }
  | {
      type: 'updateSettings'
      packId?: string
      impostorCount?: number
      spyCount?: number
      discussSeconds?: number
      locale?: 'en' | 'fa'
      mode?: 'never' | 'most'
      heat?: 'normal' | 'spicy'
      rounds?: number
    }
  | { type: 'startRound' }
  | { type: 'ackReveal' }
  | { type: 'forceDiscuss' }
  | { type: 'startVote' }
  | { type: 'castVote'; targetId: string }
  | { type: 'toggleSip'; delta?: number }
  | { type: 'nextNever' }
  | { type: 'nextMost' }
  | { type: 'playAgain' }
  | { type: 'leave' }

export const STORAGE_ROOM_CODE = 'pass-room-code'
export const STORAGE_PLAYER_ID = 'pass-player-id'
export const STORAGE_PLAYER_NAME = 'pass-player-name'

export const ROOM_PLAY_PHASES: RoomPhase[] = [
  'reveal',
  'discuss',
  'vote',
  'result',
  'never',
  'mostVote',
  'mostTally',
  'results',
]

export function parseRoomPath(pathname: string): string | null {
  const match = String(pathname || '').match(/^\/r\/([A-Za-z0-9]{3,8})\/?$/i)
  if (!match) return null
  return match[1]!.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 4)
}

export function roomPath(code: string) {
  return `/r/${code}`
}

export function readSessionIdentity() {
  try {
    return {
      code: sessionStorage.getItem(STORAGE_ROOM_CODE),
      playerId: sessionStorage.getItem(STORAGE_PLAYER_ID),
      name: sessionStorage.getItem(STORAGE_PLAYER_NAME),
    }
  } catch {
    return { code: null, playerId: null, name: null }
  }
}

export function writeSessionIdentity(opts: {
  code: string
  playerId: string
  name: string
}) {
  try {
    sessionStorage.setItem(STORAGE_ROOM_CODE, opts.code)
    sessionStorage.setItem(STORAGE_PLAYER_ID, opts.playerId)
    sessionStorage.setItem(STORAGE_PLAYER_NAME, opts.name)
  } catch {
    /* ignore */
  }
}

export function clearSessionIdentity() {
  try {
    sessionStorage.removeItem(STORAGE_ROOM_CODE)
    sessionStorage.removeItem(STORAGE_PLAYER_ID)
    sessionStorage.removeItem(STORAGE_PLAYER_NAME)
  } catch {
    /* ignore */
  }
}
