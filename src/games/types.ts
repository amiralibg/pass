import type { ComponentType } from 'react'

export type GameId = 'impostor' | 'fuse'

export interface Player {
  id: string
  name: string
}

export interface GameDefinition {
  id: GameId
  name: string
  tagline: string
  description: string
  minPlayers: number
  maxPlayers: number
  /** Suggested default when opening the lobby */
  defaultPlayers: number
  accent: 'gold' | 'spark'
  Setup: ComponentType
  Play: ComponentType
}

export type AppScreen =
  | 'home'
  | 'lobby'
  | 'setup'
  | 'play'
  | 'howto'
