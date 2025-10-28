export interface TarokkaCard {
  id: string;
  name: string;
  suit: 'high' | 'glyphs' | 'stars' | 'coins' | 'swords' | 'crowns';
  imageUrl: string;
  meaning?: string;
  flavorText?: string;
  explanation?: string;
  inRavenloft?: boolean;
  enemyName?: string;
  enemyFlavorText?: string;
}

export type CardPosition = 'deck' | 'drawn' | 'spread';
