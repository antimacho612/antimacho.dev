# 記事の書き方

## 置き場所と URL

```txt
src/content/posts/<カテゴリ>/<スラッグ>.mdx  →  /posts/<かてごり>/<すらっぐ>
```

ディレクトリ名がそのままカテゴリになる。**index への登録は不要**で、ファイルを 1 つ置けば
ホーム・サイドバー・カテゴリページのすべてに載る。

URL は小文字化される（`CSS/foo.mdx` → `/posts/css/foo`）が、表示上のカテゴリ名は
ディレクトリ名のまま（`CSS`）。ラベルや並び順を変えたいときは
[src/site.config.ts](../site.config.ts) の `CATEGORIES` に足す。設定がなくても表示はされる。

新規作成は [_templates/post.mdx](_templates/post.mdx) をコピーするのが早い。

## frontmatter

スキーマは [src/content.config.ts](../content.config.ts) が持っていて、**合わないとビルドで落ちる**。

```yaml
---
title: コンテナクエリの基本        # 必須
summary: 一覧カードに出る 1〜2 行の説明   # 任意だが書くこと
createdAt: 2026-08-16              # 必須
updatedAt: 2026-08-20              # 任意。省略時は createdAt と同じ扱い
tags: [CSS, レスポンシブ]           # 任意
draft: false                       # true にすると本番ビルドから外れる
---
```

`draft: true` の記事も開発サーバーでは表示される（書きかけを確認できるように）。

## 使えるコンポーネント

記事の中では **import せずに**そのまま使える。一覧と props は
[記事「記事で使えるコンポーネント」](posts/General/mdx-components.mdx) に実物付きでまとめてある。

| | 用途 |
| --- | --- |
| `<Sandbox>` | HTML/CSS/JS のデモを記事に直接書く |
| `<Demo id="...">` | `src/demos/<id>/` に置いたデモを参照する |
| `<Compare>` | 同じマークアップに別々の CSS を当てて並べる |
| `<Callout>` | 補足・注意の囲み |
| `<Badge>` / `<Key>` / `<KeyCombination>` | 小さなラベル・キー表示 |
| `<LinkCard>` | 外部リンクをカードで貼る |
| `<Mermaid>` | 図 |

追加したいものは [src/components/mdx/](../components/mdx/) に置いて
[index.ts](../components/mdx/index.ts) に export する。

## デモの使い分け

このサイトは「動かして確かめられること」が主眼なので、**文章で説明する前にデモを置く**。

- **`<Sandbox>`** … 20 行程度までのデモ。記事を読みながらコードも一緒に読めるのが利点
- **`<Demo>`** … それより大きいもの、特に JS を伴うもの。エディタの補完と整形が効く
- **`<Compare>`** … 「これを付けるとこう変わる」を示すとき

デモが横長になるなら `bleed` を付けると本文幅を超えて広がる。

デモの書き方は [src/demos/README.md](../demos/README.md) を見ること。

## 文体

- 常体（だ・である）で書く。「〜します」「〜しましょう」は使わない
- 主語を大きくしない。「一般的に良いとされる」ではなく、何がどう良いかを書く
- 見出しは `##` から始める（`#` は記事タイトルとして自動で入る）
- `##` は 3〜6 個程度。1 つの見出しの下が長くなるなら `###` で割る
- コードブロックには言語を指定する

## 検証

記事を追加したら次を通す。

```bash
npm run check   # 型と frontmatter
npm run build   # ビルドが通るか
```

textlint / markdownlint は `npm run lint:text` / `npm run lint:markdown` で個別に走る
（コミット時に lint-staged からも自動で走る）。
