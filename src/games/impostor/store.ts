import { create } from 'zustand'
import { pickFresh } from '../../lib/freshPick'
import { shuffle } from '../../lib/shuffle'
import { usePrefs } from '../../store/prefs'
import { useSession } from '../../store/session'
import { getPackWords, suggestedImpostorCount, WORD_PACKS } from './words'

export type ImpostorPhase =
  | 'idle'
  | 'pass'
  | 'reveal'
  | 'discuss'
  | 'vote'
  | 'result'

interface ImpostorState {
  phase: ImpostorPhase
  packId: string
  impostorCount: number
  discussSeconds: number
  secretWord: string
  impostorIds: string[]
  revealIndex: number
  revealed: boolean
  discussEndsAt: number | null
  votes: Record<string, string>
  eliminatedId: string | null

  setPackId: (id: string) => void
  setImpostorCount: (n: number) => void
  setDiscussSeconds: (n: number) => void
  beginRound: () => void
  showReveal: () => void
  hideAndAdvance: () => void
  startDiscuss: () => void
  goToVote: () => void
  castVote: (voterId: string, targetId: string) => void
  finishVote: () => void
  playAgain: () => void
  reset: () => void
}

function defaultsFromPlayers(count: number) {
  return {
    impostorCount: suggestedImpostorCount(count),
    discussSeconds: count <= 5 ? 120 : count <= 8 ? 150 : 180,
  }
}

export const useImpostor = create<ImpostorState>((set, get) => ({
  phase: 'idle',
  packId: WORD_PACKS[0]!.id,
  impostorCount: 1,
  discussSeconds: 120,
  secretWord: '',
  impostorIds: [],
  revealIndex: 0,
  revealed: false,
  discussEndsAt: null,
  votes: {},
  eliminatedId: null,

  setPackId: (id) => set({ packId: id }),
  setImpostorCount: (n) => set({ impostorCount: n }),
  setDiscussSeconds: (n) => set({ discussSeconds: n }),

  beginRound: () => {
    const players = useSession.getState().players
    const locale = usePrefs.getState().locale
    const { packId, impostorCount } = get()
    const words = getPackWords(packId, locale)
    const secretWord = pickFresh(words, `impostor:${packId}:${locale}`)
    const impostorIds = shuffle(players.map((p) => p.id)).slice(
      0,
      Math.min(impostorCount, Math.max(1, players.length - 1)),
    )

    set({
      phase: 'pass',
      secretWord,
      impostorIds,
      revealIndex: 0,
      revealed: false,
      discussEndsAt: null,
      votes: {},
      eliminatedId: null,
    })
  },

  showReveal: () => set({ revealed: true, phase: 'reveal' }),

  hideAndAdvance: () => {
    const players = useSession.getState().players
    const { revealIndex } = get()
    const next = revealIndex + 1
    if (next >= players.length) {
      set({
        phase: 'discuss',
        revealed: false,
        discussEndsAt: Date.now() + get().discussSeconds * 1000,
      })
      return
    }
    set({ revealIndex: next, revealed: false, phase: 'pass' })
  },

  startDiscuss: () =>
    set({
      phase: 'discuss',
      discussEndsAt: Date.now() + get().discussSeconds * 1000,
    }),

  goToVote: () => set({ phase: 'vote', votes: {} }),

  castVote: (voterId, targetId) => {
    set({ votes: { ...get().votes, [voterId]: targetId } })
  },

  finishVote: () => {
    const { votes, impostorIds } = get()
    const tallies = new Map<string, number>()
    Object.values(votes).forEach((target) => {
      tallies.set(target, (tallies.get(target) ?? 0) + 1)
    })

    let eliminatedId: string | null = null
    let best = -1
    tallies.forEach((count, id) => {
      if (count > best) {
        best = count
        eliminatedId = id
      } else if (count === best) {
        eliminatedId = null
      }
    })

    void impostorIds
    set({ phase: 'result', eliminatedId })
  },

  playAgain: () => {
    const count = useSession.getState().players.length
    const d = defaultsFromPlayers(count)
    set({
      phase: 'idle',
      impostorCount: d.impostorCount,
      discussSeconds: d.discussSeconds,
      secretWord: '',
      impostorIds: [],
      revealIndex: 0,
      revealed: false,
      discussEndsAt: null,
      votes: {},
      eliminatedId: null,
    })
    get().beginRound()
  },

  reset: () => {
    const count = useSession.getState().players.length
    const d = defaultsFromPlayers(count)
    set({
      phase: 'idle',
      packId: WORD_PACKS[0]!.id,
      impostorCount: d.impostorCount,
      discussSeconds: d.discussSeconds,
      secretWord: '',
      impostorIds: [],
      revealIndex: 0,
      revealed: false,
      discussEndsAt: null,
      votes: {},
      eliminatedId: null,
    })
  },
}))

export function syncImpostorDefaults() {
  const count = useSession.getState().players.length
  const d = defaultsFromPlayers(count)
  useImpostor.setState({
    impostorCount: d.impostorCount,
    discussSeconds: d.discussSeconds,
  })
}
