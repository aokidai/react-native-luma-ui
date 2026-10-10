/**
 * Luma UI Color System for React Native Luma UI.
 */

export interface MD3ColorScheme {
  // Primary
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  inversePrimary: string;

  // Secondary
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;

  // Tertiary
  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;

  // Error
  error: string;
  onError: string;
  errorContainer: string;
  onErrorContainer: string;

  // Background & Surface
  background: string;
  onBackground: string;
  surface: string;
  onSurface: string;
  surfaceVariant: string;
  onSurfaceVariant: string;

  // Surface Elevation Containers
  surfaceDim: string;
  surfaceBright: string;
  surfaceContainerLowest: string;
  surfaceContainerLow: string;
  surfaceContainer: string;
  surfaceContainerHigh: string;
  surfaceContainerHighest: string;

  // Outline
  outline: string;
  outlineVariant: string;

  // Inverse
  inverseSurface: string;
  inverseOnSurface: string;

  // Scrim & Shadow
  scrim: string;
  shadow: string;
}

/**
 * Luma UI Light Color Scheme
 */
export const md3LightColors: MD3ColorScheme = {
  // Primary
  primary: '#6750A4',
  onPrimary: '#FFFFFF',
  primaryContainer: '#EADDFF',
  onPrimaryContainer: '#21005D',
  inversePrimary: '#D0BCFF',

  // Secondary
  secondary: '#625B71',
  onSecondary: '#FFFFFF',
  secondaryContainer: '#E8DEF8',
  onSecondaryContainer: '#1D192B',

  // Tertiary
  tertiary: '#7D5260',
  onTertiary: '#FFFFFF',
  tertiaryContainer: '#FFD8E4',
  onTertiaryContainer: '#31111D',

  // Error
  error: '#B3261E',
  onError: '#FFFFFF',
  errorContainer: '#F9DEDC',
  onErrorContainer: '#410E0B',

  // Background & Surface
  background: '#FEF7FF',
  onBackground: '#1D1B20',
  surface: '#FEF7FF',
  onSurface: '#1D1B20',
  surfaceVariant: '#E7E0EC',
  onSurfaceVariant: '#49454F',

  // Surface Container Levels
  surfaceDim: '#DED8E1',
  surfaceBright: '#FEF7FF',
  surfaceContainerLowest: '#FFFFFF',
  surfaceContainerLow: '#F7F2FA',
  surfaceContainer: '#F3EDF7',
  surfaceContainerHigh: '#ECE6F0',
  surfaceContainerHighest: '#E6E0E9',

  // Outline
  outline: '#79747E',
  outlineVariant: '#CAC4D0',

  // Inverse
  inverseSurface: '#322F35',
  inverseOnSurface: '#F5EFF7',

  // Scrim & Shadow
  scrim: '#000000',
  shadow: '#000000',
};

/**
 * Luma UI Dark Color Scheme
 */
export const md3DarkColors: MD3ColorScheme = {
  // Primary
  primary: '#D0BCFF',
  onPrimary: '#381E72',
  primaryContainer: '#4F378B',
  onPrimaryContainer: '#EADDFF',
  inversePrimary: '#6750A4',

  // Secondary
  secondary: '#CCC2DC',
  onSecondary: '#332D41',
  secondaryContainer: '#4A4458',
  onSecondaryContainer: '#E8DEF8',

  // Tertiary
  tertiary: '#EFB8C8',
  onTertiary: '#492532',
  tertiaryContainer: '#633B48',
  onTertiaryContainer: '#FFD8E4',

  // Error
  error: '#F2B8B5',
  onError: '#601410',
  errorContainer: '#8C1D18',
  onErrorContainer: '#F9DEDC',

  // Background & Surface
  background: '#141218',
  onBackground: '#E6E0E9',
  surface: '#141218',
  onSurface: '#E6E0E9',
  surfaceVariant: '#49454F',
  onSurfaceVariant: '#CAC4D0',

  // Surface Container Levels
  surfaceDim: '#141218',
  surfaceBright: '#3B383E',
  surfaceContainerLowest: '#0F0D13',
  surfaceContainerLow: '#1D1B20',
  surfaceContainer: '#211F26',
  surfaceContainerHigh: '#2B2930',
  surfaceContainerHighest: '#36343B',

  // Outline
  outline: '#938F99',
  outlineVariant: '#49454F',

  // Inverse
  inverseSurface: '#E6E0E9',
  inverseOnSurface: '#322F35',

  // Scrim & Shadow
  scrim: '#000000',
  shadow: '#000000',
};

/**
 * Luma UI Tonal Palettes (0-100)
 */
export const md3TonalPalettes = {
  primary: {
    0: '#000000',
    10: '#21005D',
    20: '#381E72',
    30: '#4F378B',
    40: '#6750A4',
    50: '#7F67BE',
    60: '#9A82DB',
    70: '#B69DF8',
    80: '#D0BCFF',
    90: '#EADDFF',
    95: '#F6EEFF',
    100: '#FFFFFF',
  },
  secondary: {
    0: '#000000',
    10: '#1D192B',
    20: '#332D41',
    30: '#4A4458',
    40: '#625B71',
    50: '#7A7289',
    60: '#958DA5',
    70: '#B0A7C0',
    80: '#CCC2DC',
    90: '#E8DEF8',
    95: '#F6EEFF',
    100: '#FFFFFF',
  },
  tertiary: {
    0: '#000000',
    10: '#31111D',
    20: '#492532',
    30: '#633B48',
    40: '#7D5260',
    50: '#986977',
    60: '#B58392',
    70: '#D29DAC',
    80: '#EFB8C8',
    90: '#FFD8E4',
    95: '#FFECF1',
    100: '#FFFFFF',
  },
  neutral: {
    0: '#000000',
    10: '#1D1B20',
    20: '#322F35',
    30: '#48464C',
    40: '#605D64',
    50: '#79767D',
    60: '#938F96',
    70: '#AEA9B1',
    80: '#C9C5CD',
    90: '#E6E0E9',
    95: '#F5EFF7',
    100: '#FFFFFF',
  },
};

/**
 * Global color system combining Luma UI defaults with Luma UI Design tokens
 */
export const colorSystem = {
  // Luma Primary & Variants
  primary: '#6200EE',
  primaryVariant: '#3700B3',
  primaryContainer: '#EADDFF',
  onPrimaryContainer: '#21005D',
  inversePrimary: '#D0BCFF',

  // Secondary
  secondary: '#03DAC6',
  secondaryVariant: '#018786',
  secondaryContainer: '#E8DEF8',
  onSecondaryContainer: '#1D192B',

  // Tertiary
  tertiary: '#7D5260',
  onTertiary: '#FFFFFF',
  tertiaryContainer: '#FFD8E4',
  onTertiaryContainer: '#31111D',

  // Base Surfaces
  background: '#FFFFFF',
  surface: '#E6E1E5',
  surfaceVariant: '#CAC4D0',
  surfaceDim: '#DED8E1',
  surfaceBright: '#FEF7FF',
  surfaceContainer: '#F3EDF7',
  surfaceContainerLow: '#F7F2FA',
  surfaceContainerHigh: '#ECE6F0',
  surfaceContainerHighest: '#E6E0E9',

  // Outline
  outline: '#79747E',
  outlineVariant: '#CAC4D0',

  // Error
  error: '#B00020',
  errorContainer: '#F9DEDC',
  onErrorContainer: '#410E0B',

  // Contrasting on-colors
  onSurface: '#1C1B1F',
  onSurfaceVariant: '#2B2930',
  onPrimary: '#FFFFFF',
  onSecondary: '#000000',
  onBackground: '#1C1B1F',
  onError: '#FFFFFF',

  // Inverse
  inverseSurface: '#322F35',
  inverseOnSurface: '#F5EFF7',

  // Standard Gray / Neutral Steps
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#CAC4D0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
};

export default colorSystem;
