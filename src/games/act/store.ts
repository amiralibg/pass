import { create } from 'zustand'
import { pickFresh } from '../../lib/freshPick'
import { shuffle } from '../../lib/shuffle'
import { useSession } from '../../store/session'
import { getActWords, type ActWord } from './words'

export type ActPhase = 'idle' | 'handoff' | 'turn' | 'turnEnd' | 'results'
export type ActControl = 'tilt' | 'tap'

interface ActState {
  phase: ActPhase
  packId: string
  turnSeconds: number
  roundsEach: number
  controlMode: ActControl

  /** Actor ids in play order — players repeated roundsEach times. */
  order: string[]
  turnIndex: number
  scores: Record<string, number>

  /** Word ids already shown this game (across all turns). */
  usedIds: string[]
  current: ActWord | null
  endsAt: number | null
  guessed: ActWord[]
  skipped: ActWord[]

  setPackId: (id: string) => void
  setTurnSeconds: (s: number) => void
  setRoundsEach: (n: number) => void
  setControlMode: (mode: ActControl) => void
  begin: () => void
  startTurn: () => void
  gotIt: () => void
  skip: () => void
  endTurn: () => void
  nextTurn: () => void
  playAgain: () => void
  reset: () => void
}

function drawWord(packId: string, usedIds: string[]): { word: ActWord; usedIds: string[] } {
  const pool = getActWords(packId)
  let used = usedIds
  let available = pool.filter((w) => !used.includes(w.id))
  if (available.length === 0) {
    used = []
    available = pool
  }
  const remember = Math.min(160, Math.max(1, pool.length - 1))
  const id = pickFresh(available.map((w) => w.id), `act:${packId}`, remember)
  const word = available.find((w) => w.id === id) ?? available[0]!
  return { word, usedIds: [...used, word.id] }
}

export const useAct = create<ActState>((set, get) => ({
  phase: 'idle',
  packId: 'mix',
  turnSeconds: 60,
  roundsEach: 2,
  controlMode: 'tilt',

  order: [],
  turnIndex: 0,
  scores: {},

  usedIds: [],
  current: null,
  endsAt: null,
  guessed: [],
  skipped: [],

  setPackId: (packId) => set({ packId }),
  setTurnSeconds: (turnSeconds) => set({ turnSeconds }),
  setRoundsEach: (roundsEach) => set({ roundsEach }),
  setControlMode: (controlMode) => set({ controlMode }),

  begin: () => {
    const players = useSession.getState().players
    const ids = players.map((p) => p.id)
    const { roundsEach } = get()
    // Shuffle within each round so the same actor never goes twice in a row
    // more often than necessary, but everyone acts once per round.
    const order: string[] = []
    for (let r = 0; r < roundsEach; r++) order.push(...shuffle(ids))
    set({
      phase: 'handoff',
      order,
      turnIndex: 0,
      scores: Object.fromEntries(ids.map((id) => [id, 0])),
      usedIds: [],
      current: null,
      endsAt: null,
      guessed: [],
      skipped: [],
    })
  },

  startTurn: () => {
    const { packId, usedIds, turnSeconds } = get()
    const { word, usedIds: nextUsed } = drawWord(packId, usedIds)
    set({
      phase: 'turn',
      current: word,
      usedIds: nextUsed,
      endsAt: Date.now() + turnSeconds * 1000,
      guessed: [],
      skipped: [],
    })
  },

  gotIt: () => {
    const { phase, packId, usedIds, current, guessed, scores, order, turnIndex } = get()
    if (phase !== 'turn' || !current) return
    const actorId = order[turnIndex]!
    const { word, usedIds: nextUsed } = drawWord(packId, usedIds)
    set({
      scores: { ...scores, [actorId]: (scores[actorId] ?? 0) + 1 },
      guessed: [...guessed, current],
      current: word,
      usedIds: nextUsed,
    })
  },

  skip: () => {
    const { phase, packId, usedIds, current, skipped } = get()
    if (phase !== 'turn' || !current) return
    const { word, usedIds: nextUsed } = drawWord(packId, usedIds)
    set({
      skipped: [...skipped, current],
      current: word,
      usedIds: nextUsed,
    })
  },

  endTurn: () => {
    if (get().phase !== 'turn') return
    set({ phase: 'turnEnd', endsAt: null })
  },

  nextTurn: () => {
    const { turnIndex, order } = get()
    if (turnIndex + 1 >= order.length) {
      set({ phase: 'results', current: null, endsAt: null })
      return
    }
    set({
      phase: 'handoff',
      turnIndex: turnIndex + 1,
      current: null,
      endsAt: null,
      guessed: [],
      skipped: [],
    })
  },

  playAgain: () => {
    get().begin()
  },

  reset: () => {
    set({
      phase: 'idle',
      order: [],
      turnIndex: 0,
      scores: {},
      usedIds: [],
      current: null,
      endsAt: null,
      guessed: [],
      skipped: [],
    })
  },
}))
