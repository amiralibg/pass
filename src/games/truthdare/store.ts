import { create } from 'zustand'
import { pickFresh } from '../../lib/freshPick'
import { useSession } from '../../store/session'
import type { Heat } from '../types'
import { getTdPrompts, type TdKind, type TdPrompt } from './prompts'

export type TdPhase = 'idle' | 'handoff' | 'choose' | 'prompt' | 'results'

interface TruthDareState {
  phase: TdPhase
  heat: Heat
  roundsEach: number

  order: string[]
  turnIndex: number
  /** Prompts completed ("Done") per player. */
  completed: Record<string, number>
  /** Times a player tapped "Chicken". */
  chickened: Record<string, number>

  kind: TdKind | null
  current: TdPrompt | null

  setHeat: (heat: Heat) => void
  setRoundsEach: (n: number) => void
  begin: () => void
  ready: () => void
  pick: (kind: TdKind | 'random') => void
  done: () => void
  chicken: () => void
  nextTurn: () => void
  playAgain: () => void
  reset: () => void
}

function drawPrompt(kind: TdKind, heat: Heat): TdPrompt {
  const pool = getTdPrompts(kind, heat)
  const remember = Math.min(120, Math.max(1, pool.length - 1))
  const id = pickFresh(pool.map((p) => p.id), `td:${kind}:${heat}`, remember)
  return pool.find((p) => p.id === id) ?? pool[0]!
}

function rotatedOrder(ids: string[], rounds: number): string[] {
  const order: string[] = []
  for (let r = 0; r < rounds; r++) order.push(...ids)
  return order
}

export const useTruthDare = create<TruthDareState>((set, get) => ({
  phase: 'idle',
  heat: 'normal',
  roundsEach: 3,

  order: [],
  turnIndex: 0,
  completed: {},
  chickened: {},

  kind: null,
  current: null,

  setHeat: (heat) => set({ heat }),
  setRoundsEach: (roundsEach) => set({ roundsEach }),

  begin: () => {
    const players = useSession.getState().players
    const ids = players.map((p) => p.id)
    const { roundsEach } = get()
    set({
      phase: 'handoff',
      order: rotatedOrder(ids, roundsEach),
      turnIndex: 0,
      completed: Object.fromEntries(ids.map((id) => [id, 0])),
      chickened: Object.fromEntries(ids.map((id) => [id, 0])),
      kind: null,
      current: null,
    })
  },

  ready: () => {
    if (get().phase !== 'handoff') return
    set({ phase: 'choose' })
  },

  pick: (choice) => {
    const { phase, heat } = get()
    if (phase !== 'choose') return
    const kind: TdKind =
      choice === 'random' ? (Math.random() < 0.5 ? 'truth' : 'dare') : choice
    set({ phase: 'prompt', kind, current: drawPrompt(kind, heat) })
  },

  done: () => {
    const { phase, order, turnIndex, completed } = get()
    if (phase !== 'prompt') return
    const playerId = order[turnIndex]!
    set({ completed: { ...completed, [playerId]: (completed[playerId] ?? 0) + 1 } })
    get().nextTurn()
  },

  chicken: () => {
    const { phase, order, turnIndex, chickened } = get()
    if (phase !== 'prompt') return
    const playerId = order[turnIndex]!
    set({ chickened: { ...chickened, [playerId]: (chickened[playerId] ?? 0) + 1 } })
    get().nextTurn()
  },

  nextTurn: () => {
    const { turnIndex, order } = get()
    if (turnIndex + 1 >= order.length) {
      set({ phase: 'results', kind: null, current: null })
      return
    }
    set({
      phase: 'handoff',
      turnIndex: turnIndex + 1,
      kind: null,
      current: null,
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
      completed: {},
      chickened: {},
      kind: null,
      current: null,
    })
  },
}))
