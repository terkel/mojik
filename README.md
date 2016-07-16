# Mojik

<b>Mojik</b>は、ウェブにおける和文の文字組みをコントロールするためのJavaScriptライブラリです。現在のところ、以下のパターンでの「アキ」の調整ができます。

- 連続する約物のアキ
- 行頭の始め括弧のアキ
- 和欧間のアキ

## 使い方

ファイル一式をダウンロード、もしくはnpmからインストールします。

- ダウンロード:  https://github.com/terkel/mojik/archive/master.zip
- npm: `npm install mojik`

`mojik.css`と`mojik.js`をHTMLドキュメントに読み込みます。

    <link rel="stylesheet" href="path/to/mojik.css">
    <script src="path/to/mojik.js"></script>

`Mojik.compose()`メソッドを呼び出します。引数には、文字組みを適用したい段落や見出しなどのCSSセレクターを渡します。

    <script>
    Mojik.compose(".ArticleBody p");
    </script>

各アキ量はCSSで調整します。

```
.mjk-western-number {
    margin-left: 0.166ch;
    margin-right: 0.166ch;
}
```

## ライセンス

このプロジェクトは[MITライセンス](http://opensource.org/licenses/MIT)のもとで公開されています。
