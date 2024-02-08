import { defineConfigWithTheme } from 'vitepress';
import { withMermaid } from 'vitepress-plugin-mermaid';
import { resolve } from 'path';
import type { ThemeConfig } from './theme/types';

export default withMermaid(
  // https://vitepress.dev/reference/site-config
  defineConfigWithTheme<ThemeConfig>({
    title: 'antimacho.dev',
    description: 'antimachoの技術メモ',
    base: '/antimacho.dev/',
    head: [
      [
        'link',
        {
          rel: 'icon',
          href: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="85">🚀</text></svg>',
        },
      ],
      ['link', { id: 'theme-link', rel: 'stylesheet', href: '/antimacho.dev/themes/lara-light-purple/theme.css' }],
    ],
    lang: 'ja-JP',
    cleanUrls: true,
    lastUpdated: true,
    srcExclude: ['**/README.md', 'drafts/*.md'],
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
      editLink: {
        text: 'このページをGitHubで編集する',
        pattern: 'https://github.com/antimacho612/antimacho.dev/blob/main/:path?plain=1',
      },
      gitHubUrl: 'https://github.com/antimacho612/antimacho.dev/',
      categories: {
        JavaScript: {
          imageSrc: '/icons/javascript.svg',
        },
        Mermaid: {
          imageSrc: '/icons/mermaid.svg',
        },
        VSCode: {
          imageSrc: '/icons/vscode.svg',
        },
      },
      tableOfContent: {
        label: '目次',
        levelRange: [2, 5],
      },
    },
    markdown: {
      lineNumbers: true,
    },
    mermaid: {
      // refer https://mermaid.js.org/config/setup/modules/mermaidAPI.html#mermaidapi-configuration-defaults for options
    },
    mermaidPlugin: {},
  })
);
