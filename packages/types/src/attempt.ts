export interface Attempt {
  id: string;
  userId: string;
  drinkId: string;
  drinkName: string;
  drinkSlug: string;
  photoUrls: string[];
  notes: string | null;
  grindSetting: string | null;
  doseGrams: number | null;
  yieldGrams: number | null;
  isPublic: boolean;
  communityScore: number | null;
  likeCount: number;
  commentCount: number;
  createdAt: string;
}

export interface CreateAttemptDto {
  drinkId: string;
  photoUrls: string[];
  notes?: string;
  grindSetting?: string;
  doseGrams?: number;
  yieldGrams?: number;
  isPublic?: boolean;
}

export interface AttemptDetail extends Attempt {
  user: {
    id: string;
    username: string;
    displayName: string;
    avatarUrl: string | null;
    rank: number;
  };
  scoreBreakdown: ScoreBreakdown[] | null;
  isLikedByUser: boolean;
  isScoredByUser: boolean;
}

export interface ScoreBreakdown {
  criterionKey: string;
  criterionLabel: string;
  averageScore: number;
  voteCount: number;
}

export interface Comment {
  id: string;
  attemptId: string;
  userId: string;
  userDisplayName: string;
  userAvatarUrl: string | null;
  body: string;
  createdAt: string;
}
