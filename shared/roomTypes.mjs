/** @typedef {'lobby' | 'setup' | 'reveal' | 'discuss' | 'vote' | 'result'} RoomPhase */

export const ROOM_CODE_LENGTH = 4
export const ROOM_CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
export const MAX_PLAYERS = 12
export const MIN_PLAYERS_IMPOSTOR = 3
export const EMPTY_ROOM_TTL_MS = 10 * 60 * 1000
export const MAX_ROOM_AGE_MS = 4 * 60 * 60 * 1000
export const ROOM_SWEEP_MS = 60 * 1000

export const STORAGE_ROOM_CODE = 'pass-room-code'
export const STORAGE_PLAYER_ID = 'pass-player-id'
export const STORAGE_PLAYER_NAME = 'pass-player-name'

/** @param {string} code */
export function normalizeRoomCode(code) {
  return String(code || '')
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, ROOM_CODE_LENGTH)
}

/** @param {string} pathname */
export function parseRoomPath(pathname) {
  const match = String(pathname || '').match(/^\/r\/([A-Za-z0-9]{3,8})\/?$/i)
  return match ? normalizeRoomCode(match[1]) : null
}
