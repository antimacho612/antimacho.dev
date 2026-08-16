# 🚀 antimacho.dev

antimacho の技術メモ。HTML / CSS / JavaScript の挙動や見た目を、**記事の中で実際に動かして
確かめられる**ことを主眼にしている。

## 開発

```bash
npm install
npm run dev     # http://localhost:4321/antimacho.dev/
npm run check   # 型と frontmatter の検証
npm run build
```

## 構成

| | |
| --- | --- |
| [Astro](https://astro.build/) | 静的サイトジェネレーター。記事は MDX |
| [React](https://react.dev/) | 対話 UI が必要なデモ用のアイランド（現状は未使用） |
| [Shiki](https://shiki.style/) | コードハイライト（ビルド時） |
| [Mermaid](https://mermaid.js.org/) | 図（クライアント側で描画） |
| textlint + prh / markdownlint | 記事のリント |
| prettier | フォーマット |
| husky + lint-staged | コミット前のフォーマット・リント |

```txt
src/
  content/posts/<カテゴリ>/<スラッグ>.mdx   記事
  demos/<id>/                              記事に埋め込むデモ（HTML/CSS/JS）
  components/mdx/                          記事から import なしで使えるコンポーネント
  components/layout/ · post/               サイトの UI
  layouts/ · pages/ · styles/ · lib/
```

記事もデモも**ファイルを 1 つ置くだけ**で反映される。index への登録は不要。

- 記事の書き方 → [src/content/README.md](src/content/README.md)
- デモの書き方 → [src/demos/README.md](src/demos/README.md)
- 使えるコンポーネントの実物 → `/posts/general/mdx-components`

## デプロイ

`main` への push で GitHub Actions が GitHub Pages に公開する
（[.github/workflows/deploy.yml](.github/workflows/deploy.yml)）。
