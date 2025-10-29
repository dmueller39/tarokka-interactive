export interface TarokkaEnemy {
  name: string;
  flavorText: string;
}

export interface TarokkaCard {
  id: string;
  name: string;
  suit: 'high' | 'glyphs' | 'stars' | 'coins' | 'swords' | 'crowns';
  imageUrl: string;
  meaning?: string;
  flavorText?: string;
  explanation?: string;
  inRavenloft?: boolean;
  enemies?: TarokkaEnemy[];
}

export type CardPosition = 'deck' | 'drawn' | 'spread';
