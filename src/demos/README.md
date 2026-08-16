# デモの書き方

`src/demos/` 配下は `import.meta.glob` で自動収集される。
**index への登録は不要**で、ディレクトリを 1 つ置けば `<Demo id="<ディレクトリ名>" />` で記事から参照できる。

```txt
src/demos/<id>/
  index.html   マークアップ（必須）
  style.css    スタイル（任意）
  script.js    スクリプト（任意）
  demo.json    設定（任意）
```

`_` で始まるディレクトリは収集対象外。新規作成は [_template/](_template/) をコピーする。

## demo.json

```json
{
  "title": "下にキャプションとして出る説明",
  "height": 240,
  "defaultTab": "preview",
  "editable": true,
  "bleed": true
}
```

すべて任意。`height` を省略すると中身の高さに追従する（基本は省略してよい）。
記事側の props で個別に上書きできる。

## 実行環境

デモは iframe の `srcdoc` に流し込まれ、`sandbox="allow-scripts allow-forms"` で隔離される。
`allow-same-origin` は付けていないので、**デモから親ページの DOM や localStorage には触れない**。

注入される CSS は次だけで、あとはブラウザの既定スタイルがそのまま出る。
`box-sizing` も既定の `content-box` のままなので、必要ならデモ側で指定する。

```css
:root { color-scheme: light; font-family: system-ui, ...; }
html.dark { color-scheme: dark; }
body { margin: 0; padding: 16px; }
```

サイトのテーマを切り替えると `<html>` に `dark` クラスが付く。
配色を変えたいデモは `html.dark` を見て書く。
何もしなければ `color-scheme` により素の背景色と文字色が反転する。

## 気をつけること

- **id はディレクトリ名と揃える**（kebab-case）。存在しない id を参照するとビルドが落ち、エラーに現在あるデモの一覧が出る。
- 横幅は可変にする。デモ枠の幅は画面幅とレイアウトで変わる。`width: 100%` を使うときは `box-sizing: border-box` も併せて指定しないと横に溢れる。
- アクセントカラーは記事側と揃えて `#8b5cf6` / `#a78bfa` 系を使う。ただしテーマトークン（`var(--primary-color)` など）は iframe の中では**使えない**ので、値を直接書く。
- 高さが変わり続けるデモ（無限にアニメーションするなど）は `height` を固定したほうが落ち着く。

## 確認

```bash
npm run check
npm run build
```

見た目は `npm run dev` で実際に開いて確かめる。
