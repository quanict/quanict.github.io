
const markedPlugin = {
    $marked: null,
    /**
     * 将Markdown文档解析为HTML用于前台显示
     * Parse Markdown to HTML for Font-end preview.
     * 
     * @param   {String}   id            用于显示HTML的对象ID
     * @param   {Object}   [options={}]  配置选项，可选
     * @returns {Object}   div           返回jQuery对象元素
     */
    markdownToHTML: function (id, options) {
        var defaults = {
            gfm: true,
            toc: true,
            tocm: false,
            tocStartLevel: 1,
            tocTitle: "目录",
            tocDropdown: false,
            tocContainer: "",
            markdown: "",
            markdownSourceCode: false,
            htmlDecode: false,
            autoLoadKaTeX: true,
            pageBreak: true,
            atLink: true,    // for @link
            emailLink: true,    // for mail address auto link
            tex: false,
            taskList: false,   // Github Flavored Markdown task lists
            emoji: false,
            flowChart: false,
            sequenceDiagram: false,
            previewCodeHighlight: true
        };

        editormd.$marked = marked;

        var div = $("#" + id);
        var settings = div.settings = $.extend(true, defaults, options || {});
        var saveTo = div.find("textarea");

        if (saveTo.length < 1) {
            div.append("<textarea></textarea>");
            saveTo = div.find("textarea");
        }

        var markdownDoc = (settings.markdown === "") ? saveTo.val() : settings.markdown;
        var markdownToC = [];

        var rendererOptions = {
            toc: settings.toc,
            tocm: settings.tocm,
            tocStartLevel: settings.tocStartLevel,
            taskList: settings.taskList,
            emoji: settings.emoji,
            tex: settings.tex,
            pageBreak: settings.pageBreak,
            atLink: settings.atLink,           // for @link
            emailLink: settings.emailLink,        // for mail address auto link
            flowChart: settings.flowChart,
            sequenceDiagram: settings.sequenceDiagram,
            previewCodeHighlight: settings.previewCodeHighlight,
        };

        var markedOptions = {
            renderer: editormd.markedRenderer(markdownToC, rendererOptions),
            gfm: settings.gfm,
            tables: true,
            breaks: true,
            pedantic: false,
            sanitize: (settings.htmlDecode) ? false : true, // 是否忽略HTML标签，即是否开启HTML标签解析，为了安全性，默认不开启
            smartLists: true,
            smartypants: true
        };

        markdownDoc = new String(markdownDoc);

        var markdownParsed = marked(markdownDoc, markedOptions);

        markdownParsed = editormd.filterHTMLTags(markdownParsed, settings.htmlDecode);

        if (settings.markdownSourceCode) {
            saveTo.text(markdownDoc);
        } else {
            saveTo.remove();
        }

        div.addClass("markdown-body " + this.classPrefix + "html-preview").append(markdownParsed);

        var tocContainer = (settings.tocContainer !== "") ? $(settings.tocContainer) : div;

        if (settings.tocContainer !== "") {
            tocContainer.attr("previewContainer", false);
        }

        if (settings.toc) {
            div.tocContainer = this.markdownToCRenderer(markdownToC, tocContainer, settings.tocDropdown, settings.tocStartLevel);

            if (settings.tocDropdown || div.find("." + this.classPrefix + "toc-menu").length > 0) {
                this.tocDropdownMenu(div, settings.tocTitle);
            }

            if (settings.tocContainer !== "") {
                div.find(".editormd-toc-menu, .editormd-markdown-toc").remove();
            }
        }

        if (settings.previewCodeHighlight) {
            div.find("pre").addClass("prettyprint linenums");
            prettyPrint();
        }

        if (!editormd.isIE8) {
            if (settings.flowChart) {
                div.find(".flowchart").flowChart();
            }

            if (settings.sequenceDiagram) {
                div.find(".sequence-diagram").sequenceDiagram({ theme: "simple" });
            }
        }

        if (settings.tex) {
            var katexHandle = function () {
                div.find("." + editormd.classNames.tex).each(function () {
                    var tex = $(this);
                    katex.render(tex.html().replace(/&lt;/g, "<").replace(/&gt;/g, ">"), tex[0]);
                    tex.find(".katex").css("font-size", "1.6em");
                });
            };

            if (settings.autoLoadKaTeX && !editormd.$katex && !editormd.kaTeXLoaded) {
                this.loadKaTeX(function () {
                    editormd.$katex = katex;
                    editormd.kaTeXLoaded = true;
                    katexHandle();
                });
            }
            else {
                katexHandle();
            }
        }

        div.getMarkdown = function () {
            return saveTo.val();
        };

        return div;
    },


    /**
     * 自定义marked的解析器
     * Custom Marked renderer rules
     * 
     * @param   {Array}    markdownToC     传入用于接收TOC的数组
     * @returns {Renderer} markedRenderer  返回marked的Renderer自定义对象
     */
    markedRenderer: function (markdownToC, options) {
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
    },


    /**
     *
     * 生成TOC(Table of Contents)
     * Creating ToC (Table of Contents)
     * 
     * @param   {Array}    toc             从marked获取的TOC数组列表
     * @param   {Element}  container       插入TOC的容器元素
     * @param   {Integer}  startLevel      Hx 起始层级
     * @returns {Object}   tocContainer    返回ToC列表容器层的jQuery对象元素
     */

    markdownToCRenderer: function (toc, container, tocDropdown, startLevel) {

        var html = "";
        var lastLevel = 0;
        var classPrefix = this.classPrefix;

        startLevel = startLevel || 1;

        for (var i = 0, len = toc.length; i < len; i++) {
            var text = toc[i].text;
            var level = toc[i].level;

            if (level < startLevel) {
                continue;
            }

            if (level > lastLevel) {
                html += "";
            }
            else if (level < lastLevel) {
                html += (new Array(lastLevel - level + 2)).join("</ul></li>");
            }
            else {
                html += "</ul></li>";
            }

            html += "<li><a class=\"toc-level-" + level + "\" href=\"#" + text + "\" level=\"" + level + "\">" + text + "</a><ul>";
            lastLevel = level;
        }

        var tocContainer = container.find(".markdown-toc");

        if ((tocContainer.length < 1 && container.attr("previewContainer") === "false")) {
            var tocHTML = "<div class=\"markdown-toc " + classPrefix + "markdown-toc\"></div>";

            tocHTML = (tocDropdown) ? "<div class=\"" + classPrefix + "toc-menu\">" + tocHTML + "</div>" : tocHTML;

            container.html(tocHTML);

            tocContainer = container.find(".markdown-toc");
        }

        if (tocDropdown) {
            tocContainer.wrap("<div class=\"" + classPrefix + "toc-menu\"></div><br/>");
        }

        tocContainer.html("<ul class=\"markdown-toc-list\"></ul>").children(".markdown-toc-list").html(html.replace(/\r?\n?\<ul\>\<\/ul\>/g, ""));

        return tocContainer;
    }
};

const markedProto = {

};