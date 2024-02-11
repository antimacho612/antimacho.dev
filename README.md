# 🚀antimacho.dev

antimachoの技術メモ

## 使用ライブラリ等

- コア
  - [VitePress](https://vitepress.dev/)（静的サイトジェネレーター）
    - [VitePress Plugin Mermaid](https://emersonbottero.github.io/vitepress-plugin-mermaid/)（vitepressで[Marmaid](https://mermaid.js.org/)を使用するためのプラグイン）
  - [PrimeVue](https://primevue.org/)（Vue用コンポーネントライブラリ）
- その他
  - prettier + eslint（theme内のvue, tsのフォーマット・リント）
  - markdownlint（post内のmdのリント）
  - cspell（スペルチェック）
  - husky + lint-staged（コミット前のフォーマット・リント・スペルチェック）

## メモ

VitePressのデフォルトテーマをベースに、PrimeVueを組み合わせてカスタマイズ。
[.vitepressディレクトリ](https://github.com/antimacho612/antimacho.dev/tree/main/.vitepress)参照。
