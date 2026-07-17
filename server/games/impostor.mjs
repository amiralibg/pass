import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PACKS = JSON.parse(
  readFileSync(join(__dirname, '../../shared/impostorPacks.json'), 'utf8'),
)

/**
 * @param {number} playerCount
 */
export function suggestedImpostorCount(playerCount) {
  if (playerCount <= 4) return 1
  if (playerCount <= 7) return 1
  if (playerCount <= 10) return 2
  return 3
}

/**
 * @param {number} playerCount
 */
export function defaultDiscussSeconds(playerCount) {
  if (playerCount <= 5) return 120
  if (playerCount <= 8) return 150
  return 180
}

/**
 * @param {string} packId
 * @param {'en' | 'fa'} locale
 */
export function getPackWords(packId, locale) {
  const pack = PACKS.find((p) => p.id === packId) ?? PACKS[0]
  return pack.words[locale] ?? pack.words.en
}

export function listPackIds() {
  return PACKS.map((p) => p.id)
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
 * @param {{ playerIds: string[], packId: string, impostorCount: number, discussSeconds: number, locale: 'en' | 'fa' }} opts
 */
export function dealRound(opts) {
  const { playerIds, packId, impostorCount, discussSeconds, locale } = opts
  const words = getPackWords(packId, locale)
  const secretWord = words[Math.floor(Math.random() * words.length)] ?? 'Secret'
  const count = Math.min(impostorCount, Math.max(1, playerIds.length - 1))
  const impostorIds = shuffle(playerIds).slice(0, count)

  return {
    phase: /** @type {const} */ ('reveal'),
    packId,
    impostorCount: count,
    discussSeconds,
    secretWord,
    impostorIds,
    discussEndsAt: null,
    votes: /** @type {Record<string, string>} */ ({}),
    eliminatedId: null,
  }
}

/**
 * @param {Record<string, string>} votes
 */
export function tallyVotes(votes) {
  const tallies = new Map()
  for (const target of Object.values(votes)) {
    tallies.set(target, (tallies.get(target) ?? 0) + 1)
  }

  let eliminatedId = null
  let best = -1
  for (const [id, count] of tallies) {
    if (count > best) {
      best = count
      eliminatedId = id
    } else if (count === best) {
      eliminatedId = null
    }
  }
  return eliminatedId
}

/**
 * @param {import('../rooms.mjs').Room} room
 * @param {string} playerId
 */
export function privateView(room, playerId) {
  const game = room.game
  if (!game || game.id !== 'impostor') {
    return { gameId: room.gameId }
  }

  const round = game.round
  if (!round) {
    return {
      gameId: 'impostor',
      role: null,
      secretWord: null,
    }
  }

  const isImpostor = round.impostorIds.includes(playerId)
  return {
    gameId: 'impostor',
    role: isImpostor ? 'impostor' : 'crew',
    secretWord: isImpostor ? null : round.secretWord,
    // On result, everyone learns the word via public snapshot
  }
}

/**
 * Public impostor fields — never include impostorIds or secretWord until result.
 * @param {import('../rooms.mjs').Room} room
 */
export function publicGameSnapshot(room) {
  const game = room.game
  if (!game || game.id !== 'impostor') return null

  const round = game.round
  const base = {
    id: 'impostor',
    settings: game.settings,
  }

  if (!round) return base

  return {
    ...base,
    round: {
      phase: round.phase,
      packId: round.packId,
      impostorCount: round.impostorCount,
      discussSeconds: round.discussSeconds,
      discussEndsAt: round.discussEndsAt,
      votes: round.votes,
      voteCount: Object.keys(round.votes).length,
      eliminatedId: round.phase === 'result' ? round.eliminatedId : null,
      secretWord: round.phase === 'result' ? round.secretWord : null,
      impostorIds: round.phase === 'result' ? round.impostorIds : null,
    },
  }
}
