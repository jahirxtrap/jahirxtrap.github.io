import {createIcon, type IconName} from './icons';

const BASE = 'inline-flex items-center gap-1.5 px-2 py-1 text-xs rounded-lg transition-colors';
const ACCENT = 'bg-app-accent/15 text-app-accent font-medium';
const DEFAULT = 'bg-app-surface-dark text-app-text-secondary';
const HOVER = 'hover:text-app-text-primary';

export function createBadge(text: string, options?: { href?: string; accent?: boolean; icon?: IconName }): HTMLElement {
  const accent = options?.accent ?? false;
  const style = `${BASE} ${accent ? ACCENT : DEFAULT}`;

  const tag = options?.href ? 'a' : 'span';
  const el = document.createElement(tag);
  el.className = options?.href ? `${style} ${HOVER}` : style;

  if (options?.href) {
    (el as HTMLAnchorElement).href = options.href;
    (el as HTMLAnchorElement).target = '_blank';
    (el as HTMLAnchorElement).rel = 'noopener';
  }

  if (options?.icon) el.appendChild(createIcon(options.icon));

  el.appendChild(document.createTextNode(text));
  return el;
}
