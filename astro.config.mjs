import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://jahirxtrap.github.io',
  integrations: [
    sitemap(),
  ],
  server: {
    port: 4321,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
