import packs from '../../../shared/likelyPrompts.json'
import type { Locale } from '../../store/prefs'
import type { Heat } from '../types'

export type LikelyMode = 'never' | 'most'
export type LikelyHeat = Heat

export interface LikelyPrompt {
  id: string
  text: Record<Locale, string>
}

export interface LikelyPack {
  id: string
  mode: LikelyMode
  heat: LikelyHeat
  prompts: LikelyPrompt[]
}

/**
 * Large bilingual prompt dictionaries for Likely.
 * Source of truth: shared/likelyPrompts.json (also used by the room server).
 */
export const LIKELY_PACKS = packs as LikelyPack[]

export function getLikelyPrompts(mode: LikelyMode, heat: LikelyHeat): LikelyPrompt[] {
  return (
    LIKELY_PACKS.find((p) => p.mode === mode && p.heat === heat)?.prompts ??
    LIKELY_PACKS[0]!.prompts
  )
}

export function countLikelyPrompts(mode: LikelyMode, heat: LikelyHeat): number {
  return getLikelyPrompts(mode, heat).length
}
