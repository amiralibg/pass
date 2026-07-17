export interface WordPack {
  id: string
  name: string
  words: string[]
}

export const WORD_PACKS: WordPack[] = [
  {
    id: 'everyday',
    name: 'Everyday',
    words: [
      'Coffee',
      'Pizza',
      'Beach',
      'Library',
      'Airport',
      'Gym',
      'Birthday',
      'Camping',
      'Wedding',
      'Subway',
      'Laundry',
      'Zoo',
      'Museum',
      'Hospital',
      'School',
      'Concert',
      'Market',
      'Hotel',
      'Park',
      'Cinema',
    ],
  },
  {
    id: 'food',
    name: 'Food',
    words: [
      'Sushi',
      'Burger',
      'Taco',
      'Pasta',
      'Ice cream',
      'Ramen',
      'Avocado',
      'Croissant',
      'Barbecue',
      'Smoothie',
      'Donut',
      'Curry',
      'Waffle',
      'Nachos',
      'Bagel',
      'Popcorn',
      'Steak',
      'Mango',
      'Cheese',
      'Chocolate',
    ],
  },
  {
    id: 'places',
    name: 'Places',
    words: [
      'Paris',
      'Tokyo',
      'Desert',
      'Jungle',
      'Castle',
      'Volcano',
      'Island',
      'Skyscraper',
      'Farm',
      'Cave',
      'Stadium',
      'Harbor',
      'Temple',
      'Bridge',
      'Carnival',
      'Observatory',
      'Lighthouse',
      'Marketplace',
      'Underground',
      'Rooftop',
    ],
  },
  {
    id: 'wild',
    name: 'Wild cards',
    words: [
      'Time machine',
      'Invisible ink',
      'Robot dog',
      'Magic mirror',
      'Treasure map',
      'Haunted house',
      'Space station',
      'Dragon egg',
      'Secret tunnel',
      'Talking plant',
      'Flying car',
      'Crystal ball',
      'Pirate ship',
      'Underwater city',
      'Shadow clone',
      'Lucky coin',
      'Midnight feast',
      'Echo chamber',
      'Paper airplane',
      'Thunderstorm',
    ],
  },
]

export function suggestedImpostorCount(playerCount: number) {
  if (playerCount <= 4) return 1
  if (playerCount <= 7) return 1
  if (playerCount <= 10) return 2
  return 3
}
