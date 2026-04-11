import {createElement, icons} from 'lucide';

export type IconName = keyof typeof icons;

export function createIcon(name: IconName, className: string = 'w-3 h-3'): SVGSVGElement {
  const el = createElement(icons[name]) as unknown as SVGSVGElement;
  el.setAttribute('class', className);
  return el;
}
