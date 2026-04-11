export interface ThemeColors {
  primary: string;
  primaryDark: string;
  secondary: string;
  accent: string;
  danger: string;
  background: string;
  surface: string;
  surfaceDark: string;
  textPrimary: string;
  textSecondary: string;
  textInverse: string;
  border: string;
}

export type ThemeMode = 'light' | 'dark';

export interface Theme {
  id: string;
  name: string;
  mode: ThemeMode;
  colors: ThemeColors;
}

export const lightTheme: Theme = {
  id: 'light',
  name: 'Light',
  mode: 'light',
  colors: {
    primary: '#0A0A0A',
    primaryDark: '#000000',
    secondary: '#525252',
    accent: '#2563EB',
    danger: '#DC2626',
    background: '#FAFAFA',
    surface: '#FFFFFF',
    surfaceDark: '#F0F0F0',
    textPrimary: '#0A0A0A',
    textSecondary: '#737373',
    textInverse: '#FAFAFA',
    border: '#D4D4D4',
  },
};

export const darkTheme: Theme = {
  id: 'dark',
  name: 'Dark',
  mode: 'dark',
  colors: {
    primary: '#FAFAFA',
    primaryDark: '#FFFFFF',
    secondary: '#A3A3A3',
    accent: '#3B82F6',
    danger: '#EF4444',
    background: '#000000',
    surface: '#0A0A0A',
    surfaceDark: '#171717',
    textPrimary: '#FAFAFA',
    textSecondary: '#A3A3A3',
    textInverse: '#0A0A0A',
    border: '#262626',
  },
};

export const themes: Record<string, Theme> = {
  light: lightTheme,
  dark: darkTheme,
};
