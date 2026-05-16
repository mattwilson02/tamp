import { Pressable, type PressableProps, StyleSheet, View, type ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Colors, Radius, Shadow, Spacing } from '../../constants/tokens';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: PressableProps['onPress'];
  elevated?: boolean;
}

export function Card({ children, style, onPress, elevated = false }: CardProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPressIn = () => {
    scale.value = withSpring(0.985, { mass: 0.3, damping: 20, stiffness: 300 });
  };
  const onPressOut = () => {
    scale.value = withSpring(1, { mass: 0.3, damping: 12, stiffness: 200 });
  };

  if (onPress) {
    return (
      <Animated.View style={[animatedStyle, style]}>
        <Pressable
          style={[styles.card, elevated && styles.elevated]}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          onPress={onPress}
        >
          {children}
        </Pressable>
      </Animated.View>
    );
  }

  return <View style={[styles.card, elevated && styles.elevated, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    ...Shadow.sm,
  },
  elevated: {
    ...Shadow.md,
  },
});
