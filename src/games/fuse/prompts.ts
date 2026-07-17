export const FUSE_PROMPTS = [
  'Name a fruit',
  'Say a movie title',
  'Name an animal',
  'Say a city',
  'Name something cold',
  'Say a color',
  'Name a sport',
  'Say a food you hate',
  'Name a superhero',
  'Say a school subject',
  'Name something sticky',
  'Say a car brand',
  'Name a cartoon character',
  'Say something you do every morning',
  'Name a musical instrument',
  'Say a country',
  'Name something you wear',
  'Say a drink',
  'Name a job',
  'Say an app on your phone',
]

export function suggestedLives(playerCount: number) {
  if (playerCount <= 3) return 3
  if (playerCount <= 6) return 2
  return 2
}
