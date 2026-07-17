import { create } from 'zustand'
import { pickFresh } from '../../lib/freshPick'
import { shuffle } from '../../lib/shuffle'
import { usePrefs } from '../../store/prefs'
import { useSession } from '../../store/session'
import {
  getPackLocations,
  LOCATION_PACKS,
  suggestedSpyCount,
  type LocationDef,
} from './locations'

export type SpyPhase =
  | 'idle'
  | 'pass'
  | 'reveal'
  | 'discuss'
  | 'vote'
  | 'result'

interface SpyState {
  phase: SpyPhase
  packId: string
  spyCount: number
  discussSeconds: number
  location: LocationDef | null
  spyIds: string[]
  /** playerId → role (spies omitted) */
  rolesByPlayer: Record<string, string>
  revealIndex: number
  revealed: boolean
  discussEndsAt: number | null
  votes: Record<string, string>
  eliminatedId: string | null

  setPackId: (id: string) => void
  setSpyCount: (n: number) => void
  setDiscussSeconds: (n: number) => void
  beginRound: () => void
  showReveal: () => void
  hideAndAdvance: () => void
  goToVote: () => void
  castVote: (voterId: string, targetId: string) => void
  finishVote: () => void
  playAgain: () => void
  reset: () => void
}

function defaultsFromPlayers(count: number) {
  return {
    spyCount: suggestedSpyCount(count),
    discussSeconds: count <= 5 ? 150 : count <= 8 ? 180 : 210,
  }
}

export const useSpy = create<SpyState>((set, get) => ({
  phase: 'idle',
  packId: LOCATION_PACKS[0]!.id,
  spyCount: 1,
  discussSeconds: 150,
  location: null,
  spyIds: [],
  rolesByPlayer: {},
  revealIndex: 0,
  revealed: false,
  discussEndsAt: null,
  votes: {},
  eliminatedId: null,

  setPackId: (id) => set({ packId: id }),
  setSpyCount: (n) => set({ spyCount: n }),
  setDiscussSeconds: (n) => set({ discussSeconds: n }),

  beginRound: () => {
    const players = useSession.getState().players
    const locale = usePrefs.getState().locale
    const { packId, spyCount } = get()
    const locations = getPackLocations(packId)
    const locationIds = locations.map((l) => l.id)
    const pickedId = pickFresh(locationIds, `spy:${packId}`, 40)
    const location = locations.find((l) => l.id === pickedId) ?? locations[0]!

    const spyIds = shuffle(players.map((p) => p.id)).slice(
      0,
      Math.min(spyCount, Math.max(1, players.length - 1)),
    )
    const spySet = new Set(spyIds)
    const crew = players.filter((p) => !spySet.has(p.id))
    const rolePool = shuffle([...(location.roles[locale] ?? location.roles.en)])
    const rolesByPlayer: Record<string, string> = {}
    crew.forEach((p, i) => {
      rolesByPlayer[p.id] = rolePool[i % rolePool.length]!
    })

    set({
      phase: 'pass',
      location,
      spyIds,
      rolesByPlayer,
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

  goToVote: () => set({ phase: 'vote', votes: {} }),

  castVote: (voterId, targetId) => {
    set({ votes: { ...get().votes, [voterId]: targetId } })
  },

  finishVote: () => {
    const { votes } = get()
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

    set({ phase: 'result', eliminatedId })
  },

  playAgain: () => {
    const count = useSession.getState().players.length
    const d = defaultsFromPlayers(count)
    set({
      phase: 'idle',
      spyCount: d.spyCount,
      discussSeconds: d.discussSeconds,
      location: null,
      spyIds: [],
      rolesByPlayer: {},
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
      packId: LOCATION_PACKS[0]!.id,
      spyCount: d.spyCount,
      discussSeconds: d.discussSeconds,
      location: null,
      spyIds: [],
      rolesByPlayer: {},
      revealIndex: 0,
      revealed: false,
      discussEndsAt: null,
      votes: {},
      eliminatedId: null,
    })
  },
}))

export function syncSpyDefaults() {
  const count = useSession.getState().players.length
  const d = defaultsFromPlayers(count)
  useSpy.setState({
    spyCount: d.spyCount,
    discussSeconds: d.discussSeconds,
  })
}
