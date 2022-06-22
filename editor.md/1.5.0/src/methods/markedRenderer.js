/**
 * 自定义marked的解析器
 * Custom Marked renderer rules
 * 
 * @param   {Array}    markdownToC     传入用于接收TOC的数组
 * @returns {Renderer} markedRenderer  返回marked的Renderer自定义对象
 */

const markedRenderer = function (markdownToC, options) {
    var defaults = {
        toc: true,           // Table of contents
        tocm: false,
        tocStartLevel: 1,              // Said from H1 to create ToC  
        pageBreak: true,
        atLink: true,           // for @link
        emailLink: true,           // for mail address auto link
        taskList: false,          // Enable Github Flavored Markdown task lists
        emoji: false,          // :emoji: , Support Twemoji, fontAwesome, Editor.md logo emojis.
        tex: false,          // TeX(LaTeX), based on KaTeX
        flowChart: false,          // flowChart.js only support IE9+
        sequenceDiagram: false,          // sequenceDiagram.js only support IE9+
    };

    var settings = $.extend(defaults, options || {});
    var marked = editormd.$marked;
    var markedRenderer = new marked.Renderer();
    markdownToC = markdownToC || [];

    var regexs = editormd.regexs;
    var atLinkReg = regexs.atLink;
    var emojiReg = regexs.emoji;
    var emailReg = regexs.email;
    var emailLinkReg = regexs.emailLink;
    var twemojiReg = regexs.twemoji;
    var faIconReg = regexs.fontAwesome;
    var editormdLogoReg = regexs.editormdLogo;
    var pageBreakReg = regexs.pageBreak;

    markedRenderer.emoji = function (text) {

        text = text.replace(editormd.regexs.emojiDatetime, function ($1) {
            return $1.replace(/:/g, "&#58;");
        });

        var matchs = text.match(emojiReg);

        if (!matchs || !settings.emoji) {
            return text;
        }

        for (var i = 0, len = matchs.length; i < len; i++) {
            if (matchs[i] === ":+1:") {
                matchs[i] = ":\\+1:";
            }

            text = text.replace(new RegExp(matchs[i]), function ($1, $2) {
                var faMatchs = $1.match(faIconReg);
                var name = $1.replace(/:/g, "");

                if (faMatchs) {
                    for (var fa = 0, len1 = faMatchs.length; fa < len1; fa++) {
                        var faName = faMatchs[fa].replace(/:/g, "");

                        return "<i class=\"fa " + faName + " fa-emoji\" title=\"" + faName.replace("fa-", "") + "\"></i>";
                    }
                }
                else {
                    var emdlogoMathcs = $1.match(editormdLogoReg);
                    var twemojiMatchs = $1.match(twemojiReg);

                    if (emdlogoMathcs) {
                        for (var x = 0, len2 = emdlogoMathcs.length; x < len2; x++) {
                            var logoName = emdlogoMathcs[x].replace(/:/g, "");
                            return "<i class=\"" + logoName + "\" title=\"Editor.md logo (" + logoName + ")\"></i>";
                        }
                    }
                    else if (twemojiMatchs) {
                        for (var t = 0, len3 = twemojiMatchs.length; t < len3; t++) {
                            var twe = twemojiMatchs[t].replace(/:/g, "").replace("tw-", "");
                            return "<img src=\"" + editormd.twemoji.path + twe + editormd.twemoji.ext + "\" title=\"twemoji-" + twe + "\" alt=\"twemoji-" + twe + "\" class=\"emoji twemoji\" />";
                        }
                    }
                    else {
                        var src = (name === "+1") ? "plus1" : name;
                        src = (src === "black_large_square") ? "black_square" : src;
                        src = (src === "moon") ? "waxing_gibbous_moon" : src;

                        return "<img src=\"" + editormd.emoji.path + src + editormd.emoji.ext + "\" class=\"emoji\" title=\"&#58;" + name + "&#58;\" alt=\"&#58;" + name + "&#58;\" />";
                    }
                }
            });
        }

        return text;
    };

    markedRenderer.atLink = function (text) {

        if (atLinkReg.test(text)) {
            if (settings.atLink) {
                text = text.replace(emailReg, function ($1, $2, $3, $4) {
                    return $1.replace(/@/g, "_#_&#64;_#_");
                });

                text = text.replace(atLinkReg, function ($1, $2) {
                    return "<a href=\"" + editormd.urls.atLinkBase + "" + $2 + "\" title=\"&#64;" + $2 + "\" class=\"at-link\">" + $1 + "</a>";
                }).replace(/_#_&#64;_#_/g, "@");
            }

            if (settings.emailLink) {
                text = text.replace(emailLinkReg, function ($1, $2, $3, $4, $5) {
                    return (!$2 && $.inArray($5, "jpg|jpeg|png|gif|webp|ico|icon|pdf".split("|")) < 0) ? "<a href=\"mailto:" + $1 + "\">" + $1 + "</a>" : $1;
                });
            }

            return text;
        }

        return text;
    };

    markedRenderer.link = function (href, title, text) {

        if (this.options.sanitize) {
            try {
                var prot = decodeURIComponent(unescape(href)).replace(/[^\w:]/g, "").toLowerCase();
            } catch (e) {
                return "";
            }

            if (prot.indexOf("javascript:") === 0) {
                return "";
            }
        }

        var out = "<a href=\"" + href + "\"";

        if (atLinkReg.test(title) || atLinkReg.test(text)) {
            if (title) {
                out += " title=\"" + title.replace(/@/g, "&#64;");
            }

            return out + "\">" + text.replace(/@/g, "&#64;") + "</a>";
        }

        if (title) {
            out += " title=\"" + title + "\"";
        }

        out += ">" + text + "</a>";

        return out;
    };

    markedRenderer.heading = function (text, level, raw) {

        var linkText = text;
        var hasLinkReg = /\s*\<a\s*href\=\"(.*)\"\s*([^\>]*)\>(.*)\<\/a\>\s*/;
        var getLinkTextReg = /\s*\<a\s*([^\>]+)\>([^\>]*)\<\/a\>\s*/g;

        if (hasLinkReg.test(text)) {
            var tempText = [];
            text = text.split(/\<a\s*([^\>]+)\>([^\>]*)\<\/a\>/);

            for (var i = 0, len = text.length; i < len; i++) {
                tempText.push(text[i].replace(/\s*href\=\"(.*)\"\s*/g, ""));
            }

            text = tempText.join(" ");
        }

        text = trim(text);

        var escapedText = text.toLowerCase().replace(/[^\w]+/g, "-");
        var toc = {
            text: text,
            level: level,
            slug: escapedText
        };

        var isChinese = /^[\u4e00-\u9fa5]+$/.test(text);
        var id = (isChinese) ? escape(text).replace(/\%/g, "") : text.toLowerCase().replace(/[^\w]+/g, "-");

        markdownToC.push(toc);

        var headingHTML = "<h" + level + " id=\"h" + level + "-" + this.options.headerPrefix + id + "\">";

        headingHTML += "<a name=\"" + text + "\" class=\"reference-link\"></a>";
        headingHTML += "<span class=\"header-link octicon octicon-link\"></span>";
        headingHTML += (hasLinkReg) ? this.atLink(this.emoji(linkText)) : this.atLink(this.emoji(text));
        headingHTML += "</h" + level + ">";

        return headingHTML;
    };

    markedRenderer.pageBreak = function (text) {
        if (pageBreakReg.test(text) && settings.pageBreak) {
            text = "<hr style=\"page-break-after:always;\" class=\"page-break editormd-page-break\" />";
        }

        return text;
    };

    markedRenderer.paragraph = function (text) {
        var isTeXInline = /\$\$(.*)\$\$/g.test(text);
        var isTeXLine = /^\$\$(.*)\$\$$/.test(text);
        var isTeXAddClass = (isTeXLine) ? " class=\"" + editormd.classNames.tex + "\"" : "";
        var isToC = (settings.tocm) ? /^(\[TOC\]|\[TOCM\])$/.test(text) : /^\[TOC\]$/.test(text);
        var isToCMenu = /^\[TOCM\]$/.test(text);

        if (!isTeXLine && isTeXInline) {
            text = text.replace(/(\$\$([^\$]*)\$\$)+/g, function ($1, $2) {
                return "<span class=\"" + editormd.classNames.tex + "\">" + $2.replace(/\$/g, "") + "</span>";
            });
        }
        else {
            text = (isTeXLine) ? text.replace(/\$/g, "") : text;
        }

        var tocHTML = "<div class=\"markdown-toc editormd-markdown-toc\">" + text + "</div>";

        return (isToC) ? ((isToCMenu) ? "<div class=\"editormd-toc-menu\">" + tocHTML + "</div><br/>" : tocHTML)
            : ((pageBreakReg.test(text)) ? this.pageBreak(text) : "<p" + isTeXAddClass + ">" + this.atLink(this.emoji(text)) + "</p>\n");
    };

    markedRenderer.code = function (code, lang, escaped) {

        if (lang === "seq" || lang === "sequence") {
            return "<div class=\"sequence-diagram\">" + code + "</div>";
        }
        else if (lang === "flow") {
            return "<div class=\"flowchart\">" + code + "</div>";
        }
        else if (lang === "math" || lang === "latex" || lang === "katex") {
            return "<p class=\"" + editormd.classNames.tex + "\">" + code + "</p>";
        }
        else {

            return marked.Renderer.prototype.code.apply(this, arguments);
        }
    };

    markedRenderer.tablecell = function (content, flags) {
        var type = (flags.header) ? "th" : "td";
        var tag = (flags.align) ? "<" + type + " style=\"text-align:" + flags.align + "\">" : "<" + type + ">";

        return tag + this.atLink(this.emoji(content)) + "</" + type + ">\n";
    };

    markedRenderer.listitem = function (text) {
        if (settings.taskList && /^\s*\[[x\s]\]\s*/.test(text)) {
            text = text.replace(/^\s*\[\s\]\s*/, "<input type=\"checkbox\" class=\"task-list-item-checkbox\" /> ")
                .replace(/^\s*\[x\]\s*/, "<input type=\"checkbox\" class=\"task-list-item-checkbox\" checked disabled /> ");

            return "<li style=\"list-style: none;\">" + this.atLink(this.emoji(text)) + "</li>";
        }
        else {
            return "<li>" + this.atLink(this.emoji(text)) + "</li>";
        }
    };

    markedRenderer.image = function (href, title, text) {
        let _this = this;

        // href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
        if (href === null) {
            return text;
        }

        const { settings } = editormd;
        if (typeof settings.imgPath === 'string') {
            var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
            if (regex.test(href) !== true) {
                href = settings.imgPath + '/' + href;
            }
        }

        let out = '<img src="' + href + '" alt="' + text + '"';
        if (title) {
            out += ' title="' + title + '"';
        }
        out += '/>';

        return out;
    }

    return markedRenderer;
};