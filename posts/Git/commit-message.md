---
title: Gitのコミットメッセージの書き方
cratedAt: '2024-02-16T15:47:51+09:00'
updatedAt: '2024-02-16T15:56:09+09:00'
---

## フォーマット

[Semantic Commit Messages](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)に従う。

`<Emoji><Type>: #<Issue Number> <Title>`

- 例: `✨feat: #123 ログイン機能の実装をする`
- `<Type>`と`<Title>`は必須
- `<Emoji>`は任意
- `<Issue Number>`は強く推奨
- Description（スリーライン）は任意

### `<Emoji>`

- Typeをよりカラフルにするため、一目でわかりやすくするために書く
- gitmojiから選ぶのが便利

<LinkCard
  url="https://gitmoji.dev/"
  label="gitmoji | An emoji guide for your commit messages"
  imageUrl="https://gitmoji.dev/static/gitmoji.gif"
  description="Gitmoji is an emoji guide for your commit messages. Aims to be a standarization cheatsheet for using emojis on GitHub's commit messages."
/>

- VSCodeでは下記プラグインを利用すると便利

<LinkCard
  url="https://marketplace.visualstudio.com/items?itemName=seatonjiang.gitmoji-vscode"
  label="Gitmoji - Visual Studio Marketplace"
  imageUrl="https://seatonjiang.gallerycdn.vsassets.io/extensions/seatonjiang/gitmoji-vscode/1.2.5/1703601215545/Microsoft.VisualStudio.Services.Icons.Default"
  description="Extension for Visual Studio Code - Gitmoji tool for git commit messages in VSCode"
/>

```md [よく使うEmoji]
:tada:         プロジェクト開始 🎉
:bug:          バグ修正 🐛
:sparkles:     新機能の追加 ✨
:zap:          機能追加 ⚡️
:memo:         ドキュメントの追加・修正 📝
:recycle:      リファクタリング ♻️
:fire:         不要機能やファイルの削除 🔥
:construction: 作成途中のコミット 🚧
```

### `<Type>`

- どんなコミットなのかを一目でわかるようにPrefixとしてコミット種別を書く
- Semantic Commit Messageと同様の種別を使う

|    種類    |                      ケース                      |
| :--------- | :----------------------------------------------- |
| `chore`    | タスクファイルなどプロダクションに影響のない修正 |
| `docs`     | ドキュメントの更新                               |
| `feat`     | ユーザー向けの機能の追加や変更                   |
| `fix`      | ユーザー向けの不具合の修正                       |
| `refactor` | リファクタリングを目的とした修正                 |
| `style`    | フォーマットなどのスタイルに関する修正           |
| `test`     | テストコードの追加や修正                         |

### `<Issue Number>`

- そのコミットに紐づくIssue番号を書く
  - リンクになって、トラッキングがしやすいため
- Issueを作っていないケースや`hotfix`の場合は省略可

### `Subject`

- 変更内容を書く
- 現在形（「〇○した」ではなく「〇○する」）で書く
- 文字数は20～30文字以内が適切

## 参考

- [Gitのコミットメッセージの書き方（2023年ver.）](https://zenn.dev/itosho/articles/git-commit-message-2023)
- [🐛 gitmoji(絵文字)を使ってコミットログをかわいくしよう！✨ - Qiita](https://qiita.com/grhg/items/22fdbfd59b2748a0f698)
