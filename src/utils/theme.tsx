import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type FC,
  type ReactNode,
} from 'react';
import { useColorScheme } from 'react-native';
import {
  colorSystem,
  md3LightColors,
  md3DarkColors,
  type MD3ColorScheme,
} from './colorSystem';

export type ThemeMode = 'light' | 'dark' | 'auto';

export interface ThemeContextValue {
  mode: ThemeMode;
  isDark: boolean;
  colors: MD3ColorScheme;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  mode: 'light',
  isDark: false,
  colors: md3LightColors,
  setMode: () => {},
  toggleTheme: () => {},
});

/**
 * Update the global `colorSystem` object in-place so that existing styles
 * and components dynamically receive updated tokens for the active theme.
 */
export const setColorScheme = (mode: 'light' | 'dark' | MD3ColorScheme) => {
  const target: MD3ColorScheme =
    typeof mode === 'string'
      ? mode === 'dark'
        ? md3DarkColors
        : md3LightColors
      : mode;

  Object.assign(colorSystem, {
    primary: target.primary,
    onPrimary: target.onPrimary,
    primaryContainer: target.primaryContainer,
    onPrimaryContainer: target.onPrimaryContainer,
    inversePrimary: target.inversePrimary,
    secondary: target.secondary,
    onSecondary: target.onSecondary,
    secondaryContainer: target.secondaryContainer,
    onSecondaryContainer: target.onSecondaryContainer,
    tertiary: target.tertiary,
    onTertiary: target.onTertiary,
    tertiaryContainer: target.tertiaryContainer,
    onTertiaryContainer: target.onTertiaryContainer,
    background: target.background,
    onBackground: target.onBackground,
    surface: target.surface,
    onSurface: target.onSurface,
    surfaceVariant: target.surfaceVariant,
    onSurfaceVariant: target.onSurfaceVariant,
    surfaceDim: target.surfaceDim,
    surfaceBright: target.surfaceBright,
    surfaceContainerLowest: target.surfaceContainerLowest,
    surfaceContainerLow: target.surfaceContainerLow,
    surfaceContainer: target.surfaceContainer,
    surfaceContainerHigh: target.surfaceContainerHigh,
    surfaceContainerHighest: target.surfaceContainerHighest,
    outline: target.outline,
    outlineVariant: target.outlineVariant,
    error: target.error,
    onError: target.onError,
    errorContainer: target.errorContainer,
    onErrorContainer: target.onErrorContainer,
    inverseSurface: target.inverseSurface,
    inverseOnSurface: target.inverseOnSurface,
    scrim: target.scrim,
    shadow: target.shadow,
  });
};

export interface ThemeProviderProps {
  mode?: ThemeMode;
  customColors?: Partial<MD3ColorScheme>;
  children: ReactNode;
}

/**
 * Luma UI ThemeProvider for managing Light, Dark, and System modes.
 */
export const ThemeProvider: FC<ThemeProviderProps> = ({
  mode: modeProp,
  customColors,
  children,
}) => {
  const systemScheme = useColorScheme();
  const [uncontrolledMode, setUncontrolledMode] = useState<ThemeMode>('auto');

  // Support both controlled mode (from props) and uncontrolled mode (internal state)
  const mode = modeProp !== undefined ? modeProp : uncontrolledMode;

  const isDark = useMemo(() => {
    if (mode === 'auto') return systemScheme === 'dark';
    return mode === 'dark';
  }, [mode, systemScheme]);

  const colors = useMemo(() => {
    const base = isDark ? md3DarkColors : md3LightColors;
    if (!customColors) return base;
    return { ...base, ...customColors };
  }, [isDark, customColors]);

  // Synchronize global colorSystem synchronously for any legacy access
  setColorScheme(colors);

  const setMode = useCallback((newMode: ThemeMode) => {
    setUncontrolledMode(newMode);
  }, []);

  const toggleTheme = useCallback(() => {
    setUncontrolledMode((prev) => {
      const activeMode = modeProp !== undefined ? modeProp : prev;
      const currentDark =
        activeMode === 'auto' ? systemScheme === 'dark' : activeMode === 'dark';
      return currentDark ? 'light' : 'dark';
    });
  }, [modeProp, systemScheme]);

  const value = useMemo(
    () => ({
      mode,
      isDark,
      colors,
      setMode,
      toggleTheme,
    }),
    [mode, isDark, colors, setMode, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

/**
 * Hook to access the current Luma UI theme, colors, and theme switcher.
 */
export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  return context;
};
