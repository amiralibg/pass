import {
  ackReveal,
  buildClientState,
  castVote,
  forceDiscuss,
  getRoom,
  joinRoom,
  leaveRoom,
  markDisconnected,
  onRoomChange,
  playAgain,
  renamePlayer,
  startRound,
  startVote,
  updateSettings,
} from './rooms.mjs'

/**
 * @param {import('node:http').Server} server
 */
export function attachWebSocket(server) {
  // Dynamic import keeps boot working if `ws` is missing in odd envs
  return import('ws').then(({ WebSocketServer }) => {
    const wss = new WebSocketServer({ server, path: '/ws' })

    /** @type {Map<string, Set<import('ws').WebSocket>>} */
    const socketsByRoom = new Map()

    /**
     * @param {import('./rooms.mjs').Room} room
     */
    function broadcastRoom(room) {
      const set = socketsByRoom.get(room.code)
      if (!set) return
      for (const ws of set) {
        const playerId = /** @type {{ playerId?: string }} */ (ws).playerId
        if (!playerId) continue
        send(ws, { type: 'state', ...buildClientState(room, playerId) })
      }
    }

    onRoomChange(broadcastRoom)

    wss.on('connection', (ws) => {
      /** @type {{ playerId?: string, roomCode?: string }} */
      const meta = ws

      ws.on('message', (raw) => {
        let msg
        try {
          msg = JSON.parse(String(raw))
        } catch {
          send(ws, { type: 'error', code: 'BAD_JSON', message: 'Invalid JSON' })
          return
        }

        try {
          handleMessage(ws, meta, msg, socketsByRoom)
        } catch (err) {
          const code = err && typeof err === 'object' && 'code' in err ? err.code : 'ERROR'
          const message = err instanceof Error ? err.message : 'Request failed'
          send(ws, { type: 'error', code, message })
        }
      })

      ws.on('close', () => {
        const { roomCode, playerId } = meta
        if (!roomCode || !playerId) return
        const set = socketsByRoom.get(roomCode)
        if (set) {
          set.delete(ws)
          if (set.size === 0) socketsByRoom.delete(roomCode)
        }
        const room = getRoom(roomCode)
        if (!room) return
        const stillConnected = set && [...set].some((s) => s.playerId === playerId)
        if (!stillConnected) {
          markDisconnected(room, playerId)
        }
      })
    })

    return wss
  })
}

/**
 * @param {import('ws').WebSocket} ws
 * @param {{ playerId?: string, roomCode?: string }} meta
 * @param {Record<string, unknown>} msg
 * @param {Map<string, Set<import('ws').WebSocket>>} socketsByRoom
 */
function handleMessage(ws, meta, msg, socketsByRoom) {
  const type = msg.type
  if (type === 'hello') {
    const code = String(msg.code || '')
    const room = getRoom(code)
    if (!room) {
      throw Object.assign(new Error('Room not found'), { code: 'NOT_FOUND' })
    }
    const player = joinRoom(room, {
      playerId: typeof msg.playerId === 'string' ? msg.playerId : undefined,
      name: typeof msg.name === 'string' ? msg.name : undefined,
    })

    // Detach from previous room tracking if any
    if (meta.roomCode && meta.roomCode !== room.code) {
      const prev = socketsByRoom.get(meta.roomCode)
      prev?.delete(ws)
    }

    meta.playerId = player.id
    meta.roomCode = room.code
    ws.playerId = player.id

    let set = socketsByRoom.get(room.code)
    if (!set) {
      set = new Set()
      socketsByRoom.set(room.code, set)
    }
    set.add(ws)

    send(ws, {
      type: 'hello_ok',
      playerId: player.id,
      code: room.code,
      ...buildClientState(room, player.id),
    })
    return
  }

  if (!meta.playerId || !meta.roomCode) {
    throw Object.assign(new Error('Say hello first'), { code: 'NO_SESSION' })
  }

  const room = getRoom(meta.roomCode)
  if (!room) {
    throw Object.assign(new Error('Room not found'), { code: 'NOT_FOUND' })
  }

  switch (type) {
    case 'rename':
      renamePlayer(room, meta.playerId, String(msg.name || ''))
      break
    case 'updateSettings':
      updateSettings(room, meta.playerId, {
        packId: typeof msg.packId === 'string' ? msg.packId : undefined,
        impostorCount:
          typeof msg.impostorCount === 'number' ? msg.impostorCount : undefined,
        discussSeconds:
          typeof msg.discussSeconds === 'number' ? msg.discussSeconds : undefined,
        locale: msg.locale === 'fa' || msg.locale === 'en' ? msg.locale : undefined,
      })
      break
    case 'startRound':
      startRound(room, meta.playerId)
      break
    case 'ackReveal':
      ackReveal(room, meta.playerId)
      break
    case 'forceDiscuss':
      forceDiscuss(room, meta.playerId)
      break
    case 'startVote':
      startVote(room, meta.playerId)
      break
    case 'castVote':
      castVote(room, meta.playerId, String(msg.targetId || ''))
      break
    case 'playAgain':
      playAgain(room, meta.playerId)
      break
    case 'leave':
      leaveRoom(room, meta.playerId)
      {
        const set = socketsByRoom.get(room.code)
        set?.delete(ws)
        meta.playerId = undefined
        meta.roomCode = undefined
        ws.playerId = undefined
      }
      send(ws, { type: 'left' })
      break
    default:
      throw Object.assign(new Error(`Unknown type: ${type}`), { code: 'BAD_TYPE' })
  }
}

/**
 * @param {import('ws').WebSocket} ws
 * @param {unknown} payload
 */
function send(ws, payload) {
  if (ws.readyState === 1) {
    ws.send(JSON.stringify(payload))
  }
}
