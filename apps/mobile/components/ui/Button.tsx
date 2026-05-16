import { ActivityIndicator, Pressable, type PressableProps, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Colors, FontFamily, FontSize, Radius, Spacing } from '../../constants/tokens';
import { Text } from './Text';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<PressableProps, 'style'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  label: string;
  loading?: boolean;
  icon?: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  label,
  loading = false,
  icon,
  disabled,
  onPress,
  ...props
}: ButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPressIn = () => {
    scale.value = withSpring(0.97, { mass: 0.3, damping: 20, stiffness: 300 });
  };
  const onPressOut = () => {
    scale.value = withSpring(1, { mass: 0.3, damping: 12, stiffness: 200 });
  };

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        style={[
          containerStyles[variant],
          sizeStyles[size],
          (disabled || loading) && styles.disabled,
        ]}
        disabled={disabled || loading}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={onPress}
        {...props}
      >
        {loading ? (
          <ActivityIndicator
            size="small"
            color={variant === 'primary' ? Colors.background : Colors.crema}
          />
        ) : (
          <View style={styles.inner}>
            {icon && <View style={styles.icon}>{icon}</View>}
            <Text style={[labelStyles[variant], labelSizeStyles[size]]}>{label}</Text>
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  disabled: { opacity: 0.45 },
  inner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  icon: { marginRight: Spacing.sm },
});

const containerStyles = StyleSheet.create({
  primary: {
    backgroundColor: Colors.espresso,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondary: {
    backgroundColor: 'transparent',
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: Colors.espresso,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ghost: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const sizeStyles = StyleSheet.create({
  sm: { paddingVertical: Spacing.xs, paddingHorizontal: Spacing.md, minHeight: 36 },
  md: { paddingVertical: Spacing.sm + 2, paddingHorizontal: Spacing.xl, minHeight: 48 },
  lg: { paddingVertical: Spacing.md, paddingHorizontal: Spacing['2xl'], minHeight: 56 },
});

const labelStyles = StyleSheet.create({
  primary: { color: Colors.background, fontFamily: FontFamily.bodySemiBold },
  secondary: { color: Colors.espresso, fontFamily: FontFamily.bodySemiBold },
  ghost: { color: Colors.crema, fontFamily: FontFamily.bodySemiBold },
});

const labelSizeStyles = StyleSheet.create({
  sm: { fontSize: FontSize.sm },
  md: { fontSize: FontSize.base },
  lg: { fontSize: FontSize.md },
});
