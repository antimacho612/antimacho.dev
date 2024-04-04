---
title: VS Codeのおすすめ設定と拡張機能
cratedAt: '2024-04-04T21:02:16+09:00'
updatedAt: '2024-04-04T21:02:16+09:00'
---

## 標準機能の設定

```json
{
  "auto-close-tag.disableOnLanguage": ["javascript", "typescript", "markdown"],

  "code-eol.color": "#808080",

  "debug.console.fontFamily": "UDEV Gothic NFLG",
  "debug.internalConsoleOptions": "openOnSessionStart",
  "debug.openDebug": "openOnSessionStart",
  "editor.acceptSuggestionOnCommitCharacter": false,
  "editor.acceptSuggestionOnEnter": "off",
  "editor.bracketPairColorization.enabled": true,
  "editor.copyWithSyntaxHighlighting": false,
  "editor.cursorBlinking": "smooth",
  "editor.cursorSmoothCaretAnimation": "on",
  "editor.fontFamily": "UDEV Gothic LG",
  "editor.fontLigatures": true,
  "editor.fontSize": 14,
  "editor.guides.bracketPairs": true,
  "editor.minimap.showSlider": "always",
  "editor.minimap.size": "fit",
  "editor.mouseWheelZoom": true,
  "editor.renderControlCharacters": true,
  "editor.renderLineHighlight": "gutter",
  "editor.renderWhitespace": "all",
  "editor.smoothScrolling": true,
  "editor.stickyScroll.enabled": true,
  "editor.suggestSelection": "first",
  "editor.tabCompletion": "on",
  "editor.unicodeHighlight.allowedCharacters": {
    "›": true
  },
  "editor.wordSeparators": "`~!@#$%^&*()-=+[{]}\\|;:'\",.<>/?、。「」（）【】『』〔〕〈〉≪≫《》｛｝＜＞；：・？＋－＊／＝≒≠＠｜～＆％＄＃”！’　てにをはがのともへでや",
  "explorer.confirmDelete": false,
  "explorer.confirmDragAndDrop": false,
  "explorer.fileNesting.enabled": true,
  "explorer.sortOrderLexicographicOptions": "unicode",

  "files.eol": "\n",

  "git.autofetch": true,
  "git.confirmSync": false,
  "git.enableSmartCommit": true,
  "githubPullRequests.createOnPublishBranch": "never",
  "gitlens.advanced.messages": {
    "suppressFileNotUnderSourceControlWarning": true
  },
  "gitlens.codeLens.authors.enabled": false,
  "gitlens.codeLens.recentChange.enabled": false,
  "gitlens.defaultDateFormat": "YYYY/M/D HH:mm",
  "gitlens.defaultDateStyle": "absolute",

  "hediet.vscode-drawio.resizeImages": null,
  "hediet.vscode-drawio.theme": "atlas",
  "html.format.enable": false,

  "insertnum.formatstr": "%d", // Insert Numbersのデフォルトフォーマット
  "insertnum.start": 1, // Insert Numbersのデフォルト開始番号
  "insertnum.step": 1, // Insert Numbersのデフォルトステップ数

  "liveSassCompile.settings.autoprefix": ["> 0.5%", "not dead"],
  "liveSassCompile.settings.formats": [
    {
      "extensionName": ".css",
      "format": "expanded"
    },
    {
      "extensionName": ".min.css",
      "format": "compressed"
    }
  ],
  "liveSassCompile.settings.generateMap": false,
  "liveSassCompile.settings.showOutputWindowOn": "Debug",
  "liveServer.settings.donotShowInfoMsg": true,
  "liveServer.settings.donotVerifyTags": true,

  "markdown-preview-enhanced.codeBlockTheme": "monokai.css",
  "markdown-preview-enhanced.frontMatterRenderingOption": "table",
  "markdown-preview-enhanced.previewTheme": "one-dark.css",
  "markdown.extension.toc.updateOnSave": false,
  "markdown.preview.breaks": true,
  "markdown.preview.fontFamily": "Noto Sans JP",
  "markdown.preview.lineHeight": 1.5,
  "markdown.validate.enabled": true,
  "markdownlint.config": {
    "MD024": {
      "siblings_only": true
    },
    "no-inline-html": {
      "allowed_elements": ["a", "br"]
    }
  },
  "material-icon-theme.activeIconPack": "vue",

  "pasteImage.path": "${currentFileDir}/images",
  "php.validate.executablePath": "D:\\xampp\\php\\php.exe",
  "prettier.jsxSingleQuote": true,
  "prettier.singleQuote": true,

  "security.workspace.trust.untrustedFiles": "open",

  "tableformatter.common.explicitFullwidthChars": ["←", "→", "↑", "↓", "⇔", "⇒", "…", "≠", "○", "※"],
  "terminal.integrated.cursorBlinking": true,
  "terminal.integrated.cursorStyle": "line",
  "terminal.integrated.enableMultiLinePasteWarning": "never",
  "terminal.integrated.env.windows": {
    "PSExecutionPolicyPreference": "RemoteSigned"
  },
  "terminal.integrated.fontFamily": "UDEV Gothic NFLG",
  "terminal.integrated.smoothScrolling": true,

  "workbench.colorCustomizations": {
    "editorStickyScroll.background": "#1c114d",
    "editorStickyScrollHover.background": "#372181"
  },
  "workbench.iconTheme": "material-icon-theme",
  "workbench.layoutControl.enabled": false,
  "workbench.list.smoothScrolling": true,
  "workbench.productIconTheme": "material-product-icons",
  "workbench.startupEditor": "none",
  "workbench.tree.enableStickyScroll": true,
  "workbench.tree.renderIndentGuides": "always",

  "[astro]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnPaste": true,
    "editor.formatOnSave": true,
    "editor.insertSpaces": true,
    "editor.tabSize": 2,
    "files.insertFinalNewline": true,
    "files.trimFinalNewlines": true,
    "files.trimTrailingWhitespace": true
  },

  "[bat]": {
    "files.encoding": "shiftjis"
  },

  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnPaste": true,
    "editor.formatOnSave": true,
    "editor.insertSpaces": true,
    "editor.tabSize": 2,
    "files.insertFinalNewline": true,
    "files.trimFinalNewlines": true,
    "files.trimTrailingWhitespace": true
  },

  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnPaste": true,
    "editor.formatOnSave": true,
    "editor.insertSpaces": true,
    "editor.tabSize": 2,
    "editor.wordSeparators": "`~!@#%^&*()-=+[{]}\\|;:'\",.<>/?、。「」（）【】『』〔〕〈〉≪≫《》｛｝＜＞；：・？＋－＊／＝≒≠＠｜～＆％＄＃”！’　てにをはがのともへでや",
    "files.insertFinalNewline": true,
    "files.trimFinalNewlines": true,
    "files.trimTrailingWhitespace": true
  },

  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnPaste": true,
    "editor.formatOnSave": true,
    "editor.insertSpaces": true,
    "editor.tabSize": 2,
    "files.insertFinalNewline": true,
    "files.trimFinalNewlines": true,
    "files.trimTrailingWhitespace": true
  },

  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnPaste": true,
    "editor.formatOnSave": true,
    "editor.insertSpaces": true,
    "editor.tabSize": 2,
    "files.insertFinalNewline": true,
    "files.trimFinalNewlines": true,
    "files.trimTrailingWhitespace": true
  },
  "javascript.format.insertSpaceAfterSemicolonInForStatements": false,
  "javascript.preferences.quoteStyle": "single",
  "javascript.referencesCodeLens.enabled": true,
  "javascript.suggest.completeFunctionCalls": true,
  "javascript.updateImportsOnFileMove.enabled": "always",

  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnPaste": true,
    "editor.formatOnSave": true,
    "editor.insertSpaces": true,
    "editor.tabSize": 2,
    "files.insertFinalNewline": true,
    "files.trimFinalNewlines": true,
    "files.trimTrailingWhitespace": true
  },

  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnPaste": true,
    "editor.formatOnSave": true,
    "editor.insertSpaces": true,
    "editor.tabSize": 2,
    "files.insertFinalNewline": true,
    "files.trimFinalNewlines": true,
    "files.trimTrailingWhitespace": true
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnPaste": true,
    "editor.formatOnSave": true,
    "editor.insertSpaces": true,
    "editor.tabSize": 2,
    "files.insertFinalNewline": true,
    "files.trimFinalNewlines": true,
    "files.trimTrailingWhitespace": true
  },
  "typescript.format.insertSpaceAfterSemicolonInForStatements": false,
  "typescript.implementationsCodeLens.enabled": true,
  "typescript.preferences.quoteStyle": "single",
  "typescript.suggest.completeFunctionCalls": true,
  "typescript.updateImportsOnFileMove.enabled": "always",

  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnPaste": true,
    "editor.formatOnSave": true,
    "editor.insertSpaces": true,
    "editor.tabSize": 2,
    "files.insertFinalNewline": true,
    "files.trimFinalNewlines": true,
    "files.trimTrailingWhitespace": true
  },
  "vue.splitEditors.icon": true,
  "vue.updateImportsOnFileMove.enabled": true,
  "vue.autoInsert.dotValue": true,

  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnPaste": true,
    "editor.formatOnSave": true,
    "editor.insertSpaces": true,
    "editor.tabSize": 2,
    "files.insertFinalNewline": true,
    "files.trimFinalNewlines": true,
    "files.trimTrailingWhitespace": true
  },

  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnPaste": true,
    "editor.formatOnSave": true,
    "editor.insertSpaces": true,
    "editor.tabSize": 2,
    "files.insertFinalNewline": true,
    "files.trimFinalNewlines": true,
    "files.trimTrailingWhitespace": true
  },

  "[markdown]": {
    "editor.formatOnPaste": false,
    "editor.formatOnSave": false,
    "editor.minimap.enabled": false,
    "editor.quickSuggestions": {
      "comments": "on",
      "other": "on",
      "strings": "on"
    },
    "editor.tabSize": 2,
    "editor.wordWrap": "off",
    "files.eol": "\r\n",
    "files.insertFinalNewline": true,
    "files.trimFinalNewlines": true,
    "files.trimTrailingWhitespace": true,
    "editor.defaultFormatter": "DavidAnson.vscode-markdownlint"
  },

  "[xml]": {
    "editor.tabSize": 2
  },

  "[yaml]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## 拡張機能

### 外観・テーマ

#### Material Icon Theme

#### Material Product Icons

#### One Dark+

### 汎用

#### Bracket Lens

右括弧の左側にスコープの情報が表示されるようになる。

https://marketplace.visualstudio.com/items?itemName=wraith13.bracket-lens

#### Better Folding

行の折りたたみをより見やすく・使いやすくする。

https://marketplace.visualstudio.com/items?itemName=MohammadBaqer.better-folding

#### code-eol

行末に改行コードを表示する。

https://marketplace.visualstudio.com/items?itemName=sohamkamani.code-eol

#### Draw.io Integration

https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio

#### Error Lens

エラー内容をインラインで表示。

https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens

#### IntelliCode

https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode

#### ESLint

https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

#### json

https://marketplace.visualstudio.com/items?itemName=ZainChen.json

#### Prettier

コードフォーマッタ。

https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

#### Swagger Viewer

#### TODO Highlight

#### vscode-json

#### vscode-random

#### Code Spell Checker

スペルチェッカ―。

https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker

#### Insert Numbers

[](https://marketplace.visualstudio.com/items?itemName=Asuka.insertnumbers)

#### Rainbow CSV

#### vscode-textlint

### WEB

#### Auto Close Tag

閉じタグを自動で補完してくれる。

https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag

#### Auto Rename Tag

開始タグと閉じタグが連動して名称を変更できる。

https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag

#### CSS Peek

https://marketplace.visualstudio.com/items?itemName=sohamkamani.code-eol

#### ES7+ React/Redux/React-Native snippets

https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets

#### HTML CSS Support

#### SCSS IntelliSense

#### IntelliSence for CSS class names in HTML

#### Markuplint

#### Stylelint

#### vscode-styled-components

### Git（GitHub）

#### Git History

#### GitHub Actions

#### GitHub Pull Requests

#### GitLens

#### Gitmoji

### Markdown

#### Markdown All in One

#### Markdown Preview Enhanced

#### Paste Image

#### Table Formatter

#### markdownlint

#### Mermaid Markdown Syntax Highlighting
