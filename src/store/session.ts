import { create } from 'zustand'
import { createId } from '../lib/id'
import type { AppScreen, GameId, Player } from '../games/types'

interface SessionState {
  screen: AppScreen
  selectedGameId: GameId | null
  players: Player[]
  howToGameId: GameId | null

  goHome: () => void
  openHowTo: (gameId?: GameId) => void
  selectGame: (gameId: GameId) => void
  openSetup: () => void
  startPlay: () => void
  backToLobby: () => void
  backToSetup: () => void

  setPlayers: (players: Player[]) => void
  addPlayer: (name?: string) => void
  removePlayer: (id: string) => void
  renamePlayer: (id: string, name: string) => void
  ensurePlayerCount: (min: number, max: number, preferred?: number) => void
}

const defaultNames = ['Alex', 'Sam', 'Jordan', 'Riley', 'Casey', 'Quinn', 'Morgan', 'Avery', 'Reese', 'Blake']

function makePlayers(count: number): Player[] {
  return Array.from({ length: count }, (_, i) => ({
    id: createId('p'),
    name: defaultNames[i] ?? `Player ${i + 1}`,
  }))
}

export const useSession = create<SessionState>((set, get) => ({
  screen: 'home',
  selectedGameId: null,
  players: makePlayers(4),
  howToGameId: null,

  goHome: () =>
    set({
      screen: 'home',
      selectedGameId: null,
      howToGameId: null,
    }),

  openHowTo: (gameId) =>
    set({
      screen: 'howto',
      howToGameId: gameId ?? get().selectedGameId,
    }),

  selectGame: (gameId) =>
    set({
      selectedGameId: gameId,
      screen: 'lobby',
      howToGameId: null,
    }),

  openSetup: () => set({ screen: 'setup' }),
  startPlay: () => set({ screen: 'play' }),
  backToLobby: () => set({ screen: 'lobby' }),
  backToSetup: () => set({ screen: 'setup' }),

  setPlayers: (players) => set({ players }),

  addPlayer: (name) => {
    const { players } = get()
    const nextIndex = players.length
    set({
      players: [
        ...players,
        {
          id: createId('p'),
          name: name?.trim() || defaultNames[nextIndex] || `Player ${nextIndex + 1}`,
        },
      ],
    })
  },

  removePlayer: (id) => {
    const { players } = get()
    if (players.length <= 1) return
    set({ players: players.filter((p) => p.id !== id) })
  },

  renamePlayer: (id, name) => {
    set({
      players: get().players.map((p) => (p.id === id ? { ...p, name } : p)),
    })
  },

  ensurePlayerCount: (min, max, preferred) => {
    let players = [...get().players]
    const target = Math.min(max, Math.max(min, preferred ?? players.length))

    while (players.length < target) {
      const i = players.length
      players.push({
        id: createId('p'),
        name: defaultNames[i] || `Player ${i + 1}`,
      })
    }
    if (players.length > target) {
      players = players.slice(0, target)
    }
    set({ players })
  },
}))
