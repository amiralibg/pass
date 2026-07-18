import packs from '../../../shared/spyLocations.json'
import type { Locale } from '../../store/prefs'

export interface LocationDef {
  id: string
  name: Record<Locale, string>
  roles: Record<Locale, string[]>
}

export interface LocationPack {
  id: string
  nameKey: string
  locations: LocationDef[]
}

/**
 * Spyfall-style location packs — culturally natural per locale.
 * Roles are shuffled onto non-spy players each round.
 * Source of truth: shared/spyLocations.json (also used by the room server).
 */
export const LOCATION_PACKS = packs as LocationPack[]

export function getPack(packId: string): LocationPack {
  return LOCATION_PACKS.find((p) => p.id === packId) ?? LOCATION_PACKS[0]!
}

export function getPackLocations(packId: string): LocationDef[] {
  return getPack(packId).locations
}

export function suggestedSpyCount(playerCount: number) {
  if (playerCount <= 6) return 1
  if (playerCount <= 10) return 1
  return 2
}
