// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://jobsiterank.com',
  build: {
    format: 'file',
  },
  vite: {
    plugins: [/** @type {any} */ (tailwindcss())],
    server: {
      allowedHosts: ['.trycloudflare.com'],
    },
  },
});
