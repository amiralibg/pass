import * as impostor from './impostor.mjs'
import * as spy from './spy.mjs'
import * as likely from './likely.mjs'

/** @typedef {'impostor' | 'spy' | 'likely'} OnlineGameId */

/** @type {OnlineGameId[]} */
export const ONLINE_GAME_IDS = ['impostor', 'spy', 'likely']

/**
 * @param {string} gameId
 * @returns {gameId is OnlineGameId}
 */
export function isOnlineGameId(gameId) {
  return ONLINE_GAME_IDS.includes(/** @type {OnlineGameId} */ (gameId))
}

/**
 * @param {OnlineGameId} gameId
 */
export function minPlayersFor(gameId) {
  if (gameId === 'likely') return 2
  return 3
}

/**
 * @param {OnlineGameId} gameId
 */
export function createInitialGame(gameId) {
  if (gameId === 'spy') return spy.createInitial()
  if (gameId === 'likely') return likely.createInitial()
  return {
    id: /** @type {const} */ ('impostor'),
    settings: {
      packId: impostor.listPackIds()[0] ?? 'everyday',
      impostorCount: 1,
      discussSeconds: 120,
      locale: /** @type {'en' | 'fa'} */ ('en'),
    },
    round: null,
  }
}

/**
 * @param {string | null} gameId
 */
export function listPackIdsFor(gameId) {
  if (gameId === 'spy') return spy.listPackIds()
  if (gameId === 'impostor') return impostor.listPackIds()
  return []
}

/**
 * @param {import('../rooms.mjs').Room} room
 * @param {string} playerId
 */
export function privateViewFor(room, playerId) {
  if (room.gameId === 'spy') return spy.privateView(room, playerId)
  if (room.gameId === 'likely') return likely.privateView(room, playerId)
  return impostor.privateView(room, playerId)
}

/**
 * @param {import('../rooms.mjs').Room} room
 */
export function publicGameSnapshotFor(room) {
  if (room.gameId === 'spy') return spy.publicGameSnapshot(room)
  if (room.gameId === 'likely') return likely.publicGameSnapshot(room)
  return impostor.publicGameSnapshot(room)
}

export { impostor, spy, likely }
