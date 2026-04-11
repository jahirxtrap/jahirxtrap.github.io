import {darkTheme, type Theme, themes} from './themes';

const THEME_KEY = 'theme';

export function getTheme(): Theme {
  if (typeof window === 'undefined') return darkTheme;
  const saved = localStorage.getItem(THEME_KEY);
  if (saved && themes[saved]) return themes[saved];
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? themes.dark : themes.light;
}

export function setTheme(theme: Theme) {
  localStorage.setItem(THEME_KEY, theme.id);
  applyTheme(theme);
  window.dispatchEvent(new CustomEvent('themechange', {detail: theme.id}));
}

export function toggleTheme() {
  const current = getTheme();
  setTheme(current.id === 'dark' ? themes.light : themes.dark);
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle('dark', theme.mode === 'dark');
  root.style.colorScheme = theme.mode;

  const c = theme.colors;
  const set = (name: string, hex: string) => root.style.setProperty(`--app-color-${name}`, hex);

  set('primary', c.primary);
  set('primary-dark', c.primaryDark);
  set('secondary', c.secondary);
  set('accent', c.accent);
  set('danger', c.danger);
  set('background', c.background);
  set('surface', c.surface);
  set('surface-dark', c.surfaceDark);
  set('text-primary', c.textPrimary);
  set('text-secondary', c.textSecondary);
  set('text-inverse', c.textInverse);
  set('border', c.border);
  root.style.scrollbarColor = c.border + ' transparent';
}
