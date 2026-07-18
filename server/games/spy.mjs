import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PACKS = JSON.parse(
  readFileSync(join(__dirname, '../../shared/spyLocations.json'), 'utf8'),
)

/**
 * @param {number} playerCount
 */
export function suggestedSpyCount(playerCount) {
  if (playerCount <= 6) return 1
  if (playerCount <= 10) return 1
  return 2
}

/**
 * @param {number} playerCount
 */
export function defaultDiscussSeconds(playerCount) {
  if (playerCount <= 5) return 150
  if (playerCount <= 8) return 180
  return 210
}

export function listPackIds() {
  return PACKS.map((p) => p.id)
}

/**
 * @param {string} packId
 */
export function getPack(packId) {
  return PACKS.find((p) => p.id === packId) ?? PACKS[0]
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

export function createInitial() {
  return {
    id: /** @type {const} */ ('spy'),
    settings: {
      packId: listPackIds()[0] ?? 'classic',
      spyCount: 1,
      discussSeconds: 150,
      locale: /** @type {'en' | 'fa'} */ ('en'),
    },
    round: null,
  }
}

/**
 * @param {{ playerIds: string[], packId: string, spyCount: number, discussSeconds: number, locale: 'en' | 'fa' }} opts
 */
export function dealRound(opts) {
  const { playerIds, packId, spyCount, discussSeconds, locale } = opts
  const pack = getPack(packId)
  const locations = pack.locations
  const location = locations[Math.floor(Math.random() * locations.length)] ?? locations[0]
  const count = Math.min(spyCount, Math.max(1, playerIds.length - 1))
  const spyIds = shuffle(playerIds).slice(0, count)
  const spySet = new Set(spyIds)
  const crew = playerIds.filter((id) => !spySet.has(id))
  const rolePool = shuffle([...(location.roles[locale] ?? location.roles.en)])
  /** @type {Record<string, string>} */
  const rolesByPlayer = {}
  crew.forEach((id, i) => {
    rolesByPlayer[id] = rolePool[i % rolePool.length]
  })

  return {
    phase: /** @type {const} */ ('reveal'),
    packId,
    spyCount: count,
    discussSeconds,
    location: {
      id: location.id,
      name: location.name,
    },
    spyIds,
    rolesByPlayer,
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
  if (!game || game.id !== 'spy') {
    return { gameId: room.gameId }
  }

  const round = game.round
  if (!round) {
    return {
      gameId: 'spy',
      role: null,
      locationName: null,
      playerRole: null,
    }
  }

  const isSpy = round.spyIds.includes(playerId)
  const locale = game.settings.locale
  return {
    gameId: 'spy',
    role: isSpy ? 'spy' : 'crew',
    locationName: isSpy ? null : (round.location.name[locale] ?? round.location.name.en),
    playerRole: isSpy ? null : (round.rolesByPlayer[playerId] ?? null),
  }
}

/**
 * @param {import('../rooms.mjs').Room} room
 */
export function publicGameSnapshot(room) {
  const game = room.game
  if (!game || game.id !== 'spy') return null

  const round = game.round
  const base = {
    id: 'spy',
    settings: game.settings,
  }

  if (!round) return base

  return {
    ...base,
    round: {
      phase: round.phase,
      packId: round.packId,
      spyCount: round.spyCount,
      discussSeconds: round.discussSeconds,
      discussEndsAt: round.discussEndsAt,
      votes: round.votes,
      voteCount: Object.keys(round.votes).length,
      eliminatedId: round.phase === 'result' ? round.eliminatedId : null,
      locationName:
        round.phase === 'result'
          ? (round.location.name[game.settings.locale] ?? round.location.name.en)
          : null,
      spyIds: round.phase === 'result' ? round.spyIds : null,
    },
  }
}
