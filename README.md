# Mojik

<b>Mojik</b>は、ウェブにおける和文の文字組みの「アキ」をコントロールするためのJavaScriptライブラリです。指定した要素のテキストを探索して、以下のパターンでのアキのコントロールを可能にします。

- 連続する約物（括弧や句読点など）の間のアキ
- 行頭の始め括弧の前のアキ
- 和欧間のアキ

## 使い方

ファイル一式をダウンロード、もしくはnpmからインストールします。

- ダウンロード:  https://github.com/terkel/mojik/archive/master.zip
- npm: `npm install mojik`

`mojik.css`と`mojik.js`をHTMLドキュメントに読み込みます。

    <link rel="stylesheet" href="path/to/mojik.css">
    <script src="path/to/mojik.js"></script>

`Mojik.compose()`メソッドを呼び出します。引数には文字組を適用したい要素のCSSセレクターを渡します。

    <script>
    Mojik.compose(".ArticleBody p");
    </script>

各アキ量は`mojik.css`で調整します。

```
.mjk-western-number {
    margin-left: 0.166ch;
    margin-right: 0.166ch;
}
```

## ライセンス

このプロジェクトは[MITライセンス](http://opensource.org/licenses/MIT)のもとで公開されています。
