import { defineConfigWithTheme } from 'vitepress';
import { resolve } from 'path';
import type { ThemeConfig } from './theme/types';

// https://vitepress.dev/reference/site-config
export default defineConfigWithTheme<ThemeConfig>({
  title: 'My Cheat Sheets',
  description: 'My cheat sheets.',
  head: [['link', { id: 'theme-link', rel: 'stylesheet', href: '/themes/lara-light-purple/theme.css' }]],
  cleanUrls: true,
  lastUpdated: true,
  markdown: {
    lineNumbers: true,
  },
  vite: {
    ssr: {
      noExternal: ['primevue'],
    },
    resolve: {
      alias: {
        '@': resolve('/.vitepress'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: "@use '@theme/styles/_mixins.scss' as *;",
        },
      },
    },
  },
  themeConfig: {
    gitHubUrl: 'https://github.com/',
    editLink: {
      text: 'このページをGitHubで編集する',
      pattern: 'https://github.com/',
    },
  },
});
