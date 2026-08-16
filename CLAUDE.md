# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

antimacho の個人技術メモサイト。HTML / CSS / JavaScript の挙動や見た目を、**記事の中で実際に
動かして確かめられる**ことが主眼。Astro 7 + MDX の静的サイトで、GitHub Pages に
`/antimacho.dev/` 配下として公開される。UI 文言・コメント・記事はすべて日本語。

## Astro / TypeScript のバージョンに注意

**Astro 7 は学習データより新しい。推測で書かず、必要なら実 API とドキュメントを確認すること。**
特に効いてくる差分:

- Markdown プロセッサの既定が **Sätteri（Rust）** に変わり、**remark / rehype プラグインが使えない**。
  見出しアンカーの挿入も Mermaid の描画も、プラグインではなくクライアント側の script で実装してある
- `compressHTML` の既定が `'jsx'`。散文で意図しない空白落ちが起きるため `true`（従来の HTML ルール）に戻している
- `.astro` コンパイラが Rust 化され、閉じタグの省略などに厳しくなった
- TypeScript は **6.0.3 に固定**。`@astrojs/check` が 7 系に未対応のため上げられない
- `cookie` を 2.0.1 に固定。textlint 経由の CJS 版がルートに巻き上げられると、
  ビルド出力からの解決で Astro が必要とする ESM 版を拾えずビルドが落ちる

## Commands

```bash
npm run dev            # 開発サーバー http://localhost:4321/antimacho.dev/
npm run check          # astro check（型 + frontmatter スキーマ）
npm run build          # 本番ビルド
npm run lint:text      # textlint（日本語 + prh 辞書）
npm run lint:markdown  # markdownlint
npm run format         # prettier
```

テストランナーは無い。**デモを触ったら `npm run dev` で目視確認する**（後述のとおり
iframe の中は外から読めないため、自動で確かめる手段がない）。

## Architecture

### コンテンツはファイルを置くだけ

- **記事**: `src/content/posts/<カテゴリ>/<スラッグ>.mdx`。ディレクトリ名がカテゴリになり、
  ホーム・サイドバー・カテゴリページに自動で載る。frontmatter は
  `src/content.config.ts` の zod スキーマで検証され、**壊れているとビルドで落ちる**
- **デモ**: `src/demos/<id>/`（`index.html` / `style.css` / `script.js` / `demo.json`）。
  `import.meta.glob` で自動収集され `<Demo id="..." />` から参照できる。`_` 始まりは対象外

どちらも index への登録は不要。書き方は [src/content/README.md](src/content/README.md) と
[src/demos/README.md](src/demos/README.md)、スキルは `.claude/skills/write-post` と
`.claude/skills/add-demo`。

glob ローダーは id をスラッグ化して**小文字にする**ため、`lib/posts.ts` は表示用のカテゴリ名を
`filePath` から取り直し、URL 用スラッグと分けて保持している。

### デモの隔離

デモは iframe の `srcdoc` に流し込まれ、`sandbox="allow-scripts allow-forms"` で隔離される。
**`allow-same-origin` は付けていない**ので、オリジンは不透明のまま。つまり:

- デモから親ページの DOM・localStorage・CSS カスタムプロパティには触れない
- **親からもデモの中の DOM を読めない**。動作確認は目視でやるしかない
- 親子のやり取りは postMessage のみ（高さの通知とテーマの伝搬）

ランタイムは `src/lib/sandbox.ts` に集約されていて、`Sandbox` / `Demo` / `Compare` が共有する。
ソースは `<script>` ではなく `<template>` のテキストとして持たせているため、
デモ側に `</script>` が含まれていても壊れない。

### MDX コンポーネント

`src/components/mdx/index.ts` に export したものは、記事ページが `<Content components={...} />`
で渡すので**記事側で import せずに使える**。追加するときはここへの export を忘れないこと。

### スタイル

- 配色は `src/styles/tokens.css` の CSS カスタムプロパティ。light は `:root`、dark は `html.dark`。
  ハードコードせず必ずトークンを使う（ただし iframe の中では使えない）
- `src/styles/prose.css` は記事本文のスタイルで、`p` や `ul` など**素のタグを直接狙う**。
  そのため **`.prose` の内側に UI 要素を置かないこと**（過去にタグ一覧にリスト装飾が付く不具合を出した）。
  幅と余白はレイアウト側の `.column` が持つ
- デモ枠に `bleed` を付けると本文幅を超えて広がる。はみ出し量は左右の固定レール幅
  （`--rails`）を差し引いて計算される

### リントと MDX の相性

textlint も markdownlint も MDX を理解せず、JSX を散文として誤検出する。
誤検出するルールは無効化済み。**`textlint --fix` は JSX の中身を書き換えることがある**ので、
実行したら `git diff` で確認すること（lint-staged から走るのは報告のみ）。
