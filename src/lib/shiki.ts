/**
 * コードハイライトのテーマ。
 * astro.config.mjs の markdown.shikiConfig.themes と揃えること
 * （記事本文のコードブロックとデモのコード表示で見た目を合わせるため）。
 */
export const SHIKI_THEMES = { light: 'github-light', dark: 'github-dark' } as const;
