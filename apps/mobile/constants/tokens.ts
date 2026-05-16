export const Colors = {
  background: '#FAF6F0',
  surface: '#F0E8DC',
  espresso: '#3B1F0E',
  crema: '#C8956C',
  milk: '#EDE0C8',
  textPrimary: '#1C1009',
  textSecondary: '#7A5C44',

  white: '#FFFFFF',
  black: '#000000',

  success: '#4A7C59',
  error: '#B84C4C',
  warning: '#C4832A',
} as const;

export const FontFamily = {
  display: 'PlayfairDisplay_700Bold',
  displayItalic: 'PlayfairDisplay_700Bold_Italic',
  body: 'DMSans_400Regular',
  bodySemiBold: 'DMSans_600SemiBold',
  bodyBold: 'DMSans_700Bold',
  mono: 'DMMono_400Regular',
  monoMedium: 'DMMono_500Medium',
} as const;

export const FontSize = {
  xs: 11,
  sm: 13,
  base: 15,
  md: 17,
  lg: 20,
  xl: 24,
  '2xl': 30,
  '3xl': 36,
  '4xl': 48,
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
  '4xl': 64,
} as const;

export const Radius = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const Shadow = {
  sm: {
    shadowColor: Colors.espresso,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: Colors.espresso,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: Colors.espresso,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;
