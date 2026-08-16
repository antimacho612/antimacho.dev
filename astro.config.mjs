// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://antimacho612.github.io',
  base: '/antimacho.dev/',
  integrations: [mdx(), react(), sitemap()],
  // Astro v7 の既定は 'jsx'（要素間の改行を JSX ルールで詰める）。
  // 散文主体のサイトでは意図しない空白落ちを招くため、従来の HTML ルールに戻す。
  compressHTML: true,
  markdown: {
    // Markdown プロセッサは v7 既定の Sätteri をそのまま使う。
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      wrap: false,
    },
  },
});
