import type { BaristaRank } from '@tamp/types';
import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';
import { Colors, FontFamily, FontSize, Radius } from '../../constants/tokens';
import { Text } from './Text';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  uri?: string | null;
  displayName: string;
  size?: AvatarSize;
  rank?: BaristaRank;
}

const SIZE_MAP: Record<AvatarSize, number> = {
  xs: 28,
  sm: 36,
  md: 44,
  lg: 56,
  xl: 80,
};

const BADGE_SIZE_MAP: Record<AvatarSize, number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 26,
};

// Colour per rank — warm progression from milk to espresso
const RANK_COLORS: Record<BaristaRank, string> = {
  0: Colors.milk,
  1: '#D4A96A',
  2: Colors.crema,
  3: '#A0704A',
  4: '#6B3A20',
  5: Colors.espresso,
};

export function Avatar({ uri, displayName, size = 'md', rank }: AvatarProps) {
  const dimension = SIZE_MAP[size];
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <View style={{ width: dimension, height: dimension }}>
      {uri ? (
        <Image
          source={{ uri }}
          style={[
            styles.image,
            { width: dimension, height: dimension, borderRadius: dimension / 2 },
          ]}
          contentFit="cover"
          transition={200}
        />
      ) : (
        <View
          style={[
            styles.placeholder,
            { width: dimension, height: dimension, borderRadius: dimension / 2 },
          ]}
        >
          <Text
            style={{
              fontFamily: FontFamily.bodySemiBold,
              fontSize: dimension * 0.38,
              color: Colors.espresso,
            }}
          >
            {initial}
          </Text>
        </View>
      )}

      {rank !== undefined && (
        <View
          style={[
            styles.rankDot,
            {
              width: BADGE_SIZE_MAP[size],
              height: BADGE_SIZE_MAP[size],
              borderRadius: BADGE_SIZE_MAP[size] / 2,
              backgroundColor: RANK_COLORS[rank],
              bottom: -1,
              right: -1,
            },
          ]}
        >
          <Text
            style={{
              fontFamily: FontFamily.monoMedium,
              fontSize: BADGE_SIZE_MAP[size] * 0.6,
              color: rank >= 3 ? Colors.background : Colors.espresso,
            }}
          >
            {rank}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    backgroundColor: Colors.milk,
  },
  placeholder: {
    backgroundColor: Colors.milk,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankDot: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: Colors.background,
  },
});
