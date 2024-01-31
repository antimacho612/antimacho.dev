---
title: キーボードショートカット
cratedAt: '2024-01-31T10:09:09.776Z'
updatedAt: '2024-01-31T10:09:09.776Z'
---

※Windows用

## 一般

| 操作 | キー | 備考 |
| :--- | :--- | :--- |
| クイックオープン, ファイルに移動 | <KeyCombination :values="['Ctrl', 'P']" /> | |
| コマンドパレットを開く | <KeyCombination :values="['Ctrl', 'Shift', 'P']" /> | |
| 新しいウィンドウ/インスタンス | <KeyCombination :values="['Ctrl', 'Shift', 'N']" /> | |
| ウィンドウ/インスタンスを閉じる | <KeyCombination :values="['Ctrl', 'Shift', 'W']" /> | |
| ユーザ設定 | <KeyCombination :values="['Ctrl', ',']" /> | |
| キーボードショートカット設定画面 | <KeyCombination :values="['Ctrl', 'K']" /> , <KeyCombination :values="['Ctrl', 'S']" /> | |
| 言語モードを選択 | <KeyCombination :values="['Ctrl', 'K']" /> , <Key value="K" /> | |

### サイドバー

| 操作 | キー | 備考 |
| :--- | :--- | :--- |
| フォーカスを移動 | <KeyCombination :values="['Ctrl', '0']" /> | |
| 開く/閉じる | <KeyCombination :values="['Ctrl', 'B']" /> | |
| エクスプローラーを開く/閉じる | <KeyCombination :values="['Ctrl', 'Shift', 'E']" /> | |
| 検索を開く/閉じる | <KeyCombination :values="['Ctrl', 'Shift', 'F']" /> | |
| ソース管理を開く/閉じる | <KeyCombination :values="['Ctrl', 'Shift', 'G']" /> | |
| デバッグを開く/閉じる | <KeyCombination :values="['Ctrl', 'Shift', 'D']" /> | |
| 拡張機能を開く/閉じる | <KeyCombination :values="['Ctrl', 'Shift', 'X']" /> | |

### パネル

| 操作 | キー | 備考 |
| :--- | :--- | :--- |
| 開く/閉じる | <KeyCombination :values="['Ctrl', 'J']" /> | |
| 出力を開く/閉じる | <KeyCombination :values="['Ctrl', 'Shift', 'U']" /> | |
| 問題を開く/閉じる | <KeyCombination :values="['Ctrl', 'Shift', 'M']" /> | |
| デバッグコンソールを開く/閉じる | <KeyCombination :values="['Ctrl', 'Shift', 'Y']" /> | |
| 統合ターミナルを開く/閉じる | <KeyCombination :values="['Ctrl', '@']" /> | |

## 編集

| 操作 | キー | 備考 |
| :--- | :--- | :--- |
| 行削除 | <KeyCombination :values="['Ctrl', 'Shift', 'K']" /> | |
| 選択範囲コピー/<br>行コピー（非選択状態） | <KeyCombination :values="['Ctrl', 'C']" /> | |
| 選択範囲切り取り/<br>行切り取り（非選択状態） | <KeyCombination :values="['Ctrl', 'X']" /> | |
| カーソル行の下に空行を挿入 | <KeyCombination :values="['Ctrl', 'Enter']" /> | |
| カーソル行の上に空行を挿入 | <KeyCombination :values="['Ctrl', 'Shift', 'Enter']" /> | |
| カーソル行を上/下に移動 | <KeyCombination :values="['Alt', '↑']" /> / <Key value="↓" /> | |
| カーソル行を上/下にコピー | <KeyCombination :values="['Shift', 'Alt', '↑']" /> / <Key value="↓" /> | |
| 単語の部分削除（カーソルより左側） | <KeyCombination :values="['Ctrl', 'BS']" /> | |
| 単語の部分削除（カーソルより右側） | <KeyCombination :values="['Ctrl', 'Del']" /> | |

## 選択

| 操作 | キー | 備考 |
| :--- | :--- | :--- |
| 文字選択 | <KeyCombination :values="['Shift', '←']" />  / <Key value="→" /> | |
| 単語単位で文字選択 | <KeyCombination :values="['Ctrl', 'Shift', '←']" /> / <Key value="→" /> | |
| 単語選択 |  <KeyCombination :values="['Ctrl', 'D']" /> | |
| 行選択 | <KeyCombination :values="['Shift', 'L']" /> | ・連続して押すと1行ずつ選択行が増えていく |
| スマート選択 | <KeyCombination :values="['Shift', 'Alt', '←']" /> / <Key value="→" /> | ・どのような単位で選択されるかは言語モードによって異なる |

## マルチカーソル・複数選択・矩形選択

| 操作 | キー | 備考 |
| :--- | :--- | :--- |
| マルチカーソルを上/下に広げる | <KeyCombination :values="['Alt', 'Ctrl', '↑']" /> / <Key value="↓" /> | |
| 選択中の文字列と同じ文字列を複数選択 | <KeyCombination :values="['Ctrl', 'D']" /> | |
| 選択中の文字列と一致する文字列をすべて選択 | <KeyCombination :values="['Ctrl', 'Shift', 'L']" /> | |
| 矩形選択 | <KeyCombination :values="['Ctrl', 'Shift', 'Alt', '↑']" /> / <Key value="↓" /> / <Key value="←" /> / <Key value="→" /> | ・矩形選択した状態で<KeyCombination :values="['Ctrl', 'Shift', 'Alt', 'PgUp']" /> / <Key value="PgDn" />を押すと、上/下方向にページ単位で選択を拡張する |

## 移動・スクロール

| 操作 | キー | 備考 |
| :--- | :--- | :--- |
| 行頭/行末に移動 | <Key value="Home" /> / <Key value="End" /> | |
| ファイルの先頭/末尾に移動 | <KeyCombination :values="['Ctrl', 'Home']" /> / <Key value="End" /> | |
| 折り返しON⇔OFF | <KeyCombination :values="['Alt', 'Z']" /> | |
| 上下スクロール（カーソル位置はそのまま） | <KeyCombination :values="['Ctrl', '↑']" /> / <Key value="↓" /> | |
| ページ上下（カーソル位置はそのまま） | <KeyCombination :values="['Alt', 'PgUp']" /> / <Key value="PgDn" /> | |
| 対応するブラケットにジャンプ | <KeyCombination :values="['Ctrl', 'Shift', '\\']" /> | |
| 指定行にジャンプ | <KeyCombination :values="['Ctrl', 'G']" /> | ・行番号にマイナス値を指定すると最下行からの相対行にジャンプできる<br>・行番号の後ろにカンマ区切りで桁位置も指定できる |
| 最後の編集位置に移動 | <KeyCombination :values="['Ctrl', 'K']" /> , <KeyCombination :values="['Ctrl', 'Q']" /> | |

## 検索

### エディタ内

| 操作 | キー | 備考 |
| :--- | :--- | :--- |
| 検索 | <KeyCombination :values="['Ctrl', 'F']" /> | |
| 置換 | <KeyCombination :values="['Ctrl', 'H']" /> | |

### 検索中

| 操作 | キー | 備考 |
| :--- | :--- | :--- |
| 次/前の検索結果にジャンプ | <Key value="F3" /> / <KeyCombination :values="['Shift', 'F3']" /> | |
| 大文字小文字の区別ON/OFF | <KeyCombination :values="['Alt', 'C']" /> | |
| 単語単位検索ON/OFF | <KeyCombination :values="['Alt', 'W']" /> | |
| 正規表現検索ON/OFF | <KeyCombination :values="['Alt', 'R']" /> | |
| 選択範囲内検索ON/OFF | <KeyCombination :values="['Alt', 'L']" /> | |

### フォルダ・ワークスペース全体

| 操作 | キー | 備考 |
| :--- | :--- | :--- |
| 検索 | <KeyCombination :values="['Ctrl', 'Shift', 'F']" /> | |
| 置換 | <KeyCombination :values="['Ctrl', 'Shift', 'H']" /> | |
| 次/前の検索結果にジャンプ | <Key value="F4" /> / <KeyCombination :values="['Shift', 'F4']" /> | |

## コメント

| 操作 | キー | 備考 |
| :--- | :--- | :--- |
| 行コメント追加/削除 | <KeyCombination :values="['Ctrl', 'K']" /> , <KeyCombination :values="['Ctrl', 'C']" /> / <Key value="U" /> | |
| 行コメントの切り替え | <KeyCombination :values="['Ctrl', '/']" /> | |
| ブロックコメントの切り替え | <KeyCombination :values="['Shift', 'Alt', 'A']" /> | |

## 折りたたみ

| 操作 | キー | 備考 |
| :--- | :--- | :--- |
| すべてのインデントを折りたたむ | <KeyCombination :values="['Ctrl', 'K']" /> , <KeyCombination :values="['Ctrl', '0']" /> | |
| 1～7段目のインデントをすべて折りたたむ | <KeyCombination :values="['Ctrl', 'K']" /> , <KeyCombination :values="['Ctrl', '1']" /> ～ <Key value="7" /> | |
| すべてのインデントを展開する | <KeyCombination :values="['Ctrl', 'K']" /> , <KeyCombination :values="['Ctrl', 'J']" /> | |
| カーソルのあるインデントを折りたたむ/展開する | <KeyCombination :values="['Ctrl', 'Shift', '[']" /> / <Key value="]" /> | |
| カーソルのあるインデントを折りたたむ/展開する | <KeyCombination :values="['Ctrl', 'K']" /> , <KeyCombination :values="['Ctrl', 'L']" /> | ※トグル |
| カーソルのあるインデントを子インデント含め折りたたむ/展開する | <KeyCombination :values="['Ctrl', 'K']" /> , <KeyCombination :values="['Ctrl', '[']" /> / <Key value="]" /> | |
| すべてのブロックコメントを折りたたむ | <KeyCombination :values="['Ctrl', 'K']" /> , <KeyCombination :values="['Ctrl', '/']" /> | |
| 選択された範囲の折りたたみ設定を有効にする/解除する | <KeyCombination :values="['Ctrl', 'K']" /> , <KeyCombination :values="['Ctrl', ',']" /> / <Key value="." /> | 設定はファイルを開き直しても維持される |

## 保存

| 操作 | キー | 備考 |
| :--- | :--- | :--- |
| 上書き保存 | <KeyCombination :values="['Ctrl', 'S']" /> | |
| 名前を付けて保存 | <KeyCombination :values="['Ctrl', 'Shift', 'S']" /> | |
| 全ファイル保存 | <KeyCombination :values="['Ctrl', 'K']" /> , <Key value="S" /> | |
| 自動フォーマットせずに保存 | <KeyCombination :values="['Ctrl', 'K']" /> , <KeyCombination :values="['Ctrl', 'Shift', 'S']" /> | |

## エディタ操作

| 操作 | キー | 備考 |
| :--- | :--- | :--- |
| 新しいエディタ | <KeyCombination :values="['Ctrl', 'N']" /> | |
| 閉じたエディタを再度開く | <KeyCombination :values="['Ctrl', 'Shift', 'T']" /> | |
| エディタを閉じる | <KeyCombination :values="['Ctrl', 'W']" /> / <KeyCombination :values="['Ctrl', 'F4']" /> | |
| エディタグループ内をすべて閉じる | <KeyCombination :values="['Ctrl', 'K']" /> , <Key value="W" /> | |
| エディタをすべて閉じる | <KeyCombination :values="['Ctrl', 'K']" /> , <KeyCombination :values="['Ctrl', 'W']" /> | |
| エディタを分割（設定の方向） | <KeyCombination :values="['Ctrl', '\\']" /> | |
| エディタを分割（設定とは逆方向） | <KeyCombination :values="['Ctrl', 'K']" /> , <KeyCombination :values="['Ctrl', '\\']" /> | |
| エディタグループ作成/<br>エディタグループにフォーカス | <KeyCombination :values="['Ctrl', '1']" /> ～ <Key value="8" /> | |
| 同一エディタ内でエディタを分割 | <KeyCombination :values="['Ctrl', 'K']" /> , <KeyCombination :values="['Ctrl', 'Shift', '\\']" /> | |
| エディタを隣のエディタグループに移動<br>※グループが存在しない場合は新たに作成する | <KeyCombination :values="['Ctrl', 'Alt', '←']" /> / <Key value="→" /> | |
| エディタを隣のエディタグループに移動<br>※グループが存在しない場合は新たに作成しない | <KeyCombination :values="['Shift', 'Alt', '←']" /> / <Key value="→" /> | |
| エディタグループを横断してのアクティブエディタの切り替え | <KeyCombination :values="['Ctrl', 'PgUp']" /> / <Key value="PgDn" /> | |
| エディタグループ内でのアクティブエディタの切り替え | <KeyCombination :values="['Ctrl', 'Tab']" /> | |
| エディタグループの方向（縦/横）切り替え | <KeyCombination :values="['Shift', 'Alt', '0']" /> | |
| 差分ビューを開く | <KeyCombination :values="['Ctrl', 'K']" /> , <Key value="D" /> | |

## リッチ言語編集

| 操作 | キー | 備考 |
| :--- | :--- | :--- |
| 候補をトリガー | <KeyCombination :values="['Ctrl', 'Space']" /> | |
| パラメータヒントをトリガー | <KeyCombination :values="['Ctrl', 'Shift', 'Space']" /> | |
| 定義へ移動 | <Key value="F12" /> | |
| 定義を横に開く | <KeyCombination :values="['Ctrl', 'K']" /> , <Key value="F12" /> | |
| 参照を表示 | <KeyCombination :values="['Shift', 'F12']" /> | |
| クイックフィックス | <KeyCombination :values="['Ctrl', '.']" /> | |
| シンボル名の変更 | <Key value="F2" /> | |

## デバッグ

| 操作 | キー | 備考 |
| :--- | :--- | :--- |
| ブレークポイントの切り替え | <Key value="F9" /> | |
| 開始/続行 | <Key value="F5" /> | |
| 停止 | <KeyCombination :values="['Shift', 'F5']" /> | |
| ステップイン/アウト | <Key value="F11" /> / <KeyCombination :values="['Shift', 'F11']" /> | |
| ステップオーバー | <Key value="F10" /> | |
| ホバーを表示 | <KeyCombination :values="['Ctrl', 'K']" /> , <KeyCombination :values="['Ctrl', 'I']" /> | |

## 参考

- [VS Code の便利なショートカットキー #VSCode - Qiita](https://qiita.com/12345/items/64f4372fbca041e949d0)
- [VS Code Keyboard shortcuts for Windows（日本語版）](https://beanhouse.org/wordpress/wp-content/uploads/2020/05/Keyboard-shortcuts-for-Windows-for-pdf.pdf)

<LinkCard
  url="https://qiita.com/12345/items/64f4372fbca041e949d0"
  label="VS Code の便利なショートカットキー - Qiita"
  imageUrl="https:/qiita-user-contents.imgix.net/https%3A%2F%2Fcdn.qiita.com%2Fassets%2Fpublic%2Farticle-ogp-background-9f5428127621718a910c8b63951390ad.png?ixlib=rb-4.0.0&w=1200&mark64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTkxNiZoPTMzNiZ0eHQ9VlMlMjBDb2RlJTIwJUUzJTgxJUFFJUU0JUJFJUJGJUU1JTg4JUE5JUUzJTgxJUFBJUUzJTgyJUI3JUUzJTgzJUE3JUUzJTgzJUJDJUUzJTgzJTg4JUUzJTgyJUFCJUUzJTgzJTgzJUUzJTgzJTg4JUUzJTgyJUFEJUUzJTgzJUJDJnR4dC1jb2xvcj0lMjMyMTIxMjEmdHh0LWZvbnQ9SGlyYWdpbm8lMjBTYW5zJTIwVzYmdHh0LXNpemU9NTYmdHh0LWNsaXA9ZWxsaXBzaXMmdHh0LWFsaWduPWxlZnQlMkN0b3Amcz05MzU2YWVhMWMzNDBiYjAxMzBkNTQwZTU5Y2JiZjI5Yw&mark-x=142&mark-y=112&blend64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTYxNiZ0eHQ9JTQwMTIzNDUmdHh0LWNvbG9yPSUyMzIxMjEyMSZ0eHQtZm9udD1IaXJhZ2lubyUyMFNhbnMlMjBXNiZ0eHQtc2l6ZT0zNiZ0eHQtYWxpZ249bGVmdCUyQ3RvcCZzPWRiZGM3ZTM5YmJmOWE5NTU4YWE4NjZlZTk0YzljOWZj&blend-x=142&blend-y=491&blend-mode=normal&s=55fb89511f6fe3aac5078e5cfa41c664"
  description="Visual Studio Codeを自分が使用する際に便利なショートカットキーを、忘れないようにまとめておく。Windows版。v1.57で再確認済み。編集系Ctrl + Enter　カーソル…"
/>
