/*!
 * Mojik v0.1.1 https://github.com/terkel/mojik
 * @author Takeru Suzuki http://terkel.jp/
 * @license MIT http://opensource.org/licenses/MIT
 */
(function (root, factory) {
    if (typeof module === "object" && module.exports) {
        module.exports = factory();
    } else if (typeof define === "function" && define.amd) {
        define(factory);
    } else {
        root.Mojik = factory();
    }
}(this, function () {

    var Mojik = Mojik || {};

    Mojik.htmlClassPrefix = "mjk-";

    Mojik.htmlClass = {
        punctuationSpacer: "punctuationSpacer",
        leadOpeningBracket: "leadOpeningBracket",
        leadOpeningBracket_atLineHead: "leadOpeningBracket-atLineHead",
        leadOpeningBracket_atParagraphHead: "leadOpeningBracket-atParagraphHead",
        leadOpeningBracketBefore: "leadOpeningBracketBefore",
        leadOpeningBracketBefore_atLineEnd: "leadOpeningBracketBefore-atLineEnd",
        western: "western",
        western_number: "western-number",
        western_noSpace: "western-noSpace",
        western_noSpaceBefore: "western-noSpaceBefore",
        western_noSpaceAfter: "western-noSpaceAfter",
        western_atLineHead: "western-atLineHead",
        western_atParagraphHead: "western-atParagraphHead",
        western_afterLineBreak: "western-afterLineBreak"
    };

    Mojik.characters = {

        // 始め括弧類
        japaneseOpeningBrackets: "「『（｟［〚｛〔〘〈《【〖〝",

        // 終わり括弧類
        japaneseClosingBrackets: "」』）｠］〛｝〕〙〉》】〗〞〟",

        // 区切り約物類
        japaneseDividingPunctuations: "！？",

        // 中点類
        japaneseMiddleDots: "・：；゠",

        // 句点類
        japaneseFullStops: "。．",

        // 読点類
        japaneseCommas: "、，",

        // 前置省略記号
        // japanesePrefixedAbbreviations: "￥＄￡＃",

        // 後置省略記号
        // japanesePostfixedAbbreviations: "℃￠％‰",

        // 和字間隔
        japaneseFullWidthSpace: "　",

        // 欧文文字
        western:
            "\\u0000-\\u007F" + // Basic Latin
            "\\u0080-\\u00FF" + // Latin-1 Supplement
            "\\u0100-\\u017F" + // Latin Extended-A
            "\\u0180-\\u024F" + // Latin Extended-B
            // "\\u0250-\\u02AF" + // IPA Extensions
            // "\\u02B0-\\u02FF" + // Spacing Modifier Letters
            // "\\u0300-\\u036F" + // Combining Diacritical Marks
            // "\\u0370-\\u03FF" + // Greek and Coptic
            // "\\u0400-\\u04FF" + // Cyrillic
            // "\\u0500-\\u052F" + // Cyrillic Supplement
            // ...
            "\\u2000-\\u206F" + // General Punctuation
            "\\u2070-\\u209F" + // Superscripts and Subscripts
            "\\u20A0-\\u20CF" + // Currency Symbols
            // "\\u20D0-\\u20FF" + // Combining Diacritical Marks for Symbols
            "\\u2100-\\u214F" + // Letterlike Symbols
            "\\u2150-\\u218F",  // Number Forms

        // 欧文始め括弧
        westernOpeningBrackets: "‘“\\(\\[\\{<«‹",

        // 欧文終わり括弧
        westernClosingBrackets: "’”)]}>»›",

        // 欧文ダッシュ (FIGURE DASH, EN DASH, EM DASH, HORIZONTAL BAR, SWUNG DASH)
        westernDashes: "\\u2012\\u2013\\u2014\\u2015\\u2053",

        // 欧文ハイフン (HYPHEN-MINUS, HYPHEN, NON-BREAKING HYPHEN)
        westernHyphens: "\\u002D\\u2010\\u2011",

        // 欧文リード (HORIZONTAL ELLIPSIS, TWO DOT LEADER)
        westernEllipses: "\\u2025\\u2026"
    };

    Mojik.ignoreTag = "pre|code|kbd|samp";

    Mojik.compose = function (selector/*, options*/) {
        var elements = document.querySelectorAll(selector);
        var reTagStr = "<\\/?[^>]+?\\/?>";
        var reTag = new RegExp(reTagStr);
        var reTagDivider = new RegExp(reTagStr + "|[^<>]+", "gi");
        var reObun = new RegExp("[" + Mojik.characters.western + "]+", "g");
        var reObunAhead = new RegExp("[" + Mojik.characters.western + "]+$");
        var reObunBehind = new RegExp("^[" + Mojik.characters.western + "]+");
        var reIgnoreTag = new RegExp("^<(" + Mojik.ignoreTag + ")[ >]", "i");
        var reYakumonoStr =
                Mojik.characters.japaneseOpeningBrackets +
                Mojik.characters.japaneseClosingBrackets +
                Mojik.characters.japaneseMiddleDots +
                Mojik.characters.japaneseFullStops +
                Mojik.characters.japaneseCommas +
                Mojik.characters.japaneseFullWidthSpace;
        var reYakumonoAhead = new RegExp("[" + reYakumonoStr + "]$");
        var reYakumonoBehind = new RegExp("^[" + reYakumonoStr + "]");
        var reOpenKakko = new RegExp("[" + Mojik.characters.japaneseOpeningBrackets + "]", "g");
        var puncPairs = [
            [Mojik.characters.japaneseClosingBrackets,
                Mojik.characters.japaneseOpeningBrackets +
                Mojik.characters.japaneseClosingBrackets +
                Mojik.characters.japaneseDividingPunctuations +
                Mojik.characters.japaneseMiddleDots +
                Mojik.characters.japaneseFullStops +
                Mojik.characters.japaneseCommas +
                Mojik.characters.japaneseFullWidthSpace
            ],
            [Mojik.characters.japaneseDividingPunctuations,
                Mojik.characters.japaneseFullWidthSpace
            ],
            [Mojik.characters.japaneseMiddleDots,
                Mojik.characters.japaneseOpeningBrackets
            ],
            [Mojik.characters.japaneseFullStops + Mojik.characters.japaneseCommas,
                Mojik.characters.japaneseOpeningBrackets +
                Mojik.characters.japaneseClosingBrackets +
                Mojik.characters.japaneseMiddleDots +
                Mojik.characters.japaneseFullWidthSpace
            ]
        ];
        var htmlClass = (function () {
            var obj = {};
            for (key in Mojik.htmlClass) {
                obj[key] = Mojik.htmlClassPrefix + Mojik.htmlClass[key];
            }
            return obj;
        }());

        // 要素ごとに処理
        Array.prototype.forEach.call(elements, function (el) {

            // 要素内の文字列をテキストとタグのスライス（文字列片）に分割
            var slices = el.innerHTML.match(reTagDivider);

            var tagSlices = [];
            var nonTagSlices = [];
            var node;
            var openingBracketList;
            var westernList;
            var ignoreTagMatch;
            var ignoreTagMatchs;
            var reIgnoreEndTag;
            var reIgnoreStartTag;
            var i;
            var j;
            var tmp;

            // スライスごとに処理
            for (i = 0; i < slices.length; i++) {

                // 特定のタグ内のすべてのスライスを無視
                ignoreTagMatch = slices[i].match(reIgnoreTag);
                if (ignoreTagMatch) {
                    reIgnoreEndTag = new RegExp("</" + ignoreTagMatch[1] + "\\s*>");
                    reIgnoreStartTag = new RegExp("<" + ignoreTagMatch[1] + "(?:\\s*|\\s+[^>]+)>");
                    ignoreTagMatchs = 1;
                    for (j = i + 1; j < slices.length; j++) {
                        if (reIgnoreEndTag.test(slices[j])) {
                            ignoreTagMatchs--;
                            if (ignoreTagMatchs === 0) {
                                i = j;
                                break;
                            }
                        } else if (reIgnoreStartTag.test(slices[j])) {
                            ignoreTagMatchs++;
                        }
                    }
                    continue;
                }

                // そのほかの開始タグと終了タグを無視
                if (reTag.test(slices[i])) {
                    tagSlices.push(slices[i]);
                    continue;
                }

                // テキストスライスを保存
                nonTagSlices.push(slices[i]);

                // 欧文を検出
                slices[i] = slices[i].replace(reObun, function (match, offset) {

                    // 空白文字のみなら処理しない
                    if (/^\s+$/.test(match)) {
                        return match;
                    }

                    // 数字
                    var isNumber = /^\d([\d.,/]*\d)?$/.test(match);

                    // 要素の先頭
                    var isAtParagraphHead =
                            i === 0 &&
                            window.getComputedStyle(el).display !== "inline" &&
                            /^\s*$/.test(slices[i].substring(0, offset));

                    var k;

                    // [TODO] 左右スペースを除去
                    var hasNoSpace;

                    // 左スペースを除去
                    var hasNoSpaceBefore =

                            // 空白で始まる
                            /^\s/.test(match) ||

                            // スライス中の2文字目以降で和文約物に後続
                            (offset > 0 && reYakumonoAhead.test(slices[i].substring(0, offset))) ||

                            // スライスの先頭で、スライスが要素の先頭か、先行する直近のテキストスライスが和文約物か欧文で終わる
                            (offset === 0 && (
                                i === 0 ||
                                reYakumonoAhead.test(nonTagSlices[nonTagSlices.length - 2]) || reObunAhead.test(nonTagSlices[nonTagSlices.length - 2])
                            ));

                    // 右スペースを除去 1
                    var hasNoSpaceAfter =

                            // 空白で終わる
                            /\s$/.test(match) ||

                            // 後続する直近のテキストスライスが和文約物で始まる
                            reYakumonoBehind.test(slices[i].substring(offset + match.length));

                    // 右スペースを除去 2
                    if (!hasNoSpaceAfter && slices[i].length === offset + match.length) {

                        // 要素の最後
                        if (i === slices.length - 1) {
                            hasNoSpaceAfter = true;
                        }

                        else {
                            for (k = i + 1; k < slices.length; k++) {
                                if (reTag.test(slices[k])) {

                                    // テキストスライスが後続しない
                                    if (k === slices.length - 1) {
                                        hasNoSpaceAfter = true;
                                    } else {
                                        continue;
                                    }

                                } else {

                                    // タグをまたいで後続する直近のテキストスライスが和文約物か欧文で始まる
                                    if (reYakumonoBehind.test(slices[k]) || reObunBehind.test(slices[k])) {
                                        hasNoSpaceAfter = true;
                                    }

                                    break;
                                }
                            }
                        }
                    }

                    return "<span class=\"" + htmlClass.western +
                            (isNumber? " " + htmlClass.western_number: "") +
                            (hasNoSpace? " " + htmlClass.western_noSpace: "") +
                            (hasNoSpaceBefore? " " + htmlClass.western_noSpaceBefore: "") +
                            (hasNoSpaceAfter? " " + htmlClass.western_noSpaceAfter: "") +
                            (isAtParagraphHead? " " + htmlClass.western_atParagraphHead: "") +
                            "\">" + match + "</span>";
                });

                // 和文始め括弧を検出
                tmp = slices[i].replace(reOpenKakko, function (match, offset) {
                    var isAtParagraphHead;
                    var isLead;
                    var hasSucceeding;
                    var matchBefore =
                            offset === 0? (new RegExp("[" + Mojik.characters.japaneseOpeningBrackets + "]$")).exec(nonTagSlices[nonTagSlices.length - 2]):
                            offset > 0? (new RegExp("[" + Mojik.characters.japaneseOpeningBrackets + "]")).exec(slices[i].charAt(offset - 1)):
                            null;

                    // 直前のテキストスライスが始め括弧
                    if (matchBefore) {
                        return "<span class=\"" + htmlClass.punctuationSpacer +
                                "\" data-mjk-punc-pair=\"" + matchBefore[0] + match +
                                "\"></span>" + match;
                    }

                    // 要素の先頭
                    else if (
                        i === 0 &&
                        window.getComputedStyle(el).display !== "inline" &&
                        /^\s*$/.test(slices[i].substring(0, offset))
                    ) {
                        return "<span class=\"" + htmlClass.leadOpeningBracket +
                                " " + htmlClass.leadOpeningBracket_atParagraphHead +
                                "\">" + match + "</span>";

                    }

                    // 独立した、または連続した始め括弧の先頭
                    else {
                        return "<span class=" + htmlClass.leadOpeningBracketBefore + "></span>" +
                                "<span class=" + htmlClass.leadOpeningBracket + ">" + match + "</span>";
                    }
                });

                slices[i] = tmp;

                // 連続する和文約物を検出
                puncPairs.forEach(function (pair) {
                    var reAhead = new RegExp("[" + pair[0] + "]", "g");
                    var reBehind = new RegExp("^(?:" + reTagStr + ")*([" + pair[1] + "])");

                    slices[i] = slices[i].replace(reAhead, function (match, offset) {
                        var ret = match;
                        var matchBehind = null;
                        var l;

                        if (offset + match.length === slices[i].length) {
                            for (l = i + 1; l < slices.length; l++) {
                                if (reTag.test(slices[l])) {
                                    continue;
                                } else {
                                    matchBehind = reBehind.exec(slices[l]);
                                    if (matchBehind) {
                                        ret += "<span class=\"" + htmlClass.punctuationSpacer +
                                                "\" data-mjk-punc-pair=\"" + match + matchBehind[1] +
                                                "\"></span>";
                                    }
                                    break;
                                }
                            }
                        } else {
                            matchBehind = reBehind.exec(slices[i].substring(offset + 1));
                            if (matchBehind) {
                                ret += "<span class=\"" + htmlClass.punctuationSpacer +
                                        "\" data-mjk-punc-pair=\"" + match + matchBehind[1] +
                                        "\"></span>";
                            }
                        }
                        return ret;
                    });
                });
            }

            el.innerHTML = slices.join("");

            openingBracketList = el.querySelectorAll("." + htmlClass.leadOpeningBracket +
                    ":not(." + htmlClass.leadOpeningBracket_atParagraphHead + ")");
            westernList = el.querySelectorAll("." + htmlClass.western +
                    ":not(." + htmlClass.western_noSpace + ")" +
                    ":not(." + htmlClass.western_noSpaceBefore + ")");
            detectOpeningBracketAtLineHead();
            detectWesternAtLineHead();
            throttle("resize", "optimizedResize");
            window.addEventListener("optimizedResize", detectOpeningBracketAtLineHead);
            window.addEventListener("optimizedResize", detectWesternAtLineHead);

            // 行頭の欧文を検出
            function detectWesternAtLineHead () {
                var staticParent = window.getComputedStyle(el).position === "static";
                var parentPaddingLeft = parseFloat(window.getComputedStyle(el).paddingLeft);

                // 検出結果をリセット
                Array.prototype.forEach.call(westernList, function (western) {
                    western.classList.remove(htmlClass.western_atLineHead);
                    western.classList.remove(htmlClass.western_afterLineBreak);
                });

                // 欧文の相対位置を検出するため親要素のpositionプロパティを一時的に変更
                if (staticParent) {
                    el.style.position = "relative";
                }

                Array.prototype.forEach.call(westernList, function (western) {
                    var marginLeft = parseFloat(window.getComputedStyle(western).marginLeft);

                    // 直前の要素がbrかどうか
                    if (isLineBreak(western.previousSibling)) {
                        western.classList.add(htmlClass.western_atLineHead);
                        western.classList.add(htmlClass.western_afterLineBreak);
                    }

                    // 要素内の相対位置を検出
                    else if (western.offsetLeft - marginLeft - parentPaddingLeft < 1) {
                        western.classList.add(htmlClass.western_atLineHead);
                    }
                });

                // 親要素のpositionプロパティを元に戻す
                if (staticParent) {
                    el.style.position = "";
                }
            }

            // 行頭の始め括弧を検出
            function detectOpeningBracketAtLineHead () {
                var staticParent = window.getComputedStyle(el).position === "static";
                var parentPaddingLeft = parseFloat(window.getComputedStyle(el).paddingLeft);

                // 検出結果をリセット
                Array.prototype.forEach.call(openingBracketList, function (bracket) {
                    bracket.classList.remove(htmlClass.leadOpeningBracket_atLineHead);
                    bracket.previousSibling.classList.remove(htmlClass.leadOpeningBracketBefore_atLineEnd);
                });

                // 始め括弧の相対位置を検出するため親要素のpositionプロパティを一時的に変更
                if (staticParent) {
                    el.style.position = "relative";
                }

                Array.prototype.forEach.call(openingBracketList, function (bracket) {
                    var bracketBefore = bracket.previousSibling;

                    // 直前がbrかどうか
                    if (isLineBreak(bracketBefore.previousSibling)) {
                        bracket.classList.add(htmlClass.leadOpeningBracket_atLineHead);
                    }

                    // 要素内の相対位置を検出
                    else if (bracket.offsetLeft - parentPaddingLeft < 1) {
                        bracket.classList.add(htmlClass.leadOpeningBracket_atLineHead);
                        bracketBefore.classList.add(htmlClass.leadOpeningBracketBefore_atLineEnd);
                    }
                });

                // 親要素のpositionプロパティを元に戻す
                if (staticParent) {
                    el.style.position = "";
                }
            }

            function isLineBreak (node) {
                return node &&
                        node.nodeName === "BR" &&
                        window.getComputedStyle(node).display !== "none";
            }
        });
    }

    // https://developer.mozilla.org/en-US/docs/Web/Events/resize#requestAnimationFrame_customEvent
    function throttle (type, name, obj) {
        obj = obj || window;
        var running = false;
        var func = function() {
            if (running) { return; }
            running = true;
            requestAnimationFrame(function() {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };

    return Mojik;
}));
