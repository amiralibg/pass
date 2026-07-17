import type { ComponentType } from 'react'

export type GameId =
  | 'impostor'
  | 'fuse'
  | 'spy'
  | 'hotseat'
  | 'story'
  | 'bond'
  | 'likely'

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
  accent: 'gold' | 'spark' | 'mint' | 'ember' | 'sky' | 'rose'
  Setup: ComponentType
  Play: ComponentType
}

export type AppScreen =
  | 'home'
  | 'lobby'
  | 'setup'
  | 'play'
  | 'howto'
  | 'roomJoin'
  | 'roomLobby'
  | 'roomPlay'

export type PlayMode = 'table' | 'room'
