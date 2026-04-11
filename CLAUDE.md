# jahirxtrap.github.io

Personal portfolio and Minecraft mods showcase for **jahirtrap**.

## Technology Stack

- **Astro 6** — Static site framework
- **React 19** — Interactive components (islands)
- **Tailwind CSS 4** — Styling via `app-*` custom classes
- **Lucide Icons** — `lucide-astro` for Astro templates, `lucide` for client-side JS via `createIcon()` in `src/utils/icons.ts`
- **TypeScript** — Strict mode

## Development Commands

```bash
npm run dev        # Dev server
npm run build      # Production build
npm run preview    # Preview production build
```

## Project Structure

```
src/
├── components/         # Astro & React components
├── layouts/            # Base layout (Navbar, Footer)
├── locales/            # i18n translations (en.json, es.json)
├── pages/              # File-based routing
│   ├── index.astro              # Home — profile, projects
│   ├── minecraft-mods/
│   │   ├── index.astro          # Mods grid
│   │   └── [slug].astro         # Mod detail (dynamic)
│   └── meowzik/
│       └── privacy.astro        # Meowzik privacy policy
├── styles/
│   └── global.css               # Theme variables + Tailwind
└── utils/
    ├── api.ts                   # GitHub, Modrinth, CurseForge API
    ├── i18n.ts                  # Language helpers
    └── theme.ts                 # Theme helpers
```

## NO HARDCODED COLORS (Theme System)

All colors MUST come from `app-*` Tailwind classes:

```html
<!-- WRONG -->
<div class="bg-white text-gray-700">

<!-- CORRECT -->
<div class="bg-app-surface text-app-text-primary">
```

### Available Colors

| Class | Usage |
|-------|-------|
| `bg-app-background` | Page background |
| `bg-app-surface` | Cards, panels |
| `bg-app-surface-dark` | Hover states, borders, badges |
| `bg-app-primary` | Primary elements |
| `text-app-text-primary` | Main text |
| `text-app-text-secondary` | Muted text |
| `text-app-text-inverse` | Text on dark backgrounds |
| `text-app-accent` | Links, highlights |
| `border-app-border` | Borders, dividers |
| `text-app-danger` | Error text |

Themes (light/dark) are defined in `src/styles/global.css` as CSS custom properties. Toggle via `dark` class on `<html>`.

## NO HARDCODED TEXTS (i18n)

All user-facing text MUST be translatable. Two languages: **English** (default) and **Spanish**.

- Locale files: `src/locales/en.json`, `src/locales/es.json`
- Use `data-i18n` attribute on Astro elements for static text
- Use `t(lang, 'key')` in scripts for dynamic text
- Language stored in `localStorage` as `lang`

## APIs (Client-Side Fetch)

| API | Auth | Usage |
|-----|------|-------|
| GitHub | None (public) | Profile avatar, name, bio |
| Modrinth | None (public) | Mods list, downloads, versions, descriptions |
| CurseForge | API key (read-only) | Download counts |

CurseForge API key is passed via `PUBLIC_CURSEFORGE_API_KEY` environment variable (GitHub vars for CI, `.env` for local dev).

## Deployment

GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`). Triggered on push to `master`.

### Environment Variables (GitHub → Settings → Variables)

| Variable | Value |
|----------|-------|
| `PUBLIC_CURSEFORGE_API_KEY` | CurseForge API key (read-only) |

## Icons

Two ways to use Lucide icons depending on context:

**In Astro templates** (build time):
```astro
---
import { Sun } from 'lucide-astro';
---
<Sun class="w-5 h-5" />
```

**In client-side JS** (runtime) via `src/utils/icons.ts`:
```ts
import { createIcon } from '@/utils/icons';
const icon = createIcon('download', 'w-3 h-3');
element.appendChild(icon);
```

- Use `class` for sizing (Tailwind), not `size` prop
- Never use inline SVGs, emoji, or hardcoded SVG paths
- For dynamic badges, use `createBadge()` from `src/utils/badge.ts` which supports icons

## Badge Component

Two versions of the same component for different contexts:

- **`Badge.astro`** — For Astro templates (build time). Static badges that don't depend on API data. Supports `text`, `href`, `accent`, `i18n` props and a slot for icons.
- **`createBadge()`** in `src/utils/badge.ts` — For client-side JS (runtime). Dynamic badges created after API responses. Supports `text`, `href`, `accent`, `icon` options.

Both produce identical HTML with the same CSS classes. Use `Badge.astro` when possible, `createBadge()` only when data comes from APIs at runtime.

## Key Rules

1. **No hardcoded colors** — Use `app-*` Tailwind classes, colors defined only in `themes.ts`
2. **No hardcoded texts** — Use locale files (`en.json`, `es.json`)
3. **No inline SVGs or emojis** — Use `lucide-astro` in templates, `createIcon()` in JS
4. **Prefer Tailwind over inline styles**
5. **Client-side fetch** — All API data loaded in browser for real-time values
6. **Dark theme default** — Follows system preference, user can toggle
7. **English default** — User can switch to Spanish
8. **No flash on load** — Theme colors and language applied via inline blocking scripts in layout, data sourced from `themes.ts` and locale JSONs at build time via `define:vars`
9. **No fallback texts in HTML** — Elements with `data-i18n` must have empty content. The inline i18n script fills them before paint. Never put hardcoded text as fallback.
