import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PACKS = JSON.parse(
  readFileSync(join(__dirname, '../../shared/likelyPrompts.json'), 'utf8'),
)

/**
 * @param {'never' | 'most'} mode
 * @param {'normal' | 'spicy'} heat
 */
export function getPrompts(mode, heat) {
  const pack = PACKS.find((p) => p.mode === mode && p.heat === heat) ?? PACKS[0]
  return pack.prompts
}

export function createInitial() {
  return {
    id: /** @type {const} */ ('likely'),
    settings: {
      mode: /** @type {'never' | 'most'} */ ('never'),
      heat: /** @type {'normal' | 'spicy'} */ ('normal'),
      rounds: 8,
      locale: /** @type {'en' | 'fa'} */ ('en'),
    },
    round: null,
  }
}

/** @param {unknown[]} items */
function shuffle(items) {
  const next = [...items]
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[next[i], next[j]] = [next[j], next[i]]
  }
  return next
}

/**
 * @param {{ mode: 'never' | 'most', heat: 'normal' | 'spicy', rounds: number }} opts
 */
function buildQueue(opts) {
  const pool = getPrompts(opts.mode, opts.heat)
  const picked = []
  const used = new Set()
  for (let i = 0; i < opts.rounds; i += 1) {
    let available = pool.filter((p) => !used.has(p.id))
    if (available.length === 0) {
      used.clear()
      available = pool
    }
    const prompt = available[Math.floor(Math.random() * available.length)]
    used.add(prompt.id)
    picked.push(prompt)
  }
  return picked
}

/**
 * @param {string[]} ids
 */
function emptyScores(ids) {
  return Object.fromEntries(ids.map((id) => [id, 0]))
}

/**
 * @param {{ playerIds: string[], mode: 'never' | 'most', heat: 'normal' | 'spicy', rounds: number }} opts
 */
export function dealRound(opts) {
  const { playerIds, mode, heat, rounds } = opts
  const queue = buildQueue({ mode, heat, rounds })
  const phase = mode === 'never' ? 'never' : 'mostVote'

  return {
    phase: /** @type {'never' | 'mostVote'} */ (phase),
    mode,
    heat,
    queue,
    roundIndex: 0,
    sips: mode === 'never' ? emptyScores(playerIds) : {},
    received: mode === 'most' ? emptyScores(playerIds) : {},
    votes: /** @type {Record<string, string>} */ ({}),
    lastRoundTop: /** @type {string[]} */ ([]),
  }
}

/**
 * @param {import('../rooms.mjs').Room} room
 * @param {string} _playerId
 */
export function privateView(room, _playerId) {
  return {
    gameId: room.gameId,
  }
}

/**
 * @param {import('../rooms.mjs').Room} room
 */
export function publicGameSnapshot(room) {
  const game = room.game
  if (!game || game.id !== 'likely') return null

  const round = game.round
  const base = {
    id: 'likely',
    settings: game.settings,
  }

  if (!round) return base

  const prompt = round.queue[round.roundIndex]
  const locale = game.settings.locale
  const showVotes = round.phase === 'mostTally' || round.phase === 'results'

  return {
    ...base,
    round: {
      phase: round.phase,
      mode: round.mode,
      heat: round.heat,
      roundIndex: round.roundIndex,
      totalRounds: round.queue.length,
      promptText: prompt ? (prompt.text[locale] ?? prompt.text.en) : '',
      promptId: prompt?.id ?? null,
      sips: round.mode === 'never' ? round.sips : null,
      received: round.mode === 'most' ? round.received : null,
      votes: showVotes ? round.votes : {},
      voteCount: Object.keys(round.votes).length,
      lastRoundTop: round.phase === 'mostTally' || round.phase === 'results' ? round.lastRoundTop : [],
    },
  }
}

/**
 * @param {Record<string, string>} votes
 * @param {Record<string, number>} received
 */
export function applyMostTally(votes, received) {
  const tally = { ...received }
  for (const target of Object.values(votes)) {
    tally[target] = (tally[target] ?? 0) + 1
  }

  const counts = new Map()
  for (const target of Object.values(votes)) {
    counts.set(target, (counts.get(target) ?? 0) + 1)
  }
  let best = 0
  for (const c of counts.values()) best = Math.max(best, c)
  const lastRoundTop = [...counts.entries()]
    .filter(([, c]) => c === best)
    .map(([id]) => id)

  return { received: tally, lastRoundTop }
}

export { shuffle }
