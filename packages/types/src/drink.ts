import type { BaristaRank } from './user';

export type DrinkCategory = 'espresso' | 'milk' | 'filter' | 'cold';

export interface DrinkSpec {
  doseGrams: number | null;
  yieldGrams: number | null;
  extractionTimeSec: [number, number] | null; // [min, max]
  milkTextureTarget: string | null;
  servingTempCelsius: number | null;
  cupSizeMl: number | null;
}

export interface Drink {
  id: string;
  name: string;
  slug: string;
  category: DrinkCategory;
  description: string;
  difficultyRank: BaristaRank;
  spec: DrinkSpec;
  hasInteractiveWorkflow: boolean;
  thumbnailUrl: string | null;
}

export interface DrinkDetail extends Drink {
  longDescription: string;
  completedByUser: boolean;
  userAttemptCount: number;
}

export const DRINKS_V1 = [
  'espresso',
  'ristretto',
  'lungo',
  'americano',
  'flat-white',
  'cappuccino',
  'latte',
  'cortado',
  'macchiato',
  'piccolo-latte',
  'mocha',
  'cold-brew',
  'iced-latte',
  'affogato',
  'irish-coffee',
] as const;

export type DrinkSlug = (typeof DRINKS_V1)[number];

export const INTERACTIVE_WORKFLOW_DRINKS: DrinkSlug[] = [
  'espresso',
  'flat-white',
  'cappuccino',
  'latte',
  'cortado',
];
