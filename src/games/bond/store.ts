import { create } from 'zustand'
import { pickFresh } from '../../lib/freshPick'
import { shuffle } from '../../lib/shuffle'
import { useSession } from '../../store/session'
import { BOND_PACKS, getBondQuestions, type BondQuestion } from './questions'

export type BondPhase =
  | 'idle'
  | 'pick'
  | 'answerPass'
  | 'answer'
  | 'guessPass'
  | 'guess'
  | 'feedback'
  | 'results'

interface BondState {
  phase: BondPhase
  packId: string
  questionsEach: number
  subjectId: string | null
  queue: BondQuestion[]
  subjectAnswers: number[]
  answerIndex: number
  guesserOrder: string[]
  guesserIndex: number
  guessQuestionIndex: number
  scores: Record<string, number>
  lastCorrect: boolean | null
  lastGuess: number | null

  setPackId: (id: string) => void
  setQuestionsEach: (n: number) => void
  beginRound: () => void
  pickSubject: (id: string) => void
  showAnswer: () => void
  submitAnswer: (choiceIndex: number) => void
  showGuess: () => void
  submitGuess: (choiceIndex: number) => void
  advanceFeedback: () => void
  playAgain: () => void
  reset: () => void
}

function buildQueue(packId: string, needed: number): BondQuestion[] {
  const pool = getBondQuestions(packId)
  const picked: BondQuestion[] = []
  const used = new Set<string>()

  for (let i = 0; i < needed; i++) {
    let available = pool.filter((q) => !used.has(q.id))
    if (available.length === 0) {
      used.clear()
      available = pool
    }
    const ids = available.map((q) => q.id)
    const id = pickFresh(
      ids,
      `bond:${packId}`,
      Math.min(120, Math.max(1, pool.length - 1)),
    )
    const q = available.find((x) => x.id === id) ?? available[0]!
    used.add(q.id)
    picked.push(q)
  }
  return picked
}

export const useBond = create<BondState>((set, get) => ({
  phase: 'idle',
  packId: BOND_PACKS[0]!.id,
  questionsEach: 5,
  subjectId: null,
  queue: [],
  subjectAnswers: [],
  answerIndex: 0,
  guesserOrder: [],
  guesserIndex: 0,
  guessQuestionIndex: 0,
  scores: {},
  lastCorrect: null,
  lastGuess: null,

  setPackId: (id) => set({ packId: id }),
  setQuestionsEach: (n) => set({ questionsEach: n }),

  beginRound: () => {
    const { packId, questionsEach } = get()
    set({
      phase: 'pick',
      subjectId: null,
      queue: buildQueue(packId, questionsEach),
      subjectAnswers: [],
      answerIndex: 0,
      guesserOrder: [],
      guesserIndex: 0,
      guessQuestionIndex: 0,
      scores: {},
      lastCorrect: null,
      lastGuess: null,
    })
  },

  pickSubject: (id) => {
    const players = useSession.getState().players
    const guesserOrder = shuffle(players.filter((p) => p.id !== id).map((p) => p.id))
    const scores = Object.fromEntries(guesserOrder.map((gid) => [gid, 0]))
    set({
      subjectId: id,
      guesserOrder,
      scores,
      phase: 'answerPass',
      answerIndex: 0,
      subjectAnswers: [],
    })
  },

  showAnswer: () => set({ phase: 'answer' }),

  submitAnswer: (choiceIndex) => {
    const { answerIndex, queue, subjectAnswers } = get()
    const next = [...subjectAnswers, choiceIndex]
    if (answerIndex + 1 >= queue.length) {
      set({
        subjectAnswers: next,
        phase: 'guessPass',
        guesserIndex: 0,
        guessQuestionIndex: 0,
      })
      return
    }
    set({
      subjectAnswers: next,
      answerIndex: answerIndex + 1,
      phase: 'answerPass',
    })
  },

  showGuess: () => set({ phase: 'guess' }),

  submitGuess: (choiceIndex) => {
    const {
      subjectAnswers,
      guessQuestionIndex,
      guesserOrder,
      guesserIndex,
      scores,
    } = get()
    const correct = subjectAnswers[guessQuestionIndex] === choiceIndex
    const guesserId = guesserOrder[guesserIndex]!
    set({
      phase: 'feedback',
      lastCorrect: correct,
      lastGuess: choiceIndex,
      scores: correct
        ? { ...scores, [guesserId]: (scores[guesserId] ?? 0) + 1 }
        : scores,
    })
  },

  advanceFeedback: () => {
    const {
      guessQuestionIndex,
      queue,
      guesserIndex,
      guesserOrder,
    } = get()
    const nextQ = guessQuestionIndex + 1
    if (nextQ < queue.length) {
      set({ guessQuestionIndex: nextQ, phase: 'guessPass', lastCorrect: null, lastGuess: null })
      return
    }
    const nextGuesser = guesserIndex + 1
    if (nextGuesser >= guesserOrder.length) {
      set({ phase: 'results', lastCorrect: null, lastGuess: null })
      return
    }
    set({
      guesserIndex: nextGuesser,
      guessQuestionIndex: 0,
      phase: 'guessPass',
      lastCorrect: null,
      lastGuess: null,
    })
  },

  playAgain: () => {
    get().beginRound()
  },

  reset: () => {
    set({
      phase: 'idle',
      packId: BOND_PACKS[0]!.id,
      questionsEach: 5,
      subjectId: null,
      queue: [],
      subjectAnswers: [],
      answerIndex: 0,
      guesserOrder: [],
      guesserIndex: 0,
      guessQuestionIndex: 0,
      scores: {},
      lastCorrect: null,
      lastGuess: null,
    })
  },
}))

export function syncBondDefaults() {
  // Subject is chosen in play; nothing to sync from lobby count.
}
