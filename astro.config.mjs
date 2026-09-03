import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { rehypePaperLinks } from './src/lib/rehype-paper-links.mjs';

// Set this to e.g. 'readinglab.example.com' when you own a domain
// (and add public/CNAME with the same value). Everything else follows.
const CUSTOM_DOMAIN = '';

export default defineConfig({
  site: CUSTOM_DOMAIN ? `https://${CUSTOM_DOMAIN}` : 'https://nurdauletakhanov.github.io',
  base: CUSTOM_DOMAIN ? '/' : '/ReadingLab',
  integrations: [sitemap()],
  markdown: {
    rehypePlugins: [rehypePaperLinks],
  },
});
