import { create } from 'zustand'
import { pickFresh } from '../../lib/freshPick'
import { shuffle } from '../../lib/shuffle'
import { usePrefs } from '../../store/prefs'
import { useSession } from '../../store/session'
import {
  getPackQuestions,
  QUESTION_PACKS,
  type TriviaQuestion,
} from './questions'

export type HotSeatPhase =
  | 'idle'
  | 'turn'
  | 'question'
  | 'feedback'
  | 'winner'

export interface ShuffledChoice {
  label: string
  correct: boolean
}

interface HotSeatState {
  phase: HotSeatPhase
  packId: string
  secondsPerQuestion: number
  questionsEach: number
  order: string[]
  scores: Record<string, number>
  turnIndex: number
  questionInTurn: number
  queue: TriviaQuestion[]
  current: TriviaQuestion | null
  choices: ShuffledChoice[]
  questionEndsAt: number | null
  lastCorrect: boolean | null
  timedOut: boolean
  selectedIndex: number | null

  setPackId: (id: string) => void
  setSecondsPerQuestion: (n: number) => void
  setQuestionsEach: (n: number) => void
  beginRound: () => void
  startQuestion: () => void
  answer: (choiceIndex: number) => void
  expireQuestion: () => void
  advance: () => void
  playAgain: () => void
  reset: () => void
}

function buildQueue(packId: string, needed: number): TriviaQuestion[] {
  const pool = getPackQuestions(packId)
  const picked: TriviaQuestion[] = []
  const used = new Set<string>()

  for (let i = 0; i < needed; i++) {
    let available = pool.filter((q) => !used.has(q.id))
    if (available.length === 0) {
      used.clear()
      available = pool
    }
    const ids = available.map((q) => q.id)
    const id = pickFresh(ids, `hotseat:${packId}`, Math.min(48, pool.length - 1))
    const q = available.find((x) => x.id === id) ?? available[0]!
    used.add(q.id)
    picked.push(q)
  }
  return picked
}

function shuffleChoices(q: TriviaQuestion, locale: 'en' | 'fa'): ShuffledChoice[] {
  const labels = q.choices[locale] ?? q.choices.en
  const items = labels.map((label, i) => ({
    label,
    correct: i === q.correctIndex,
  }))
  return shuffle(items)
}

export const useHotSeat = create<HotSeatState>((set, get) => ({
  phase: 'idle',
  packId: QUESTION_PACKS[0]!.id,
  secondsPerQuestion: 12,
  questionsEach: 3,
  order: [],
  scores: {},
  turnIndex: 0,
  questionInTurn: 0,
  queue: [],
  current: null,
  choices: [],
  questionEndsAt: null,
  lastCorrect: null,
  timedOut: false,
  selectedIndex: null,

  setPackId: (id) => set({ packId: id }),
  setSecondsPerQuestion: (n) => set({ secondsPerQuestion: n }),
  setQuestionsEach: (n) => set({ questionsEach: n }),

  beginRound: () => {
    const players = useSession.getState().players
    const { packId, questionsEach } = get()
    const order = shuffle(players.map((p) => p.id))
    const scores = Object.fromEntries(order.map((id) => [id, 0]))
    const needed = order.length * questionsEach
    const queue = buildQueue(packId, needed)

    set({
      phase: 'turn',
      order,
      scores,
      turnIndex: 0,
      questionInTurn: 0,
      queue,
      current: null,
      choices: [],
      questionEndsAt: null,
      lastCorrect: null,
      timedOut: false,
      selectedIndex: null,
    })
  },

  startQuestion: () => {
    const { queue, turnIndex, questionInTurn, questionsEach, secondsPerQuestion } =
      get()
    const idx = turnIndex * questionsEach + questionInTurn
    const current = queue[idx]
    if (!current) {
      set({ phase: 'winner' })
      return
    }
    const locale = usePrefs.getState().locale
    set({
      phase: 'question',
      current,
      choices: shuffleChoices(current, locale),
      questionEndsAt: Date.now() + secondsPerQuestion * 1000,
      lastCorrect: null,
      timedOut: false,
      selectedIndex: null,
    })
  },

  answer: (choiceIndex) => {
    const { phase, choices, order, turnIndex, scores } = get()
    if (phase !== 'question') return
    const choice = choices[choiceIndex]
    if (!choice) return
    const playerId = order[turnIndex]!
    const correct = choice.correct
    set({
      phase: 'feedback',
      lastCorrect: correct,
      timedOut: false,
      selectedIndex: choiceIndex,
      questionEndsAt: null,
      scores: correct
        ? { ...scores, [playerId]: (scores[playerId] ?? 0) + 1 }
        : scores,
    })
  },

  expireQuestion: () => {
    const { phase } = get()
    if (phase !== 'question') return
    set({
      phase: 'feedback',
      lastCorrect: false,
      timedOut: true,
      selectedIndex: null,
      questionEndsAt: null,
    })
  },

  advance: () => {
    const { turnIndex, questionInTurn, questionsEach, order } = get()
    const nextQ = questionInTurn + 1
    if (nextQ < questionsEach) {
      set({ questionInTurn: nextQ, phase: 'turn' })
      return
    }
    const nextTurn = turnIndex + 1
    if (nextTurn >= order.length) {
      set({ phase: 'winner' })
      return
    }
    set({ turnIndex: nextTurn, questionInTurn: 0, phase: 'turn' })
  },

  playAgain: () => {
    get().beginRound()
  },

  reset: () => {
    set({
      phase: 'idle',
      packId: QUESTION_PACKS[0]!.id,
      secondsPerQuestion: 12,
      questionsEach: 3,
      order: [],
      scores: {},
      turnIndex: 0,
      questionInTurn: 0,
      queue: [],
      current: null,
      choices: [],
      questionEndsAt: null,
      lastCorrect: null,
      timedOut: false,
      selectedIndex: null,
    })
  },
}))

export function syncHotSeatDefaults() {
  // Nothing player-count specific yet — kept for lobby parity.
}
