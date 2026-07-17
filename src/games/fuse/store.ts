import { create } from 'zustand'
import { pickRandom, randomInt, shuffle } from '../../lib/shuffle'
import { useSession } from '../../store/session'
import { FUSE_PROMPTS, suggestedLives } from './prompts'

export type FusePhase = 'idle' | 'hold' | 'boom' | 'winner'

interface FuseState {
  phase: FusePhase
  livesEach: number
  minSeconds: number
  maxSeconds: number
  order: string[]
  holderIndex: number
  lives: Record<string, number>
  prompt: string
  fuseEndsAt: number | null
  lastEliminatedId: string | null
  winnerId: string | null

  setLivesEach: (n: number) => void
  setMinSeconds: (n: number) => void
  setMaxSeconds: (n: number) => void
  beginRound: () => void
  passBomb: () => void
  explode: () => void
  continueAfterBoom: () => void
  playAgain: () => void
  reset: () => void
}

function aliveIds(lives: Record<string, number>, order: string[]) {
  return order.filter((id) => (lives[id] ?? 0) > 0)
}

export const useFuse = create<FuseState>((set, get) => ({
  phase: 'idle',
  livesEach: 2,
  minSeconds: 10,
  maxSeconds: 35,
  order: [],
  holderIndex: 0,
  lives: {},
  prompt: '',
  fuseEndsAt: null,
  lastEliminatedId: null,
  winnerId: null,

  setLivesEach: (n) => set({ livesEach: n }),
  setMinSeconds: (n) => set({ minSeconds: n }),
  setMaxSeconds: (n) => set({ maxSeconds: Math.max(n, get().minSeconds + 1) }),

  beginRound: () => {
    const players = useSession.getState().players
    const { livesEach, minSeconds, maxSeconds } = get()
    const order = shuffle(players.map((p) => p.id))
    const lives = Object.fromEntries(order.map((id) => [id, livesEach]))
    const duration = randomInt(minSeconds, maxSeconds) * 1000

    set({
      phase: 'hold',
      order,
      holderIndex: 0,
      lives,
      prompt: pickRandom(FUSE_PROMPTS),
      fuseEndsAt: Date.now() + duration,
      lastEliminatedId: null,
      winnerId: null,
    })
  },

  passBomb: () => {
    const { order, holderIndex, lives, phase } = get()
    if (phase !== 'hold') return

    const alive = aliveIds(lives, order)
    if (alive.length <= 1) return

    const currentId = order[holderIndex]!
    const currentAlivePos = alive.indexOf(currentId)
    const nextId = alive[(currentAlivePos + 1) % alive.length]!
    const nextIndex = order.indexOf(nextId)

    // Fuse keeps ticking — only the holder and prompt change.
    set({
      holderIndex: nextIndex,
      prompt: pickRandom(FUSE_PROMPTS),
    })
  },

  explode: () => {
    const { order, holderIndex, lives, phase } = get()
    if (phase !== 'hold') return

    const holderId = order[holderIndex]!
    const nextLives = {
      ...lives,
      [holderId]: Math.max(0, (lives[holderId] ?? 0) - 1),
    }
    const remaining = aliveIds(nextLives, order)

    if (remaining.length <= 1) {
      set({
        phase: 'winner',
        lives: nextLives,
        fuseEndsAt: null,
        lastEliminatedId: holderId,
        winnerId: remaining[0] ?? null,
      })
      return
    }

    set({
      phase: 'boom',
      lives: nextLives,
      fuseEndsAt: null,
      lastEliminatedId: holderId,
    })
  },

  continueAfterBoom: () => {
    const { order, lives, lastEliminatedId, minSeconds, maxSeconds } = get()
    const alive = aliveIds(lives, order)
    if (alive.length <= 1) {
      set({
        phase: 'winner',
        winnerId: alive[0] ?? null,
        fuseEndsAt: null,
      })
      return
    }

    const startFrom = lastEliminatedId
      ? alive[(alive.indexOf(lastEliminatedId) + 1) % alive.length]!
      : alive[0]!
    const holderIndex = order.indexOf(startFrom)
    const duration = randomInt(minSeconds, maxSeconds) * 1000

    set({
      phase: 'hold',
      holderIndex,
      prompt: pickRandom(FUSE_PROMPTS),
      fuseEndsAt: Date.now() + duration,
      lastEliminatedId: null,
    })
  },

  playAgain: () => {
    get().beginRound()
  },

  reset: () => {
    const count = useSession.getState().players.length
    set({
      phase: 'idle',
      livesEach: suggestedLives(count),
      minSeconds: 10,
      maxSeconds: 35,
      order: [],
      holderIndex: 0,
      lives: {},
      prompt: '',
      fuseEndsAt: null,
      lastEliminatedId: null,
      winnerId: null,
    })
  },
}))

export function syncFuseDefaults() {
  const count = useSession.getState().players.length
  useFuse.setState({ livesEach: suggestedLives(count) })
}
