import type { AttemptDetail } from './attempt';

export interface FeedItem {
  type: 'attempt';
  attempt: AttemptDetail;
}

export interface FeedPage {
  items: FeedItem[];
  nextCursor: string | null;
  hasMore: boolean;
}

export interface FeedParams {
  cursor?: string;
  limit?: number;
}

export interface XpEvent {
  type: 'module_complete' | 'attempt_logged' | 'received_score' | 'scored_attempt' | 'daily_streak';
  xpAwarded: number;
  totalXp: number;
  rankBefore: number;
  rankAfter: number;
  rankedUp: boolean;
}

export const XP_VALUES = {
  module_complete: 50,
  attempt_logged: 20,
  received_score: 10,
  scored_attempt: 5,
  daily_streak: 15,
} as const;

export const XP_PER_RANK: Record<number, number> = {
  0: 0,
  1: 200,
  2: 600,
  3: 1400,
  4: 3000,
  5: 6000,
};
