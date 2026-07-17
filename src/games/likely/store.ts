import { create } from 'zustand'
import { pickFresh } from '../../lib/freshPick'
import { shuffle } from '../../lib/shuffle'
import { useSession } from '../../store/session'
import {
  getLikelyPrompts,
  type LikelyHeat,
  type LikelyMode,
  type LikelyPrompt,
} from './prompts'

export type LikelyPhase =
  | 'idle'
  | 'never'
  | 'mostPass'
  | 'mostVote'
  | 'mostTally'
  | 'results'

interface LikelyState {
  phase: LikelyPhase
  mode: LikelyMode
  heat: LikelyHeat
  rounds: number
  queue: LikelyPrompt[]
  roundIndex: number
  /** Never mode: how many times each player “took a sip”. */
  sips: Record<string, number>
  /** Most mode: cumulative votes received. */
  received: Record<string, number>
  voterOrder: string[]
  voterIndex: number
  roundVotes: Record<string, string>
  lastRoundTop: string[]

  setMode: (mode: LikelyMode) => void
  setHeat: (heat: LikelyHeat) => void
  setRounds: (n: number) => void
  beginRound: () => void
  toggleSip: (playerId: string) => void
  nextNever: () => void
  showMostVote: () => void
  castVote: (targetId: string) => void
  nextMost: () => void
  playAgain: () => void
  reset: () => void
}

function buildQueue(
  mode: LikelyMode,
  heat: LikelyHeat,
  rounds: number,
): LikelyPrompt[] {
  const pool = getLikelyPrompts(mode, heat)
  const picked: LikelyPrompt[] = []
  const used = new Set<string>()
  const remember = Math.min(120, Math.max(1, pool.length - 1))

  for (let i = 0; i < rounds; i++) {
    let available = pool.filter((p) => !used.has(p.id))
    if (available.length === 0) {
      used.clear()
      available = pool
    }
    const ids = available.map((p) => p.id)
    const id = pickFresh(ids, `likely:${mode}:${heat}`, remember)
    const prompt = available.find((x) => x.id === id) ?? available[0]!
    used.add(prompt.id)
    picked.push(prompt)
  }
  return picked
}

function emptyScores(ids: string[]): Record<string, number> {
  return Object.fromEntries(ids.map((id) => [id, 0]))
}

export const useLikely = create<LikelyState>((set, get) => ({
  phase: 'idle',
  mode: 'never',
  heat: 'normal',
  rounds: 8,
  queue: [],
  roundIndex: 0,
  sips: {},
  received: {},
  voterOrder: [],
  voterIndex: 0,
  roundVotes: {},
  lastRoundTop: [],

  setMode: (mode) => set({ mode }),
  setHeat: (heat) => set({ heat }),
  setRounds: (n) => set({ rounds: n }),

  beginRound: () => {
    const players = useSession.getState().players
    const ids = players.map((p) => p.id)
    const { mode, heat, rounds } = get()
    const queue = buildQueue(mode, heat, rounds)

    if (mode === 'never') {
      set({
        phase: 'never',
        queue,
        roundIndex: 0,
        sips: emptyScores(ids),
        received: {},
        voterOrder: [],
        voterIndex: 0,
        roundVotes: {},
        lastRoundTop: [],
      })
      return
    }

    set({
      phase: 'mostPass',
      queue,
      roundIndex: 0,
      sips: {},
      received: emptyScores(ids),
      voterOrder: shuffle(ids),
      voterIndex: 0,
      roundVotes: {},
      lastRoundTop: [],
    })
  },

  toggleSip: (playerId) => {
    const { phase, sips } = get()
    if (phase !== 'never') return
    set({ sips: { ...sips, [playerId]: (sips[playerId] ?? 0) + 1 } })
  },

  nextNever: () => {
    const { roundIndex, queue } = get()
    if (roundIndex + 1 >= queue.length) {
      set({ phase: 'results' })
      return
    }
    set({ roundIndex: roundIndex + 1 })
  },

  showMostVote: () => set({ phase: 'mostVote' }),

  castVote: (targetId) => {
    const { phase, voterOrder, voterIndex, roundVotes, received } = get()
    if (phase !== 'mostVote') return
    const voterId = voterOrder[voterIndex]!
    const nextVotes = { ...roundVotes, [voterId]: targetId }

    if (voterIndex + 1 < voterOrder.length) {
      set({
        roundVotes: nextVotes,
        voterIndex: voterIndex + 1,
        phase: 'mostPass',
      })
      return
    }

    const tally = { ...received }
    for (const target of Object.values(nextVotes)) {
      tally[target] = (tally[target] ?? 0) + 1
    }

    const counts = new Map<string, number>()
    for (const target of Object.values(nextVotes)) {
      counts.set(target, (counts.get(target) ?? 0) + 1)
    }
    let best = 0
    for (const c of counts.values()) best = Math.max(best, c)
    const lastRoundTop = [...counts.entries()]
      .filter(([, c]) => c === best)
      .map(([id]) => id)

    set({
      roundVotes: nextVotes,
      received: tally,
      lastRoundTop,
      phase: 'mostTally',
    })
  },

  nextMost: () => {
    const { roundIndex, queue } = get()
    const players = useSession.getState().players
    if (roundIndex + 1 >= queue.length) {
      set({ phase: 'results' })
      return
    }
    set({
      roundIndex: roundIndex + 1,
      voterOrder: shuffle(players.map((p) => p.id)),
      voterIndex: 0,
      roundVotes: {},
      lastRoundTop: [],
      phase: 'mostPass',
    })
  },

  playAgain: () => {
    get().beginRound()
  },

  reset: () => {
    set({
      phase: 'idle',
      mode: 'never',
      heat: 'normal',
      rounds: 8,
      queue: [],
      roundIndex: 0,
      sips: {},
      received: {},
      voterOrder: [],
      voterIndex: 0,
      roundVotes: {},
      lastRoundTop: [],
    })
  },
}))

export function syncLikelyDefaults() {
  // Nothing player-count specific.
}
