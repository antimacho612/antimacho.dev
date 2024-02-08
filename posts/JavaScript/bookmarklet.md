---
title: ブックマークレット
cratedAt: '2024-02-08T16:35:35+09:00'
updatedAt: '2024-02-08T16:35:35+09:00'
---

## MD-LINK

- 現在開いているページのマークダウン用リンクをクリップボードにコピーする
  - e.g. `[ブックマークレット | antimacho.dev](https://antimacho612.github.io/antimacho.dev/posts/JavaScript/bookmarklet)`

```js
javascript: (() => {
  const title = document.title.replace(/\[/g, '\\[').replace(/]/g, '\\]');
  const url = document.URL.replace(/\(/g, '%2528').replace(/\)/g, '%2529');
  const mdLink = `[${title}](${url})`;
  navigator.clipboard.writeText(mdLink).then(() => {
    alert('リンクをコピーしました。');
  });
})();
```

## GET-METADATA

- 現在開いているページのメタデータをクリップボードにコピーする
- リンクカード作成時に使ったりしている
- `obj`に情報を追加したり削除したりすることでコピーする情報をカスタマイズ可能
  - e.g. `obj.twitterImage = head.querySelector('meta[name="twitter:image:src"]')?.content;`（X（旧Twitter）用画像）

```
url: https://github.com/antimacho612/antimacho.dev
title: antimacho612/antimacho.dev
ogTitle: antimacho612/antimacho.dev
description: Contribute to antimacho612/antimacho.dev development by creating an account on GitHub.
ogDescription: Contribute to antimacho612/antimacho.dev development by creating an account on GitHub.
icon: https://github.githubassets.com/favicons/favicon-dark.svg
ogImage: https://opengraph.githubassets.com/512174967cd27d2926fe1104b11b3973c01b4ef80a0d19d36e90130dffd03366/antimacho612/antimacho.dev
```

```js
javascript: (() => {
  const { URL: pageUrl, head, title } = document;
  const extractUrl = (url) => {
    try {
      return new URL(url);
    } catch (_) {}
  };
  const cleanPath = (path) => path.replace(/\/\//g, '/');
  const toAbsolute = (path) => {
    if (!path) return undefined;
    return extractUrl(path) ? path : `${extractUrl(pageUrl)?.origin}${cleanPath(`/${path}`)}`;
  };
  const obj = { url: pageUrl, title };
  obj.ogTitle = head.querySelector('meta[property="og:title"]')?.content;
  obj.description = head.querySelector('meta[name="description"]')?.content;
  obj.ogDescription = head.querySelector('meta[property="og:description"]')?.content;
  obj.icon = toAbsolute(head.querySelector('link[rel="icon"]')?.href);
  obj.ogImage = toAbsolute(head.querySelector('meta[property="og:image"]')?.content);
  navigator.clipboard
    .writeText(
      Object.keys(obj)
        .filter((key) => !!obj[key])
        .map((key) => `${key}: ${obj[key]}`)
        .join('\n')
    )
    .then(() => {
      alert('クリップボードにコピーしました。');
    });
})();
```
