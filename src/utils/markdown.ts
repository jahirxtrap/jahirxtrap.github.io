import {marked} from 'marked';
import DOMPurify from 'dompurify';
import {createIcon} from './icons';

export async function renderMarkdown(md: string): Promise<string> {
  const html = await marked.parse(md);
  return DOMPurify.sanitize(html);
}

export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html);
}

export function addCopyButtons(container: Element): void {
  container.querySelectorAll('pre').forEach(pre => {
    const btn = document.createElement('button');
    btn.style.cssText = 'position:absolute;top:8px;right:8px;padding:4px;border-radius:4px;cursor:pointer;opacity:0;transition:opacity 0.2s;background:transparent;border:none;color:var(--app-color-text-secondary)';

    const copyIcon = createIcon('Copy', 'w-4 h-4');
    const checkIcon = createIcon('Check', 'w-4 h-4');
    checkIcon.style.display = 'none';
    btn.appendChild(copyIcon);
    btn.appendChild(checkIcon);

    pre.addEventListener('mouseenter', () => btn.style.opacity = '1');
    pre.addEventListener('mouseleave', () => btn.style.opacity = '0');

    btn.addEventListener('click', async () => {
      const code = pre.querySelector('code')?.textContent || pre.textContent || '';
      await navigator.clipboard.writeText(code);
      copyIcon.style.display = 'none';
      checkIcon.style.display = '';
      setTimeout(() => {
        copyIcon.style.display = '';
        checkIcon.style.display = 'none';
      }, 1000);
    });

    pre.style.position = 'relative';
    pre.appendChild(btn);
  });
}

export const markdownStyles = [
  'text-sm text-app-text-primary',
  '[&>:first-child]:mt-0',
  '[&_h1]:text-xl [&_h1]:font-bold [&_h1]:mt-6 [&_h1]:mb-3',
  '[&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mt-5 [&_h2]:mb-2',
  '[&_h3]:text-base [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-1',
  '[&_h4]:text-sm [&_h4]:font-semibold [&_h4]:mt-3 [&_h4]:mb-1',
  '[&_p]:my-2',
  '[&_code]:bg-app-surface-dark [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_code]:text-app-text-primary',
  '[&_pre]:rounded-lg [&_pre]:p-3 [&_pre]:overflow-x-auto [&_pre]:text-xs [&_pre]:my-2 [&_pre]:bg-app-surface-dark',
  '[&_pre_code]:bg-transparent [&_pre_code]:p-0',
  '[&_a]:text-app-accent [&_a:hover]:underline',
  '[&_table]:w-full [&_table]:border-collapse [&_table]:text-xs [&_table]:my-2',
  '[&_th]:px-2 [&_th]:py-1 [&_th]:border [&_th]:border-app-border [&_th]:text-left [&_th]:bg-app-surface-dark',
  '[&_td]:px-2 [&_td]:py-1 [&_td]:border [&_td]:border-app-border',
  '[&_li]:ml-4 [&_ul]:list-disc [&_ol]:list-decimal',
  '[&_hr]:border-app-border [&_hr]:my-4',
  '[&_blockquote]:border-l-2 [&_blockquote]:border-app-border [&_blockquote]:pl-4 [&_blockquote]:text-app-text-secondary',
  '[&_img]:inline-block [&_img]:align-middle',
].join(' ');
