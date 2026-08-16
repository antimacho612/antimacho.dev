/**
 * MDX に自動で渡すコンポーネント。
 *
 * ここに書いたものは記事側で import せずにそのまま使える
 * （記事ページが <Content components={...} /> に渡している）。
 */

// デモ
export { default as Sandbox } from './Sandbox.astro';
export { default as Demo } from './Demo.astro';
export { default as Compare } from './Compare.astro';

// 記事内で使う小物
export { default as Callout } from './Callout.astro';
export { default as Badge } from './Badge.astro';
export { default as Key } from './Key.astro';
export { default as KeyCombination } from './KeyCombination.astro';
export { default as LinkCard } from './LinkCard.astro';
export { default as Mermaid } from './Mermaid.astro';
