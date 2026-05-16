import { type BaristaRank, RANK_TITLES } from '@tamp/types';
import { StyleSheet, View } from 'react-native';
import { Colors, FontFamily, FontSize, Radius, Spacing } from '../../constants/tokens';
import { Text } from './Text';

// ─── Difficulty badge ─────────────────────────────────────────────────────────

interface DifficultyBadgeProps {
  rank: BaristaRank;
}

const DIFFICULTY_CONFIG: Record<BaristaRank, { label: string; bg: string; text: string }> = {
  0: { label: 'Beginner', bg: Colors.milk, text: Colors.textSecondary },
  1: { label: 'Easy', bg: '#E8D5B0', text: Colors.textPrimary },
  2: { label: 'Moderate', bg: '#D4A96A', text: Colors.espresso },
  3: { label: 'Advanced', bg: Colors.crema, text: Colors.espresso },
  4: { label: 'Expert', bg: '#A0704A', text: Colors.background },
  5: { label: 'Master', bg: Colors.espresso, text: Colors.background },
};

export function DifficultyBadge({ rank }: DifficultyBadgeProps) {
  const config = DIFFICULTY_CONFIG[rank];
  return (
    <View style={[styles.badge, { backgroundColor: config.bg }]}>
      <Text style={[styles.badgeText, { color: config.text }]}>{config.label}</Text>
    </View>
  );
}

// ─── Rank badge ───────────────────────────────────────────────────────────────

interface RankBadgeProps {
  rank: BaristaRank;
  showTitle?: boolean;
}

export function RankBadge({ rank, showTitle = true }: RankBadgeProps) {
  const config = DIFFICULTY_CONFIG[rank];
  return (
    <View style={[styles.rankBadge, { backgroundColor: config.bg }]}>
      <Text style={[styles.rankNumber, { color: config.text }]}>{rank}</Text>
      {showTitle && (
        <Text style={[styles.rankTitle, { color: config.text }]}>{RANK_TITLES[rank]}</Text>
      )}
    </View>
  );
}

// ─── XP progress bar ─────────────────────────────────────────────────────────

interface XpBarProps {
  xp: number;
  rank: BaristaRank;
}

import { XP_PER_RANK } from '@tamp/types';

export function XpBar({ xp, rank }: XpBarProps) {
  const currentFloor = XP_PER_RANK[rank] ?? 0;
  const nextCeiling = XP_PER_RANK[rank + 1];
  const progress = nextCeiling
    ? Math.min((xp - currentFloor) / (nextCeiling - currentFloor), 1)
    : 1;

  return (
    <View style={styles.xpTrack}>
      <View style={[styles.xpFill, { width: `${progress * 100}%` }]} />
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: Radius.full,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.xs,
    letterSpacing: 0.3,
  },
  rankBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.sm,
    gap: Spacing.xs,
    alignSelf: 'flex-start',
  },
  rankNumber: {
    fontFamily: FontFamily.monoMedium,
    fontSize: FontSize.sm,
  },
  rankTitle: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.sm,
  },
  xpTrack: {
    height: 4,
    backgroundColor: Colors.milk,
    borderRadius: Radius.full,
    overflow: 'hidden',
  },
  xpFill: {
    height: '100%',
    backgroundColor: Colors.crema,
    borderRadius: Radius.full,
  },
});
