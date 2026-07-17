import {
  EMPTY_ROOM_TTL_MS,
  MAX_PLAYERS,
  MAX_ROOM_AGE_MS,
  MIN_PLAYERS_IMPOSTOR,
  ROOM_CODE_ALPHABET,
  ROOM_CODE_LENGTH,
  ROOM_SWEEP_MS,
  normalizeRoomCode,
} from '../shared/roomTypes.mjs'
import {
  dealRound,
  defaultDiscussSeconds,
  listPackIds,
  privateView,
  publicGameSnapshot,
  suggestedImpostorCount,
  tallyVotes,
} from './games/impostor.mjs'

/** @typedef {{ id: string, name: string, connected: boolean }} RoomPlayer */
/**
 * @typedef {{
 *   code: string,
 *   hostId: string,
 *   players: RoomPlayer[],
 *   phase: import('../shared/roomTypes.mjs').RoomPhase,
 *   gameId: 'impostor' | null,
 *   game: null | {
 *     id: 'impostor',
 *     settings: {
 *       packId: string,
 *       impostorCount: number,
 *       discussSeconds: number,
 *       locale: 'en' | 'fa',
 *     },
 *     round: null | {
 *       phase: 'reveal' | 'discuss' | 'vote' | 'result',
 *       packId: string,
 *       impostorCount: number,
 *       discussSeconds: number,
 *       secretWord: string,
 *       impostorIds: string[],
 *       discussEndsAt: number | null,
 *       votes: Record<string, string>,
 *       revealAcks: Record<string, true>,
 *       eliminatedId: string | null,
 *     },
 *   },
 *   createdAt: number,
 *   lastActiveAt: number,
 *   discussTimer: ReturnType<typeof setTimeout> | null,
 * }} Room
 */

/** @type {Map<string, Room>} */
const rooms = new Map()

/** @type {Set<(room: Room) => void>} */
const listeners = new Set()

function createId(prefix = 'p') {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`
}

function randomCode() {
  let code = ''
  for (let i = 0; i < ROOM_CODE_LENGTH; i += 1) {
    code += ROOM_CODE_ALPHABET[Math.floor(Math.random() * ROOM_CODE_ALPHABET.length)]
  }
  return code
}

function touch(room) {
  room.lastActiveAt = Date.now()
}

/**
 * @param {(room: Room) => void} fn
 */
export function onRoomChange(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

/**
 * @param {Room} room
 */
function notify(room) {
  touch(room)
  for (const fn of listeners) {
    try {
      fn(room)
    } catch (err) {
      console.error('room listener error', err)
    }
  }
}

/**
 * @param {Room} room
 */
function clearDiscussTimer(room) {
  if (room.discussTimer) {
    clearTimeout(room.discussTimer)
    room.discussTimer = null
  }
}

/**
 * @param {string} [preferred]
 */
export function createRoom(preferred) {
  let code = preferred ? normalizeRoomCode(preferred) : ''
  if (!code || rooms.has(code)) {
    do {
      code = randomCode()
    } while (rooms.has(code))
  }

  /** @type {Room} */
  const room = {
    code,
    hostId: '',
    players: [],
    phase: 'lobby',
    gameId: 'impostor',
    game: {
      id: 'impostor',
      settings: {
        packId: listPackIds()[0] ?? 'everyday',
        impostorCount: 1,
        discussSeconds: 120,
        locale: 'en',
      },
      round: null,
    },
    createdAt: Date.now(),
    lastActiveAt: Date.now(),
    discussTimer: null,
  }
  rooms.set(code, room)
  return room
}

/** @param {string} code */
export function getRoom(code) {
  return rooms.get(normalizeRoomCode(code)) ?? null
}

/** @param {string} code */
export function roomExists(code) {
  return rooms.has(normalizeRoomCode(code))
}

/**
 * @param {Room} room
 * @param {{ playerId?: string, name?: string }} opts
 */
export function joinRoom(room, opts = {}) {
  const name = String(opts.name || '').trim().slice(0, 24) || 'Player'
  let player = opts.playerId
    ? room.players.find((p) => p.id === opts.playerId)
    : null

  if (player) {
    player.name = name || player.name
    player.connected = true
  } else {
    if (room.players.length >= MAX_PLAYERS) {
      throw Object.assign(new Error('Room is full'), { code: 'ROOM_FULL' })
    }
    if (room.phase !== 'lobby' && room.phase !== 'setup') {
      throw Object.assign(new Error('Game already in progress'), {
        code: 'IN_PROGRESS',
      })
    }
    player = {
      id: createId('p'),
      name,
      connected: true,
    }
    room.players.push(player)
    if (!room.hostId) room.hostId = player.id
  }

  if (!room.hostId || !room.players.some((p) => p.id === room.hostId)) {
    room.hostId = room.players[0]?.id ?? player.id
  }

  notify(room)
  return player
}

/**
 * @param {Room} room
 * @param {string} playerId
 */
export function markDisconnected(room, playerId) {
  const player = room.players.find((p) => p.id === playerId)
  if (!player) return
  player.connected = false
  notify(room)
}

/**
 * @param {Room} room
 */
function syncDefaultSettings(room) {
  if (!room.game || room.game.id !== 'impostor') return
  const n = room.players.length
  if (room.phase === 'lobby' || room.phase === 'setup') {
    room.game.settings.impostorCount = suggestedImpostorCount(Math.max(n, 3))
    room.game.settings.discussSeconds = defaultDiscussSeconds(Math.max(n, 3))
  }
}

/**
 * @param {Room} room
 * @param {string} playerId
 * @param {string} name
 */
export function renamePlayer(room, playerId, name) {
  const player = room.players.find((p) => p.id === playerId)
  if (!player) throw Object.assign(new Error('Player not found'), { code: 'NOT_FOUND' })
  player.name = String(name || '').trim().slice(0, 24) || player.name
  notify(room)
}

/**
 * @param {Room} room
 * @param {string} hostId
 * @param {Partial<{ packId: string, impostorCount: number, discussSeconds: number, locale: 'en' | 'fa' }>} settings
 */
export function updateSettings(room, hostId, settings) {
  assertHost(room, hostId)
  if (room.phase !== 'lobby' && room.phase !== 'setup') {
    throw Object.assign(new Error('Cannot change settings now'), { code: 'BAD_PHASE' })
  }
  if (!room.game || room.game.id !== 'impostor') return
  const next = { ...room.game.settings }
  if (settings.packId && listPackIds().includes(settings.packId)) {
    next.packId = settings.packId
  }
  if (typeof settings.impostorCount === 'number') {
    next.impostorCount = Math.max(
      1,
      Math.min(settings.impostorCount, Math.max(1, room.players.length - 1)),
    )
  }
  if (typeof settings.discussSeconds === 'number') {
    next.discussSeconds = Math.max(30, Math.min(600, Math.round(settings.discussSeconds)))
  }
  if (settings.locale === 'en' || settings.locale === 'fa') {
    next.locale = settings.locale
  }
  room.game.settings = next
  room.phase = 'setup'
  notify(room)
}

/**
 * @param {Room} room
 * @param {string} hostId
 */
export function startRound(room, hostId) {
  assertHost(room, hostId)
  if (!room.game || room.game.id !== 'impostor') {
    throw Object.assign(new Error('No game'), { code: 'NO_GAME' })
  }
  if (room.players.length < MIN_PLAYERS_IMPOSTOR) {
    throw Object.assign(new Error(`Need at least ${MIN_PLAYERS_IMPOSTOR} players`), {
      code: 'NEED_PLAYERS',
    })
  }

  clearDiscussTimer(room)
  const { settings } = room.game
  const dealt = dealRound({
    playerIds: room.players.map((p) => p.id),
    packId: settings.packId,
    impostorCount: settings.impostorCount,
    discussSeconds: settings.discussSeconds,
    locale: settings.locale,
  })

  room.game.round = {
    ...dealt,
    revealAcks: {},
  }
  room.phase = 'reveal'
  notify(room)
}

/**
 * @param {Room} room
 * @param {string} playerId
 */
export function ackReveal(room, playerId) {
  const round = room.game?.round
  if (!round || room.phase !== 'reveal') {
    throw Object.assign(new Error('Not in reveal'), { code: 'BAD_PHASE' })
  }
  if (!room.players.some((p) => p.id === playerId)) {
    throw Object.assign(new Error('Player not found'), { code: 'NOT_FOUND' })
  }
  round.revealAcks[playerId] = true
  const allAcked = room.players.every((p) => round.revealAcks[p.id])
  if (allAcked) {
    beginDiscuss(room)
  } else {
    notify(room)
  }
}

/**
 * @param {Room} room
 * @param {string} hostId
 */
export function forceDiscuss(room, hostId) {
  assertHost(room, hostId)
  if (room.phase !== 'reveal') {
    throw Object.assign(new Error('Not in reveal'), { code: 'BAD_PHASE' })
  }
  beginDiscuss(room)
}

/**
 * @param {Room} room
 */
function beginDiscuss(room) {
  const round = room.game?.round
  if (!round) return
  clearDiscussTimer(room)
  round.phase = 'discuss'
  room.phase = 'discuss'
  round.discussEndsAt = Date.now() + round.discussSeconds * 1000
  const delay = Math.max(0, round.discussEndsAt - Date.now())
  room.discussTimer = setTimeout(() => {
    room.discussTimer = null
    if (room.phase === 'discuss') {
      beginVote(room)
    }
  }, delay + 50)
  room.discussTimer.unref?.()
  notify(room)
}

/**
 * @param {Room} room
 * @param {string} [actorId]
 */
export function startVote(room, actorId) {
  if (room.phase !== 'discuss') {
    throw Object.assign(new Error('Not in discuss'), { code: 'BAD_PHASE' })
  }
  if (actorId && actorId !== room.hostId) {
    // Guests can request skip only if timer already expired
    const endsAt = room.game?.round?.discussEndsAt ?? 0
    if (Date.now() < endsAt) {
      assertHost(room, actorId)
    }
  }
  beginVote(room)
}

/**
 * @param {Room} room
 */
function beginVote(room) {
  const round = room.game?.round
  if (!round) return
  clearDiscussTimer(room)
  round.phase = 'vote'
  room.phase = 'vote'
  round.votes = {}
  round.discussEndsAt = null
  notify(room)
}

/**
 * @param {Room} room
 * @param {string} voterId
 * @param {string} targetId
 */
export function castVote(room, voterId, targetId) {
  const round = room.game?.round
  if (!round || room.phase !== 'vote') {
    throw Object.assign(new Error('Not in vote'), { code: 'BAD_PHASE' })
  }
  if (!room.players.some((p) => p.id === voterId)) {
    throw Object.assign(new Error('Voter not found'), { code: 'NOT_FOUND' })
  }
  if (!room.players.some((p) => p.id === targetId) || targetId === voterId) {
    throw Object.assign(new Error('Invalid target'), { code: 'BAD_TARGET' })
  }
  if (round.votes[voterId]) {
    throw Object.assign(new Error('Already voted'), { code: 'ALREADY_VOTED' })
  }
  round.votes[voterId] = targetId

  const allVoted = room.players.every((p) => round.votes[p.id])
  if (allVoted) {
    round.eliminatedId = tallyVotes(round.votes)
    round.phase = 'result'
    room.phase = 'result'
  }
  notify(room)
}

/**
 * @param {Room} room
 * @param {string} hostId
 */
export function playAgain(room, hostId) {
  assertHost(room, hostId)
  clearDiscussTimer(room)
  if (room.game) {
    room.game.round = null
  }
  room.phase = 'setup'
  syncDefaultSettings(room)
  notify(room)
}

/**
 * @param {Room} room
 * @param {string} playerId
 */
export function leaveRoom(room, playerId) {
  clearDiscussTimer(room)
  room.players = room.players.filter((p) => p.id !== playerId)
  if (room.hostId === playerId) {
    room.hostId = room.players[0]?.id ?? ''
  }
  if (room.players.length === 0) {
    rooms.delete(room.code)
    return
  }
  if (room.phase !== 'lobby' && room.phase !== 'setup' && room.players.length < MIN_PLAYERS_IMPOSTOR) {
    if (room.game) room.game.round = null
    room.phase = 'lobby'
  }
  notify(room)
}

/**
 * @param {Room} room
 * @param {string} playerId
 */
function assertHost(room, playerId) {
  if (playerId !== room.hostId) {
    throw Object.assign(new Error('Host only'), { code: 'NOT_HOST' })
  }
}

/**
 * @param {Room} room
 * @param {string} playerId
 */
export function buildClientState(room, playerId) {
  const round = room.game?.round
  const publicGame = publicGameSnapshot(room)
  if (publicGame?.round && round) {
    publicGame.round.ackCount = Object.keys(round.revealAcks).length
    publicGame.round.playerCount = room.players.length
    publicGame.round.youAcked = Boolean(round.revealAcks[playerId])
    publicGame.round.youVoted = Boolean(round.votes[playerId])
  }

  return {
    public: {
      code: room.code,
      hostId: room.hostId,
      phase: room.phase,
      gameId: room.gameId,
      players: room.players.map((p) => ({
        id: p.id,
        name: p.name,
        connected: p.connected,
      })),
      youAreHost: playerId === room.hostId,
      packs: listPackIds(),
      game: publicGame,
    },
    private: privateView(room, playerId),
  }
}

export function startRoomSweeper() {
  setInterval(() => {
    const now = Date.now()
    for (const [code, room] of rooms) {
      const allGone = room.players.every((p) => !p.connected) || room.players.length === 0
      const emptyTooLong =
        allGone && now - room.lastActiveAt > EMPTY_ROOM_TTL_MS
      const tooOld = now - room.createdAt > MAX_ROOM_AGE_MS
      if (emptyTooLong || tooOld) {
        clearDiscussTimer(room)
        rooms.delete(code)
      }
    }
  }, ROOM_SWEEP_MS).unref?.()
}

export { rooms }
