import {
  EMPTY_ROOM_TTL_MS,
  MAX_PLAYERS,
  MAX_ROOM_AGE_MS,
  ROOM_CODE_ALPHABET,
  ROOM_CODE_LENGTH,
  ROOM_SWEEP_MS,
  normalizeRoomCode,
} from '../shared/roomTypes.mjs'
import {
  createInitialGame,
  impostor,
  isOnlineGameId,
  likely,
  listPackIdsFor,
  minPlayersFor,
  privateViewFor,
  publicGameSnapshotFor,
  spy,
} from './games/catalog.mjs'

/** @typedef {{ id: string, name: string, connected: boolean }} RoomPlayer */
/**
 * @typedef {{
 *   code: string,
 *   hostId: string,
 *   players: RoomPlayer[],
 *   phase: import('../shared/roomTypes.mjs').RoomPhase,
 *   gameId: import('./games/catalog.mjs').OnlineGameId,
 *   game: any,
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
 * @param {string} [gameId]
 */
export function createRoom(preferred, gameId = 'impostor') {
  const resolved = isOnlineGameId(gameId) ? gameId : 'impostor'
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
    gameId: resolved,
    game: createInitialGame(resolved),
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
  const n = Math.max(room.players.length, minPlayersFor(room.gameId))
  if (room.phase !== 'lobby' && room.phase !== 'setup') return

  if (room.gameId === 'impostor' && room.game?.id === 'impostor') {
    room.game.settings.impostorCount = impostor.suggestedImpostorCount(n)
    room.game.settings.discussSeconds = impostor.defaultDiscussSeconds(n)
  } else if (room.gameId === 'spy' && room.game?.id === 'spy') {
    room.game.settings.spyCount = spy.suggestedSpyCount(n)
    room.game.settings.discussSeconds = spy.defaultDiscussSeconds(n)
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
 * @param {Record<string, unknown>} settings
 */
export function updateSettings(room, hostId, settings) {
  assertHost(room, hostId)
  if (room.phase !== 'lobby' && room.phase !== 'setup') {
    throw Object.assign(new Error('Cannot change settings now'), { code: 'BAD_PHASE' })
  }
  if (!room.game) return

  if (room.gameId === 'impostor' && room.game.id === 'impostor') {
    const next = { ...room.game.settings }
    if (typeof settings.packId === 'string' && impostor.listPackIds().includes(settings.packId)) {
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
  } else if (room.gameId === 'spy' && room.game.id === 'spy') {
    const next = { ...room.game.settings }
    if (typeof settings.packId === 'string' && spy.listPackIds().includes(settings.packId)) {
      next.packId = settings.packId
    }
    if (typeof settings.spyCount === 'number') {
      next.spyCount = Math.max(
        1,
        Math.min(settings.spyCount, Math.max(1, room.players.length - 1)),
      )
    }
    if (typeof settings.discussSeconds === 'number') {
      next.discussSeconds = Math.max(30, Math.min(600, Math.round(settings.discussSeconds)))
    }
    if (settings.locale === 'en' || settings.locale === 'fa') {
      next.locale = settings.locale
    }
    room.game.settings = next
  } else if (room.gameId === 'likely' && room.game.id === 'likely') {
    const next = { ...room.game.settings }
    if (settings.mode === 'never' || settings.mode === 'most') {
      next.mode = settings.mode
    }
    if (settings.heat === 'normal' || settings.heat === 'spicy') {
      next.heat = settings.heat
    }
    if (typeof settings.rounds === 'number') {
      next.rounds = Math.max(3, Math.min(20, Math.round(settings.rounds)))
    }
    if (settings.locale === 'en' || settings.locale === 'fa') {
      next.locale = settings.locale
    }
    room.game.settings = next
  }

  room.phase = 'setup'
  notify(room)
}

/**
 * @param {Room} room
 * @param {string} hostId
 */
export function startRound(room, hostId) {
  assertHost(room, hostId)
  if (!room.game) {
    throw Object.assign(new Error('No game'), { code: 'NO_GAME' })
  }
  const min = minPlayersFor(room.gameId)
  if (room.players.length < min) {
    throw Object.assign(new Error(`Need at least ${min} players`), {
      code: 'NEED_PLAYERS',
    })
  }

  clearDiscussTimer(room)
  const playerIds = room.players.map((p) => p.id)
  const { settings } = room.game

  if (room.gameId === 'impostor') {
    const dealt = impostor.dealRound({
      playerIds,
      packId: settings.packId,
      impostorCount: settings.impostorCount,
      discussSeconds: settings.discussSeconds,
      locale: settings.locale,
    })
    room.game.round = { ...dealt, revealAcks: {} }
    room.phase = 'reveal'
  } else if (room.gameId === 'spy') {
    const dealt = spy.dealRound({
      playerIds,
      packId: settings.packId,
      spyCount: settings.spyCount,
      discussSeconds: settings.discussSeconds,
      locale: settings.locale,
    })
    room.game.round = { ...dealt, revealAcks: {} }
    room.phase = 'reveal'
  } else if (room.gameId === 'likely') {
    const dealt = likely.dealRound({
      playerIds,
      mode: settings.mode,
      heat: settings.heat,
      rounds: settings.rounds,
    })
    room.game.round = dealt
    room.phase = dealt.phase
  }

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
  if (room.gameId === 'likely') {
    castLikelyVote(room, voterId, targetId)
    return
  }

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
    const tally =
      room.gameId === 'spy' ? spy.tallyVotes(round.votes) : impostor.tallyVotes(round.votes)
    round.eliminatedId = tally
    round.phase = 'result'
    room.phase = 'result'
  }
  notify(room)
}

/**
 * @param {Room} room
 * @param {string} voterId
 * @param {string} targetId
 */
function castLikelyVote(room, voterId, targetId) {
  const round = room.game?.round
  if (!round || room.phase !== 'mostVote' || round.mode !== 'most') {
    throw Object.assign(new Error('Not in vote'), { code: 'BAD_PHASE' })
  }
  if (!room.players.some((p) => p.id === voterId)) {
    throw Object.assign(new Error('Voter not found'), { code: 'NOT_FOUND' })
  }
  if (!room.players.some((p) => p.id === targetId)) {
    throw Object.assign(new Error('Invalid target'), { code: 'BAD_TARGET' })
  }
  if (round.votes[voterId]) {
    throw Object.assign(new Error('Already voted'), { code: 'ALREADY_VOTED' })
  }
  round.votes[voterId] = targetId

  const allVoted = room.players.every((p) => round.votes[p.id])
  if (allVoted) {
    const { received, lastRoundTop } = likely.applyMostTally(round.votes, round.received)
    round.received = received
    round.lastRoundTop = lastRoundTop
    round.phase = 'mostTally'
    room.phase = 'mostTally'
  }
  notify(room)
}

/**
 * @param {Room} room
 * @param {string} playerId
 * @param {number} [delta]
 */
export function toggleSip(room, playerId, delta = 1) {
  const round = room.game?.round
  if (!round || room.phase !== 'never' || round.mode !== 'never') {
    throw Object.assign(new Error('Not in never mode'), { code: 'BAD_PHASE' })
  }
  if (!room.players.some((p) => p.id === playerId)) {
    throw Object.assign(new Error('Player not found'), { code: 'NOT_FOUND' })
  }
  const step = delta < 0 ? -1 : 1
  const current = round.sips[playerId] ?? 0
  round.sips[playerId] = Math.max(0, current + step)
  notify(room)
}

/**
 * @param {Room} room
 * @param {string} hostId
 */
export function nextNever(room, hostId) {
  assertHost(room, hostId)
  const round = room.game?.round
  if (!round || room.phase !== 'never' || round.mode !== 'never') {
    throw Object.assign(new Error('Not in never mode'), { code: 'BAD_PHASE' })
  }
  if (round.roundIndex + 1 >= round.queue.length) {
    round.phase = 'results'
    room.phase = 'results'
  } else {
    round.roundIndex += 1
  }
  notify(room)
}

/**
 * @param {Room} room
 * @param {string} hostId
 */
export function nextMost(room, hostId) {
  assertHost(room, hostId)
  const round = room.game?.round
  if (!round || room.phase !== 'mostTally' || round.mode !== 'most') {
    throw Object.assign(new Error('Not in tally'), { code: 'BAD_PHASE' })
  }
  if (round.roundIndex + 1 >= round.queue.length) {
    round.phase = 'results'
    room.phase = 'results'
  } else {
    round.roundIndex += 1
    round.votes = {}
    round.lastRoundTop = []
    round.phase = 'mostVote'
    room.phase = 'mostVote'
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
  const min = minPlayersFor(room.gameId)
  if (room.phase !== 'lobby' && room.phase !== 'setup' && room.players.length < min) {
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
  const publicGame = publicGameSnapshotFor(room)

  if (publicGame?.round && round) {
    if (room.gameId === 'impostor' || room.gameId === 'spy') {
      publicGame.round.ackCount = Object.keys(round.revealAcks ?? {}).length
      publicGame.round.playerCount = room.players.length
      publicGame.round.youAcked = Boolean(round.revealAcks?.[playerId])
      publicGame.round.youVoted = Boolean(round.votes?.[playerId])
    } else if (room.gameId === 'likely') {
      publicGame.round.playerCount = room.players.length
      publicGame.round.youVoted = Boolean(round.votes?.[playerId])
      publicGame.round.yourSips = round.sips?.[playerId] ?? 0
    }
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
      packs: listPackIdsFor(room.gameId),
      game: publicGame,
    },
    private: privateViewFor(room, playerId),
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
