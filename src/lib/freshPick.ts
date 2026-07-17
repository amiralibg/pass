/**
 * Pick from a pool while avoiding recently used items.
 * History is persisted per bucket (e.g. "impostor:everyday:fa").
 */
const STORAGE_KEY = 'pass-fresh-history'

type HistoryMap = Record<string, string[]>

function readAll(): HistoryMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as HistoryMap
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

function writeAll(map: HistoryMap) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map))
  } catch {
    // ignore quota / private mode
  }
}

export function pickFresh(
  items: string[],
  bucket: string,
  /** How many recent picks to avoid — enough for several party nights. */
  remember = 48,
): string {
  if (items.length === 0) return ''
  if (items.length === 1) return items[0]!

  const map = readAll()
  const recent = map[bucket] ?? []
  const avoid = new Set(recent.slice(0, remember))
  let pool = items.filter((item) => !avoid.has(item))

  // If we've exhausted the pack, reset history and start a fresh cycle.
  if (pool.length === 0) {
    pool = items
    map[bucket] = []
  }

  const pick = pool[Math.floor(Math.random() * pool.length)]!
  const next = [pick, ...recent.filter((x) => x !== pick)].slice(0, remember)
  map[bucket] = next
  writeAll(map)
  return pick
}
