export type RoomPhase =
  | 'lobby'
  | 'setup'
  | 'reveal'
  | 'discuss'
  | 'vote'
  | 'result'

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

export interface PublicRoomState {
  code: string
  hostId: string
  phase: RoomPhase
  gameId: 'impostor' | null
  players: RoomPlayer[]
  youAreHost: boolean
  packs: string[]
  game: null | {
    id: 'impostor'
    settings: ImpostorSettings
    round?: ImpostorPublicRound
  }
}

export interface PrivateRoomView {
  gameId?: string | null
  role: 'impostor' | 'crew' | null
  secretWord: string | null
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
      discussSeconds?: number
      locale?: 'en' | 'fa'
    }
  | { type: 'startRound' }
  | { type: 'ackReveal' }
  | { type: 'forceDiscuss' }
  | { type: 'startVote' }
  | { type: 'castVote'; targetId: string }
  | { type: 'playAgain' }
  | { type: 'leave' }

export const STORAGE_ROOM_CODE = 'pass-room-code'
export const STORAGE_PLAYER_ID = 'pass-player-id'
export const STORAGE_PLAYER_NAME = 'pass-player-name'

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
