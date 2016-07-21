# Mojik

<b>Mojik</b>は、ウェブにおける和文の文字組みをコントロールするためのJavaScriptライブラリです。現在のところ、以下のパターンでの「アキ」の調整ができます。

- 連続する約物のアキ
- 行頭の始め括弧のアキ
- 和欧間のアキ

Mojik is a JavaScript library which makes Japanese typography more beautiful on the web. Currently, it makes adjustments to spacing for the cases:

- Spaces between consecutive punctuation marks
- Space before a punctuation mark at the beginning of a line
- Space between Japanese and Latin characters

## デモ Demo

https://terkel.github.io/mojik/

## 使い方 How to use it

ファイル一式をダウンロード、もしくはnpmからインストールします。  
Download all files or install via npm.

- ダウンロード:  https://github.com/terkel/mojik/archive/master.zip
- npm: `npm install mojik`

`mojik.css`と`mojik.js`をHTMLドキュメントに読み込みます。  
Add `mojik.css` and `mojik.js` to your HTML document.

    <link rel="stylesheet" href="path/to/mojik.css">
    <script src="path/to/mojik.js"></script>

`Mojik.compose()`メソッドを呼び出します。引数には、文字組みを適用したい段落や見出しなどのCSSセレクターを渡します。  
Call the `Mojik.compose()` method. Use the parameter to pass the CSS selector to text elements.

    <script>
    Mojik.compose(".ArticleBody p");
    </script>

各アキ量はCSSで調整します。  
Set the spacing amount using CSS.

```
.mjk-western-number {
    margin-left: 0.166ch;
    margin-right: 0.166ch;
}
```

## ライセンス License

このプロジェクトは[MITライセンス](http://opensource.org/licenses/MIT)のもとで公開されています。  
This project is released under the [MIT License](http://opensource.org/licenses/MIT).
