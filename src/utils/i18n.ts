import en from '@/locales/en.json';
import es from '@/locales/es.json';

export type Lang = 'en' | 'es';

const locales: Record<Lang, Record<string, unknown>> = {en, es};

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  let current: unknown = obj;
  for (const key of path.split('.')) {
    if (current && typeof current === 'object' && key in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return path;
    }
  }
  return typeof current === 'string' ? current : path;
}

export function t(lang: Lang, key: string, vars?: Record<string, string>): string {
  let value = getNestedValue(locales[lang] as Record<string, unknown>, key);
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      value = value.replace(`{${k}}`, v);
    }
  }
  return value;
}

export function getLang(): Lang {
  if (typeof window === 'undefined') return 'en';
  return (localStorage.getItem('lang') as Lang) || 'en';
}

export function setLang(lang: Lang) {
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;
  applyTranslations(lang);
  window.dispatchEvent(new CustomEvent('langchange', {detail: lang}));
}

export function applyTranslations(lang?: Lang) {
  const currentLang = lang || getLang();
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (key) el.textContent = t(currentLang, key);
  });
}

export function onLangChange(callback: (lang: Lang) => void) {
  callback(getLang());
  window.addEventListener('langchange', (e: Event) => {
    callback((e as CustomEvent).detail as Lang);
  });
}
