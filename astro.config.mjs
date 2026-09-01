// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import partytown from '@astrojs/partytown';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://s3q.io',
  trailingSlash: 'never',
  integrations: [mdx(), sitemap(), react(), partytown()],
  vite: {
    plugins: [tailwindcss()],
  },
});
