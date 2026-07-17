import { normalizeRoomCode } from '../shared/roomTypes.mjs'

export {
  createRoom,
  getRoom,
  startRoomSweeper,
} from './rooms.mjs'

/** @param {string} code */
export function normalizeRoomCodeSafe(code) {
  return normalizeRoomCode(code)
}
