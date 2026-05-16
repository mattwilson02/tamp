import { Text as RNText, type TextProps as RNTextProps, StyleSheet } from 'react-native';
import { Colors, FontFamily, FontSize } from '../../constants/tokens';

type TextVariant =
  | 'display' // Playfair Bold — screen titles, wordmark
  | 'heading' // Playfair Bold — section headings
  | 'title' // DM Sans SemiBold — card titles, list items
  | 'body' // DM Sans Regular — body copy
  | 'bodySemiBold' // DM Sans SemiBold — labels, emphasis
  | 'caption' // DM Sans Regular — timestamps, secondary info
  | 'mono' // DM Mono Regular — specs, numbers
  | 'monoSmall'; // DM Mono Regular — small spec values

type TextColor = 'primary' | 'secondary' | 'crema' | 'white' | 'espresso';

interface TextProps extends RNTextProps {
  variant?: TextVariant;
  color?: TextColor;
}

export function Text({ variant = 'body', color = 'primary', style, ...props }: TextProps) {
  return (
    <RNText style={[styles.base, variantStyles[variant], colorStyles[color], style]} {...props} />
  );
}

const styles = StyleSheet.create({
  base: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.base,
    color: Colors.textPrimary,
  },
});

const variantStyles = StyleSheet.create({
  display: {
    fontFamily: FontFamily.display,
    fontSize: FontSize['3xl'],
    lineHeight: FontSize['3xl'] * 1.2,
  },
  heading: {
    fontFamily: FontFamily.display,
    fontSize: FontSize['2xl'],
    lineHeight: FontSize['2xl'] * 1.25,
  },
  title: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.md,
    lineHeight: FontSize.md * 1.3,
  },
  body: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.base,
    lineHeight: FontSize.base * 1.5,
  },
  bodySemiBold: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.base,
    lineHeight: FontSize.base * 1.5,
  },
  caption: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.sm,
    lineHeight: FontSize.sm * 1.4,
  },
  mono: {
    fontFamily: FontFamily.mono,
    fontSize: FontSize.base,
    lineHeight: FontSize.base * 1.4,
  },
  monoSmall: {
    fontFamily: FontFamily.monoMedium,
    fontSize: FontSize.xs,
    lineHeight: FontSize.xs * 1.4,
    letterSpacing: 0.5,
  },
});

const colorStyles = StyleSheet.create({
  primary: { color: Colors.textPrimary },
  secondary: { color: Colors.textSecondary },
  crema: { color: Colors.crema },
  white: { color: Colors.white },
  espresso: { color: Colors.espresso },
});
