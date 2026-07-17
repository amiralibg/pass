import { create } from 'zustand'
import { createId } from '../lib/id'
import type { AppScreen, GameId, PlayMode, Player } from '../games/types'
import type { Locale } from './prefs'
import { usePrefs } from './prefs'

interface SessionState {
  screen: AppScreen
  playMode: PlayMode
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
  openRoomJoin: (code?: string) => void
  openRoomLobby: () => void
  openRoomPlay: () => void
  setPlayMode: (mode: PlayMode) => void

  setPlayers: (players: Player[]) => void
  addPlayer: (name?: string) => void
  removePlayer: (id: string) => void
  renamePlayer: (id: string, name: string) => void
  ensurePlayerCount: (min: number, max: number, preferred?: number) => void
  remapDefaultNames: (locale: Locale) => void
}

const DEFAULT_NAMES: Record<Locale, string[]> = {
  en: ['Alex', 'Sam', 'Jordan', 'Riley', 'Casey', 'Quinn', 'Morgan', 'Avery', 'Reese', 'Blake'],
  fa: ['آریا', 'سارا', 'نیما', 'مینا', 'پارسا', 'رها', 'کیان', 'نیکا', 'آوا', 'سینا'],
}

function namesFor(locale?: Locale) {
  return DEFAULT_NAMES[locale ?? bootLocale()] ?? DEFAULT_NAMES.en
}

function bootLocale(): Locale {
  try {
    const raw = localStorage.getItem('pass-prefs')
    const locale = raw ? (JSON.parse(raw) as { state?: { locale?: Locale } }).state?.locale : null
    return locale === 'fa' ? 'fa' : 'en'
  } catch {
    return 'en'
  }
}

function fallbackName(locale: Locale, index: number) {
  return locale === 'fa' ? `بازیکن ${index + 1}` : `Player ${index + 1}`
}

function makePlayers(count: number): Player[] {
  const locale = bootLocale()
  const names = namesFor(locale)
  return Array.from({ length: count }, (_, i) => ({
    id: createId('p'),
    name: names[i] ?? fallbackName(locale, i),
  }))
}

export const useSession = create<SessionState>((set, get) => ({
  screen: 'home',
  playMode: 'table',
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
      playMode: 'table',
      selectedGameId: gameId,
      screen: 'lobby',
      howToGameId: null,
    }),

  openSetup: () => set({ screen: 'setup' }),
  startPlay: () => set({ screen: 'play' }),
  backToLobby: () => set({ screen: 'lobby' }),
  backToSetup: () => set({ screen: 'setup' }),

  openRoomJoin: () =>
    set({
      playMode: 'room',
      screen: 'roomJoin',
      selectedGameId: null,
      howToGameId: null,
    }),

  openRoomLobby: () =>
    set({
      playMode: 'room',
      screen: 'roomLobby',
    }),

  openRoomPlay: () =>
    set({
      playMode: 'room',
      screen: 'roomPlay',
    }),

  setPlayMode: (mode) => set({ playMode: mode }),

  setPlayers: (players) => set({ players }),

  addPlayer: (name) => {
    const { players } = get()
    const locale = usePrefs.getState().locale
    const names = namesFor(locale)
    const nextIndex = players.length
    set({
      players: [
        ...players,
        {
          id: createId('p'),
          name: name?.trim() || names[nextIndex] || fallbackName(locale, nextIndex),
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
    const locale = usePrefs.getState().locale
    const names = namesFor(locale)
    let players = [...get().players]
    const target = Math.min(max, Math.max(min, preferred ?? players.length))

    while (players.length < target) {
      const i = players.length
      players.push({
        id: createId('p'),
        name: names[i] || fallbackName(locale, i),
      })
    }
    if (players.length > target) {
      players = players.slice(0, target)
    }
    set({ players })
  },

  remapDefaultNames: (locale) => {
    const from = locale === 'fa' ? DEFAULT_NAMES.en : DEFAULT_NAMES.fa
    const to = namesFor(locale)
    const fromSet = new Set(from)

    set({
      players: get().players.map((player, index) => {
        if (!fromSet.has(player.name)) return player
        return {
          ...player,
          name: to[index] ?? fallbackName(locale, index),
        }
      }),
    })
  },
}))
