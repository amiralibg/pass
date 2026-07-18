import { create } from 'zustand'
import { roomSocket } from './socket'
import {
  clearSessionIdentity,
  parseRoomPath,
  readSessionIdentity,
  roomPath,
  writeSessionIdentity,
  type OnlineGameId,
  type PrivateRoomView,
  type PublicRoomState,
  type ServerMessage,
} from './types'

type Status = 'idle' | 'connecting' | 'joined' | 'error'

export type SettingsPatch = {
  packId?: string
  impostorCount?: number
  spyCount?: number
  discussSeconds?: number
  locale?: 'en' | 'fa'
  mode?: 'never' | 'most'
  heat?: 'normal' | 'spicy'
  rounds?: number
}

interface RoomStore {
  status: Status
  error: string | null
  playerId: string | null
  name: string
  public: PublicRoomState | null
  private: PrivateRoomView | null
  pendingCode: string | null

  setName: (name: string) => void
  createAndJoin: (name: string, gameId?: OnlineGameId) => Promise<void>
  join: (code: string, name: string) => void
  reconnectFromStorage: () => boolean
  bootstrapFromUrl: () => string | null
  rename: (name: string) => void
  updateSettings: (patch: SettingsPatch) => void
  startRound: () => void
  ackReveal: () => void
  forceDiscuss: () => void
  startVote: () => void
  castVote: (targetId: string) => void
  toggleSip: (delta?: number) => void
  nextNever: () => void
  nextMost: () => void
  playAgain: () => void
  leave: () => void
  clearError: () => void
}

let subscribed = false

function ensureSubscription() {
  if (subscribed) return
  subscribed = true
  roomSocket.onMessage(handleServerMessage)
}

function handleServerMessage(msg: ServerMessage) {
  const set = useRoom.setState
  if (msg.type === 'error') {
    set({ status: 'error', error: msg.message })
    return
  }
  if (msg.type === 'left') {
    clearSessionIdentity()
    if (window.location.pathname.startsWith('/r/')) {
      window.history.replaceState({}, '', '/')
    }
    set({
      status: 'idle',
      error: null,
      playerId: null,
      public: null,
      private: null,
      pendingCode: null,
    })
    return
  }
  if (msg.type === 'hello_ok' || msg.type === 'state') {
    const name =
      msg.public.players.find((p) => p.id === (msg.type === 'hello_ok' ? msg.playerId : useRoom.getState().playerId))
        ?.name ?? useRoom.getState().name
    const playerId = msg.type === 'hello_ok' ? msg.playerId : useRoom.getState().playerId
    if (playerId) {
      writeSessionIdentity({ code: msg.public.code, playerId, name })
      const path = roomPath(msg.public.code)
      if (window.location.pathname !== path) {
        window.history.replaceState({}, '', path)
      }
    }
    set({
      status: 'joined',
      error: null,
      playerId,
      name,
      public: msg.public,
      private: msg.private,
      pendingCode: msg.public.code,
    })
  }
}

async function createRoomCode(gameId: OnlineGameId): Promise<string> {
  const res = await fetch('/api/rooms', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ gameId }),
  })
  if (!res.ok) throw new Error('Could not create room')
  const data = (await res.json()) as { code: string }
  return data.code
}

export const useRoom = create<RoomStore>((set, get) => ({
  status: 'idle',
  error: null,
  playerId: null,
  name: '',
  public: null,
  private: null,
  pendingCode: null,

  setName: (name) => set({ name }),

  createAndJoin: async (name, gameId = 'impostor') => {
    ensureSubscription()
    const trimmed = name.trim().slice(0, 24) || 'Player'
    set({ status: 'connecting', error: null, name: trimmed })
    try {
      const code = await createRoomCode(gameId)
      roomSocket.connect()
      roomSocket.send({ type: 'hello', code, name: trimmed })
    } catch (err) {
      set({
        status: 'error',
        error: err instanceof Error ? err.message : 'Could not create room',
      })
    }
  },

  join: (code, name) => {
    ensureSubscription()
    const trimmed = name.trim().slice(0, 24) || 'Player'
    const normalized = code.trim().toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 4)
    if (normalized.length < 4) {
      set({ status: 'error', error: 'Enter a 4-character room code' })
      return
    }
    set({ status: 'connecting', error: null, name: trimmed, pendingCode: normalized })
    roomSocket.connect()
    const stored = readSessionIdentity()
    const reuseId =
      stored.code === normalized && stored.playerId ? stored.playerId : undefined
    roomSocket.send({
      type: 'hello',
      code: normalized,
      name: trimmed,
      playerId: reuseId,
    })
  },

  reconnectFromStorage: () => {
    const stored = readSessionIdentity()
    if (!stored.code || !stored.playerId || !stored.name) return false
    ensureSubscription()
    set({
      status: 'connecting',
      name: stored.name,
      pendingCode: stored.code,
      playerId: stored.playerId,
    })
    roomSocket.connect()
    roomSocket.send({
      type: 'hello',
      code: stored.code,
      playerId: stored.playerId,
      name: stored.name,
    })
    return true
  },

  bootstrapFromUrl: () => {
    return parseRoomPath(window.location.pathname)
  },

  rename: (name) => {
    const trimmed = name.trim().slice(0, 24)
    if (!trimmed) return
    set({ name: trimmed })
    roomSocket.send({ type: 'rename', name: trimmed })
  },

  updateSettings: (patch) => roomSocket.send({ type: 'updateSettings', ...patch }),
  startRound: () => roomSocket.send({ type: 'startRound' }),
  ackReveal: () => roomSocket.send({ type: 'ackReveal' }),
  forceDiscuss: () => roomSocket.send({ type: 'forceDiscuss' }),
  startVote: () => roomSocket.send({ type: 'startVote' }),
  castVote: (targetId) => roomSocket.send({ type: 'castVote', targetId }),
  toggleSip: (delta = 1) => roomSocket.send({ type: 'toggleSip', delta }),
  nextNever: () => roomSocket.send({ type: 'nextNever' }),
  nextMost: () => roomSocket.send({ type: 'nextMost' }),
  playAgain: () => roomSocket.send({ type: 'playAgain' }),

  leave: () => {
    roomSocket.send({ type: 'leave' })
    clearSessionIdentity()
    if (window.location.pathname.startsWith('/r/')) {
      window.history.replaceState({}, '', '/')
    }
    set({
      status: 'idle',
      error: null,
      playerId: null,
      public: null,
      private: null,
      pendingCode: null,
    })
  },

  clearError: () => set({ error: null, status: get().public ? 'joined' : 'idle' }),
}))
