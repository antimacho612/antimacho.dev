/**
 * MDX に自動で渡すコンポーネント。
 *
 * ここに書いたものは記事側で import せずにそのまま使える
 * （記事ページが <Content components={...} /> に渡している）。
 */
export { default as Sandbox } from './Sandbox.astro';
export { default as Demo } from './Demo.astro';
export { default as Compare } from './Compare.astro';
