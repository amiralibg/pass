import { create } from 'zustand'
import { pickFresh } from '../../lib/freshPick'
import { shuffle } from '../../lib/shuffle'
import { usePrefs } from '../../store/prefs'
import { useSession } from '../../store/session'
import { getPackStarters, STARTER_PACKS } from './starters'

export type StoryPhase = 'idle' | 'pass' | 'write' | 'reveal'

export interface StoryLine {
  playerId: string
  text: string
}

interface StoryState {
  phase: StoryPhase
  packId: string
  linesEach: number
  order: string[]
  turnIndex: number
  starter: string
  lines: StoryLine[]
  draft: string

  setPackId: (id: string) => void
  setLinesEach: (n: number) => void
  setDraft: (text: string) => void
  beginRound: () => void
  showWrite: () => void
  submitLine: () => void
  playAgain: () => void
  reset: () => void
}

function pickStarter(packId: string): string {
  const pool = getPackStarters(packId)
  const id = pickFresh(
    pool.map((s) => s.id),
    `story:${packId}`,
    Math.min(120, Math.max(1, pool.length - 1)),
  )
  const starter = pool.find((s) => s.id === id) ?? pool[0]!
  const locale = usePrefs.getState().locale
  return starter.text[locale] ?? starter.text.en
}

export const useStory = create<StoryState>((set, get) => ({
  phase: 'idle',
  packId: STARTER_PACKS[0]!.id,
  linesEach: 1,
  order: [],
  turnIndex: 0,
  starter: '',
  lines: [],
  draft: '',

  setPackId: (id) => set({ packId: id }),
  setLinesEach: (n) => set({ linesEach: n }),
  setDraft: (text) => set({ draft: text }),

  beginRound: () => {
    const players = useSession.getState().players
    const order = shuffle(players.map((p) => p.id))
    const { packId } = get()
    set({
      phase: 'pass',
      order,
      turnIndex: 0,
      starter: pickStarter(packId),
      lines: [],
      draft: '',
    })
  },

  showWrite: () => set({ phase: 'write', draft: '' }),

  submitLine: () => {
    const { draft, order, turnIndex, lines, linesEach } = get()
    const text = draft.trim()
    if (!text) return
    const playerId = order[turnIndex]!
    const nextLines = [...lines, { playerId, text }]
    const totalNeeded = order.length * linesEach
    if (nextLines.length >= totalNeeded) {
      set({ phase: 'reveal', lines: nextLines, draft: '' })
      return
    }
    set({
      phase: 'pass',
      lines: nextLines,
      turnIndex: (turnIndex + 1) % order.length,
      draft: '',
    })
  },

  playAgain: () => {
    get().beginRound()
  },

  reset: () => {
    set({
      phase: 'idle',
      packId: STARTER_PACKS[0]!.id,
      linesEach: 1,
      order: [],
      turnIndex: 0,
      starter: '',
      lines: [],
      draft: '',
    })
  },
}))

export function syncStoryDefaults() {
  // No player-count-specific defaults yet.
}
