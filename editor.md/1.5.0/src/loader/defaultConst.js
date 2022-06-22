var isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
var key = isMac ? "Cmd" : "Ctrl";

const classPrefix = 'editormd-';

const defaultConst = {
    title: "Editor.md",
    $name: "Editor.md",

    version: "1.5.0",
    homePage: "https://pandao.github.io/editor.md/",
    classPrefix: classPrefix,
    classNames: {
        tex: classPrefix + "tex"
    },
    dialogZindex: 99999,
    isIE: (navigator.appName == "Microsoft Internet Explorer"),
    isIE8: (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/8./i) == "8."),
    urls: {
        atLinkBase: "https://github.com/"
    },

    regexs: {
        atLink: /@(\w+)/g,
        email: /(\w+)@(\w+)\.(\w+)\.?(\w+)?/g,
        emailLink: /(mailto:)?([\w\.\_]+)@(\w+)\.(\w+)\.?(\w+)?/g,
        emoji: /:([\w\+-]+):/g,
        emojiDatetime: /(\d{1,2}:\d{1,2}:\d{1,2})/g,
        twemoji: /:(tw-([\w]+)-?(\w+)?):/g,
        fontAwesome: /:(fa-([\w]+)(-(\w+)){0,}):/g,
        editormdLogo: /:(editormd-logo-?(\w+)?):/g,
        pageBreak: /^\[[=]{8,}\]$/
    },

    // Emoji graphics files url path
    emoji: {
        path: "http://www.emoji-cheat-sheet.com/graphics/emojis/",
        ext: ".png"
    },

    // Twitter Emoji (Twemoji)  graphics files url path    
    twemoji: {
        path: "http://twemoji.maxcdn.com/36x36/",
        ext: ".png"
    },


    // Editor.md themes, change toolbar themes etc.
    // added @1.5.0
    themes: ["default", "dark"],

    // Preview area themes
    // added @1.5.0
    previewThemes: ["default", "dark"],

    // CodeMirror / editor area themes
    // @1.5.0 rename -> editorThemes, old version -> themes
    editorThemes: [
        "default", "3024-day", "3024-night",
        "ambiance", "ambiance-mobile",
        "base16-dark", "base16-light", "blackboard",
        "cobalt",
        "eclipse", "elegant", "erlang-dark",
        "lesser-dark",
        "mbo", "mdn-like", "midnight", "monokai",
        "neat", "neo", "night",
        "paraiso-dark", "paraiso-light", "pastel-on-dark",
        "rubyblue",
        "solarized",
        "the-matrix", "tomorrow-night-eighties", "twilight",
        "vibrant-ink",
        "xq-dark", "xq-light"
    ],

    keyMaps: {
        [key + "-1"]: "h1",
        [key + "-2"]: "h2",
        [key + "-3"]: "h3",
        [key + "-4"]: "h4",
        [key + "-5"]: "h5",
        [key + "-6"]: "h6",
        [key + "-B"]: "bold",  // if this is string ==  editormd.toolbarHandlers.xxxx
        [key + "-D"]: "datetime",

        [key + "Ctrl-E"]: function () { // emoji
            var cm = this.cm;
            var cursor = cm.getCursor();
            var selection = cm.getSelection();

            if (!this.settings.emoji) {
                alert("Error: settings.emoji == false");
                return;
            }

            cm.replaceSelection(":" + selection + ":");

            if (selection === "") {
                cm.setCursor(cursor.line, cursor.ch + 1);
            }
        },
        [key + "-Alt-G"]: "goto-line",
        [key + "-H"]: "hr",
        [key + "-I"]: "italic",
        [key + "-K"]: "code",

        "Ctrl-L": function () {
            var cm = this.cm;
            var cursor = cm.getCursor();
            var selection = cm.getSelection();

            var title = (selection === "") ? "" : " \"" + selection + "\"";

            cm.replaceSelection("[" + selection + "](" + title + ")");

            if (selection === "") {
                cm.setCursor(cursor.line, cursor.ch + 1);
            }
        },
        [key + "-U"]: "list-ul",

        "Shift-Ctrl-A": function () {
            var cm = this.cm;
            var cursor = cm.getCursor();
            var selection = cm.getSelection();

            if (!this.settings.atLink) {
                alert("Error: settings.atLink == false");
                return;
            }

            cm.replaceSelection("@" + selection);

            if (selection === "") {
                cm.setCursor(cursor.line, cursor.ch + 1);
            }
        },

        ["Shift" + key + "-C"]: "code",
        ["Shift" + key + "Q"]: "quote",
        ["Shift" + key + "S"]: "del",
        ["Shift" + key + "K"]: "tex",  // KaTeX

        "Shift-Alt-C": function () {
            var cm = this.cm;
            var cursor = cm.getCursor();
            var selection = cm.getSelection();

            cm.replaceSelection(["```", selection, "```"].join("\n"));

            if (selection === "") {
                cm.setCursor(cursor.line, cursor.ch + 3);
            }
        },

        ["Shift-" + key + "-Alt-C"]: "code-block",
        ["Shift-" + key + "-H"]: "html-entities",
        "Shift-Alt-H": "help",
        ["Shift-" + key + "-E"]: "emoji",
        ["Shift-" + key + "-U"]: "uppercase",
        "Shift-Alt-U": "ucwords",
        ["Shift-" + key + "-Alt-U"]: "ucfirst",
        "Shift-Alt-L": "lowercase",

        ["Shift-" + key + "-I"]: function () {
            var cm = this.cm;
            var cursor = cm.getCursor();
            var selection = cm.getSelection();

            var title = (selection === "") ? "" : " \"" + selection + "\"";

            cm.replaceSelection("![" + selection + "](" + title + ")");

            if (selection === "") {
                cm.setCursor(cursor.line, cursor.ch + 4);
            }
        },

        ["Shift-" + key + "-Alt-I"]: "image",
        ["Shift-" + key + "-L"]: "link",
        ["Shift-" + key + "-O"]: "list-ol",
        ["Shift-" + key + "-P"]: "preformatted-text",
        ["Shift-" + key + "-T"]: "table",
        "Shift-Alt-P": "pagebreak",
        "F9": "watch",
        "F10": "preview",
        "F11": "fullscreen",
    },

    defaults: {
        mode: "gfm",          //gfm or markdown
        name: "",             // Form element name
        value: "",             // value for CodeMirror, if mode not gfm/markdown
        theme: "",             // Editor.md self themes, before v1.5.0 is CodeMirror theme, default empty
        editorTheme: "default",      // Editor area, this is CodeMirror theme at v1.5.0
        previewTheme: "",             // Preview area theme, default empty
        markdown: "",             // Markdown source code
        appendMarkdown: "",             // if in init textarea value not empty, append markdown to textarea
        width: "100%",
        height: "100%",
        path: "./lib/",       // Dependents module file directory
        pluginPath: "",             // If this empty, default use settings.path + "../plugins/"
        delay: 300,            // Delay parse markdown to html, Uint : ms
        autoLoadModules: true,           // Automatic load dependent module files
        watch: true,
        placeholder: "Enjoy Markdown! coding now...",
        gotoLine: true,
        codeFold: false,
        autoHeight: false,
        autoFocus: true,
        autoCloseTags: true,
        searchReplace: true,
        syncScrolling: true,           // true | false | "single", default true
        readOnly: false,
        tabSize: 4,
        indentUnit: 4,
        lineNumbers: true,
        lineWrapping: true,
        autoCloseBrackets: true,
        showTrailingSpace: true,
        matchBrackets: true,
        indentWithTabs: true,
        styleSelectedText: true,
        matchWordHighlight: true,           // options: true, false, "onselected"
        styleActiveLine: true,           // Highlight the current line
        dialogLockScreen: true,
        dialogShowMask: true,
        dialogDraggable: true,
        dialogMaskBgColor: "#fff",
        dialogMaskOpacity: 0.1,
        fontSize: "13px",
        saveHTMLToTextarea: false,
        disabledKeyMaps: [],

        onload: function () { },
        onresize: function () { },
        onchange: function () { },
        onwatch: null,
        onunwatch: null,
        onpreviewing: function () { },
        onpreviewed: function () { },
        onfullscreen: function () { },
        onfullscreenExit: function () { },
        onscroll: function () { },
        onpreviewscroll: function () { },

        imageUpload: false,
        imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
        imageUploadURL: "",
        crossDomainUpload: false,
        uploadCallbackURL: "",

        toc: true,           // Table of contents
        tocm: false,           // Using [TOCM], auto create ToC dropdown menu
        tocTitle: "",             // for ToC dropdown menu btn
        tocDropdown: false,
        tocContainer: "",
        tocStartLevel: 1,              // Said from H1 to create ToC
        htmlDecode: false,          // Open the HTML tag identification 
        pageBreak: true,           // Enable parse page break [========]
        atLink: true,           // for @link
        emailLink: true,           // for email address auto link
        taskList: false,          // Enable Github Flavored Markdown task lists
        emoji: false,          // :emoji: , Support Github emoji, Twitter Emoji (Twemoji);
        // Support FontAwesome icon emoji :fa-xxx: > Using fontAwesome icon web fonts;
        // Support Editor.md logo icon emoji :editormd-logo: :editormd-logo-1x: > 1~8x;
        tex: false,          // TeX(LaTeX), based on KaTeX
        flowChart: false,          // flowChart.js only support IE9+
        sequenceDiagram: false,          // sequenceDiagram.js only support IE9+
        previewCodeHighlight: true,

        toolbar: true,           // show/hide toolbar
        toolbarAutoFixed: true,           // on window scroll auto fixed position
        toolbarIcons: "full",
        toolbarTitles: {},
        toolbarHandlers: {
            ucwords: function () {
                return editormd.toolbarHandlers.ucwords;
            },
            lowercase: function () {
                return editormd.toolbarHandlers.lowercase;
            }
        },
        toolbarCustomIcons: {               // using html tag create toolbar icon, unused default <a> tag.
            lowercase: "<a href=\"javascript:;\" title=\"Lowercase\" unselectable=\"on\"><i class=\"fa\" name=\"lowercase\" style=\"font-size:24px;margin-top: -10px;\">a</i></a>",
            "ucwords": "<a href=\"javascript:;\" title=\"ucwords\" unselectable=\"on\"><i class=\"fa\" name=\"ucwords\" style=\"font-size:20px;margin-top: -3px;\">Aa</i></a>"
        },
        toolbarIconsClass: {
            undo: "fa-undo",
            redo: "fa-repeat",
            bold: "fa-bold",
            del: "fa-strikethrough",
            italic: "fa-italic",
            quote: "fa-quote-left",
            uppercase: "fa-font",
            h1: classPrefix + "bold",
            h2: classPrefix + "bold",
            h3: classPrefix + "bold",
            h4: classPrefix + "bold",
            h5: classPrefix + "bold",
            h6: classPrefix + "bold",
            "list-ul": "fa-list-ul",
            "list-ol": "fa-list-ol",
            hr: "fa-minus",
            link: "fa-link",
            "reference-link": "fa-anchor",
            image: "fa-picture-o",
            code: "fa-code",
            "preformatted-text": "fa-file-code-o",
            "code-block": "fa-file-code-o",
            table: "fa-table",
            datetime: "fa-clock-o",
            emoji: "fa-smile-o",
            "html-entities": "fa-copyright",
            pagebreak: "fa-newspaper-o",
            "goto-line": "fa-terminal", // fa-crosshairs
            watch: "fa-eye-slash",
            unwatch: "fa-eye",
            preview: "fa-desktop",
            search: "fa-search",
            fullscreen: "fa-arrows-alt",
            clear: "fa-eraser",
            help: "fa-question-circle",
            info: "fa-info-circle"
        },
        toolbarIconTexts: {},

        lang: {
            name: "zh-cn",
            description: "开源在线Markdown编辑器<br/>Open source online Markdown editor.",
            tocTitle: "目录",
            toolbar: {
                undo: "撤销（Ctrl+Z）",
                redo: "重做（Ctrl+Y）",
                bold: "粗体",
                del: "删除线",
                italic: "斜体",
                quote: "引用",
                ucwords: "将每个单词首字母转成大写",
                uppercase: "将所选转换成大写",
                lowercase: "将所选转换成小写",
                h1: "标题1",
                h2: "标题2",
                h3: "标题3",
                h4: "标题4",
                h5: "标题5",
                h6: "标题6",
                "list-ul": "无序列表",
                "list-ol": "有序列表",
                hr: "横线",
                link: "链接",
                "reference-link": "引用链接",
                image: "添加图片",
                code: "行内代码",
                "preformatted-text": "预格式文本 / 代码块（缩进风格）",
                "code-block": "代码块（多语言风格）",
                table: "添加表格",
                datetime: "日期时间",
                emoji: "Emoji表情",
                "html-entities": "HTML实体字符",
                pagebreak: "插入分页符",
                "goto-line": "跳转到行",
                watch: "关闭实时预览",
                unwatch: "开启实时预览",
                preview: "全窗口预览HTML（按 Shift + ESC还原）",
                fullscreen: "全屏（按ESC还原）",
                clear: "清空",
                search: "搜索",
                help: "使用帮助",
                info: "关于" + this.title
            },
            buttons: {
                enter: "确定",
                cancel: "取消",
                close: "关闭"
            },
            dialog: {
                link: {
                    title: "添加链接",
                    url: "链接地址",
                    urlTitle: "链接标题",
                    urlEmpty: "错误：请填写链接地址。"
                },
                referenceLink: {
                    title: "添加引用链接",
                    name: "引用名称",
                    url: "链接地址",
                    urlId: "链接ID",
                    urlTitle: "链接标题",
                    nameEmpty: "错误：引用链接的名称不能为空。",
                    idEmpty: "错误：请填写引用链接的ID。",
                    urlEmpty: "错误：请填写引用链接的URL地址。"
                },
                image: {
                    title: "添加图片",
                    url: "图片地址",
                    link: "图片链接",
                    alt: "图片描述",
                    uploadButton: "本地上传",
                    imageURLEmpty: "错误：图片地址不能为空。",
                    uploadFileEmpty: "错误：上传的图片不能为空。",
                    formatNotAllowed: "错误：只允许上传图片文件，允许上传的图片文件格式有："
                },
                preformattedText: {
                    title: "添加预格式文本或代码块",
                    emptyAlert: "错误：请填写预格式文本或代码的内容。"
                },
                codeBlock: {
                    title: "添加代码块",
                    selectLabel: "代码语言：",
                    selectDefaultText: "请选择代码语言",
                    otherLanguage: "其他语言",
                    unselectedLanguageAlert: "错误：请选择代码所属的语言类型。",
                    codeEmptyAlert: "错误：请填写代码内容。"
                },
                htmlEntities: {
                    title: "HTML 实体字符"
                },
                help: {
                    title: "使用帮助"
                }
            }
        }
    },

    toolbarModes: {
        full: [
            "undo", "redo", "|",
            "bold", "del", "italic", "quote", "ucwords", "uppercase", "lowercase", "|",
            "h1", "h2", "h3", "h4", "h5", "h6", "|",
            "list-ul", "list-ol", "hr", "|",
            "link", "reference-link", "image", "code", "preformatted-text", "code-block", "table", "datetime", "emoji", "html-entities", "pagebreak", "|",
            "goto-line", "watch", "preview", "fullscreen", "clear", "search", "|",
            "help", "info"
        ],
        simple: [
            "undo", "redo", "|",
            "bold", "del", "italic", "quote", "uppercase", "lowercase", "|",
            "h1", "h2", "h3", "h4", "h5", "h6", "|",
            "list-ul", "list-ol", "hr", "|",
            "watch", "preview", "fullscreen", "|",
            "help", "info"
        ],
        mini: [
            "undo", "redo", "|",
            "watch", "preview", "|",
            "help", "info"
        ]
    },
};