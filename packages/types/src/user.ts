export type BaristaRank = 0 | 1 | 2 | 3 | 4 | 5;

export const RANK_TITLES: Record<BaristaRank, string> = {
  0: 'Home Brewer',
  1: 'Enthusiast',
  2: 'Amateur Barista',
  3: 'Barista',
  4: 'Head Barista',
  5: 'Champion',
};

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
  rank: BaristaRank;
  xp: number;
  isPublic: boolean;
  followerCount: number;
  followingCount: number;
  totalAttempts: number;
  createdAt: string;
}

export interface UserProfile extends User {
  isFollowing: boolean;
  isFollowedBy: boolean;
}

export interface CreateUserDto {
  username: string;
  displayName: string;
  email: string;
  password: string;
  initialRank?: BaristaRank;
}

export interface UpdateProfileDto {
  displayName?: string;
  isPublic?: boolean;
}
