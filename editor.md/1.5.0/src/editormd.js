; (function (factory) {
    "use strict";

    // CommonJS/Node.js
    if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
        module.exports = factory;
    }
    else if (typeof define === "function")  // AMD/CMD/Sea.js
    {
        if (define.amd) // for Require.js
        {
            /* Require.js define replace */
        }
        else {
            define(["jquery"], factory);  // for Sea.js
        }
    }
    else {
        window.editormd = factory();
    }

}(function () {

    /* Require.js assignment replace */

    "use strict";

    var $ = (typeof (jQuery) !== "undefined") ? jQuery : Zepto;

    if (typeof ($) === "undefined") {
        return;
    }

    /**
     * editormd
     * 
     * @param   {String} id           编辑器的ID
     * @param   {Object} options      配置选项 Key/Value
     * @returns {Object} editormd     返回editormd对象
     */

    var editormd = function (id, options) {
        return new editormd.fn.init(id, options);
    };

    editormd.appendMethod = mdUtil.appendMethod;
    editormd.appendPrototype = mdUtil.appendPrototype;

    editormd.prototype = editormd.fn = {
        state: {
            watching: false,
            loaded: false,
            preview: false,
            fullscreen: false
        },

        /**
         * 构造函数/实例初始化
         * Constructor / instance initialization
         * 
         * @param   {String}   id            编辑器的ID
         * @param   {Object}   [options={}]  配置选项 Key/Value
         * @returns {editormd}               返回editormd的实例对象
         */

        init: function (id, options) {

            options = options || {};

            // if (typeof id === "object")
            // {
            //     options = id;
            // }

            var _this = this;
            var classPrefix = this.classPrefix = editormd.classPrefix;
            var settings = this.settings = $.extend(true, editormd.defaults, options);

            jQuery('script[src]').each(function (i, elm) {
                let src = elm.src;
                src = src.split('?')[0];
                if (src.endsWith("editormd.min.js")) {
                    settings['path'] = src.split('/js/editormd.min.js')[0] + '/lib/';
                }
            });
            let editor;

            if (id instanceof HTMLTextAreaElement) {
                const container = jQuery(id).parent('div');
                let element = jQuery('<div/>', { class: "editormd" }).append(id);
                container.append(element);
                editor = this.editor = jQuery(element);
                id = settings.id;
            } else if (id instanceof HTMLElement) {
                let element = id;
                editor = this.editor = $(element);
                id = element.id.length > 0 ? element.id : settings.id;
            } else {
                id = (typeof id === "object") ? settings.id : id;
                editor = this.editor = $("#" + id);
            }

            this.id = id;
            this.lang = settings.lang;

            var classNames = this.classNames = {
                textarea: {
                    html: classPrefix + "html-textarea",
                    markdown: classPrefix + "markdown-textarea"
                }
            };

            settings.pluginPath = (settings.pluginPath === "") ? settings.path + "../plugins/" : settings.pluginPath;

            this.state.watching = (settings.watch) ? true : false;

            if (!editor.hasClass("editormd")) {
                editor.addClass("editormd");
            }

            editor.css({
                width: (typeof settings.width === "number") ? settings.width + "px" : settings.width,
                height: (typeof settings.height === "number") ? settings.height + "px" : settings.height
            });

            if (settings.autoHeight) {
                editor.css("height", "auto");
            }

            var markdownTextarea = this.markdownTextarea = editor.children("textarea");

            if (markdownTextarea.length < 1) {
                editor.append("<textarea></textarea>");
                markdownTextarea = this.markdownTextarea = editor.children("textarea");
            }

            markdownTextarea.addClass(classNames.textarea.markdown).attr("placeholder", settings.placeholder);

            if (typeof markdownTextarea.attr("name") === "undefined" || markdownTextarea.attr("name") === "") {
                markdownTextarea.attr("name", (settings.name !== "") ? settings.name : id + "-markdown-doc");
            }

            if (typeof markdownTextarea.get(0).dataset.imgPath !== 'undefined') {
                settings.imgPath = markdownTextarea.get(0).dataset.imgPath;
            }

            var appendElements = [
                (!settings.readOnly) ? "<a href=\"javascript:;\" class=\"fa fa-close " + classPrefix + "preview-close-btn\"></a>" : "",
                ((settings.saveHTMLToTextarea) ? "<textarea class=\"" + classNames.textarea.html + "\" name=\"" + id + "-html-code\"></textarea>" : ""),
                "<div class=\"" + classPrefix + "preview\"><div class=\"markdown-body " + classPrefix + "preview-container\"></div></div>",
                "<div class=\"" + classPrefix + "container-mask\" style=\"display:block;\"></div>",
                "<div class=\"" + classPrefix + "mask\"></div>"
            ].join("\n");

            editor.append(appendElements).addClass(classPrefix + "vertical");

            if (settings.theme !== "") {
                editor.addClass(classPrefix + "theme-" + settings.theme);
            }

            this.mask = editor.children("." + classPrefix + "mask");
            this.containerMask = editor.children("." + classPrefix + "container-mask");

            if (settings.markdown !== "") {
                markdownTextarea.val(settings.markdown);
            }

            if (settings.appendMarkdown !== "") {
                markdownTextarea.val(markdownTextarea.val() + settings.appendMarkdown);
            }

            this.htmlTextarea = editor.children("." + classNames.textarea.html);
            this.preview = editor.children("." + classPrefix + "preview");
            this.previewContainer = this.preview.children("." + classPrefix + "preview-container");

            if (settings.previewTheme !== "") {
                this.preview.addClass(classPrefix + "preview-theme-" + settings.previewTheme);
            }

            if (typeof define === "function" && define.amd) {
                if (typeof katex !== "undefined") {
                    editormd.$katex = katex;
                }

                if (settings.searchReplace && !settings.readOnly) {
                    editormd.loadCSS(settings.path + "codemirror/addon/dialog/dialog");
                    editormd.loadCSS(settings.path + "codemirror/addon/search/matchesonscrollbar");
                }
            }

            if ((typeof define === "function" && define.amd) || !settings.autoLoadModules) {
                if (typeof CodeMirror !== "undefined") {
                    editormd.$CodeMirror = CodeMirror;
                }

                if (typeof marked !== "undefined") {
                    editormd.$marked = marked;
                }

                this.setCodeMirror().setToolbar().loadedDisplay();
            }
            else {
                this.loadQueues();
            }

            editormd.settings = settings;
            return this;
        },

        /**
         * 所需组件加载队列
         * Required components loading queue
         * 
         * @returns {editormd}  返回editormd的实例对象
         */

        loadQueues: function () {
            var _this = this;
            var settings = this.settings;
            var loadPath = settings.path;

            var loadFlowChartOrSequenceDiagram = function () {

                if (editormd.isIE8) {
                    _this.loadedDisplay();

                    return;
                }

                if (settings.flowChart || settings.sequenceDiagram) {
                    editormd.loadScript(loadPath + "raphael.min", function () {

                        editormd.loadScript(loadPath + "underscore.min", function () {

                            if (!settings.flowChart && settings.sequenceDiagram) {
                                editormd.loadScript(loadPath + "sequence-diagram.min", function () {
                                    _this.loadedDisplay();
                                });
                            }
                            else if (settings.flowChart && !settings.sequenceDiagram) {
                                editormd.loadScript(loadPath + "flowchart.min", function () {
                                    editormd.loadScript(loadPath + "jquery.flowchart.min", function () {
                                        _this.loadedDisplay();
                                    });
                                });
                            }
                            else if (settings.flowChart && settings.sequenceDiagram) {
                                editormd.loadScript(loadPath + "flowchart.min", function () {
                                    editormd.loadScript(loadPath + "jquery.flowchart.min", function () {
                                        editormd.loadScript(loadPath + "sequence-diagram.min", function () {
                                            _this.loadedDisplay();
                                        });
                                    });
                                });
                            }
                        });

                    });
                }
                else {
                    _this.loadedDisplay();
                }
            };

            editormd.loadCSS(loadPath + "codemirror/codemirror.min");

            if (settings.searchReplace && !settings.readOnly) {
                editormd.loadCSS(loadPath + "codemirror/addon/dialog/dialog");
                editormd.loadCSS(loadPath + "codemirror/addon/search/matchesonscrollbar");
            }

            if (settings.codeFold) {
                editormd.loadCSS(loadPath + "codemirror/addon/fold/foldgutter");
            }

            editormd.loadScript(loadPath + "codemirror/codemirror.min", function () {
                editormd.$CodeMirror = CodeMirror;

                editormd.loadScript(loadPath + "codemirror/modes.min", function () {

                    editormd.loadScript(loadPath + "codemirror/addons.min", function () {

                        _this.setCodeMirror();

                        if (settings.mode !== "gfm" && settings.mode !== "markdown") {
                            _this.loadedDisplay();

                            return false;
                        }

                        _this.setToolbar();

                        editormd.loadScript(loadPath + "marked.min", function () {

                            editormd.$marked = marked;

                            if (settings.previewCodeHighlight) {
                                editormd.loadScript(loadPath + "prettify.min", function () {
                                    loadFlowChartOrSequenceDiagram();
                                });
                            }
                            else {
                                loadFlowChartOrSequenceDiagram();
                            }
                        });

                    });

                });

            });

            return this;
        },


        /**
         * 扩展当前实例对象，可同时设置多个或者只设置一个
         * Extend editormd instance object, can mutil setting.
         * 
         * @returns {editormd}                  this(editormd instance object.)
         */

        extend: function () {
            if (typeof arguments[1] !== "undefined") {
                if (typeof arguments[1] === "function") {
                    arguments[1] = $.proxy(arguments[1], this);
                }

                this[arguments[0]] = arguments[1];
            }

            if (typeof arguments[0] === "object" && typeof arguments[0].length === "undefined") {
                $.extend(true, this, arguments[0]);
            }

            return this;
        },

        /**
         * 加载并执行插件
         * Load and execute the plugin
         * 
         * @param   {String}     name    plugin name / function name
         * @param   {String}     path    plugin load path
         * @returns {editormd}           返回editormd的实例对象
         */

        executePlugin: function (name, path) {

            var _this = this;
            var cm = this.cm;
            var settings = this.settings;

            path = settings.pluginPath + path;

            if (typeof define === "function") {
                if (typeof this[name] === "undefined") {
                    alert("Error: " + name + " plugin is not found, you are not load this plugin.");

                    return this;
                }

                this[name](cm);

                return this;
            }

            if ($.inArray(path, editormd.loadFiles.plugin) < 0) {
                editormd.loadPlugin(path, function () {
                    editormd.loadPlugins[name] = _this[name];
                    _this[name](cm);
                });
            }
            else {
                $.proxy(editormd.loadPlugins[name], this)(cm);
            }

            return this;
        },

    };

    editormd.fn.init.prototype = editormd.fn;

    editormd.appendPrototype(eventProto);
    editormd.appendPrototype(cursorProto);
    editormd.appendPrototype(keyboardProto);
    editormd.appendPrototype(resizeProto);
    editormd.appendPrototype(searchProto);
    editormd.appendPrototype(previewProto);
    editormd.appendPrototype(displayProto);
    editormd.appendPrototype(watchProto);
    editormd.appendPrototype(settingProto);


    editormd.appendPrototype(themeProto);
    editormd.appendPrototype(dialogProto);
    editormd.appendPrototype(toolbarProto);
    editormd.appendPrototype(selectionProto)

    editormd.toolbarHandlers = {
        undo: function () {
            this.cm.undo();
        },

        redo: function () {
            this.cm.redo();
        },

        bold: function () {
            var cm = this.cm;
            var cursor = cm.getCursor();
            var selection = cm.getSelection();

            cm.replaceSelection("**" + selection + "**");

            if (selection === "") {
                cm.setCursor(cursor.line, cursor.ch + 2);
            }
        },

        del: function () {
            var cm = this.cm;
            var cursor = cm.getCursor();
            var selection = cm.getSelection();

            cm.replaceSelection("~~" + selection + "~~");

            if (selection === "") {
                cm.setCursor(cursor.line, cursor.ch + 2);
            }
        },

        italic: function () {
            var cm = this.cm;
            var cursor = cm.getCursor();
            var selection = cm.getSelection();

            cm.replaceSelection("*" + selection + "*");

            if (selection === "") {
                cm.setCursor(cursor.line, cursor.ch + 1);
            }
        },

        quote: function () {
            var cm = this.cm;
            var cursor = cm.getCursor();
            var selection = cm.getSelection();

            if (cursor.ch !== 0) {
                cm.setCursor(cursor.line, 0);
                cm.replaceSelection("> " + selection);
                cm.setCursor(cursor.line, cursor.ch + 2);
            }
            else {
                cm.replaceSelection("> " + selection);
            }

            //cm.replaceSelection("> " + selection);
            //cm.setCursor(cursor.line, (selection === "") ? cursor.ch + 2 : cursor.ch + selection.length + 2);
        },

        ucfirst: function () {
            var cm = this.cm;
            var selection = cm.getSelection();
            var selections = cm.listSelections();

            cm.replaceSelection(editormd.firstUpperCase(selection));
            cm.setSelections(selections);
        },

        ucwords: function () {
            var cm = this.cm;
            var selection = cm.getSelection();
            var selections = cm.listSelections();

            cm.replaceSelection(editormd.wordsFirstUpperCase(selection));
            cm.setSelections(selections);
        },

        uppercase: function () {
            var cm = this.cm;
            var selection = cm.getSelection();
            var selections = cm.listSelections();

            cm.replaceSelection(selection.toUpperCase());
            cm.setSelections(selections);
        },

        lowercase: function () {
            var cm = this.cm;
            var cursor = cm.getCursor();
            var selection = cm.getSelection();
            var selections = cm.listSelections();

            cm.replaceSelection(selection.toLowerCase());
            cm.setSelections(selections);
        },

        h1: function () {
            var cm = this.cm;
            var cursor = cm.getCursor();
            var selection = cm.getSelection();

            if (cursor.ch !== 0) {
                cm.setCursor(cursor.line, 0);
                cm.replaceSelection("# " + selection);
                cm.setCursor(cursor.line, cursor.ch + 2);
            }
            else {
                cm.replaceSelection("# " + selection);
            }
        },

        h2: function () {
            var cm = this.cm;
            var cursor = cm.getCursor();
            var selection = cm.getSelection();

            if (cursor.ch !== 0) {
                cm.setCursor(cursor.line, 0);
                cm.replaceSelection("## " + selection);
                cm.setCursor(cursor.line, cursor.ch + 3);
            }
            else {
                cm.replaceSelection("## " + selection);
            }
        },

        h3: function () {
            var cm = this.cm;
            var cursor = cm.getCursor();
            var selection = cm.getSelection();

            if (cursor.ch !== 0) {
                cm.setCursor(cursor.line, 0);
                cm.replaceSelection("### " + selection);
                cm.setCursor(cursor.line, cursor.ch + 4);
            }
            else {
                cm.replaceSelection("### " + selection);
            }
        },

        h4: function () {
            var cm = this.cm;
            var cursor = cm.getCursor();
            var selection = cm.getSelection();

            if (cursor.ch !== 0) {
                cm.setCursor(cursor.line, 0);
                cm.replaceSelection("#### " + selection);
                cm.setCursor(cursor.line, cursor.ch + 5);
            }
            else {
                cm.replaceSelection("#### " + selection);
            }
        },

        h5: function () {
            var cm = this.cm;
            var cursor = cm.getCursor();
            var selection = cm.getSelection();

            if (cursor.ch !== 0) {
                cm.setCursor(cursor.line, 0);
                cm.replaceSelection("##### " + selection);
                cm.setCursor(cursor.line, cursor.ch + 6);
            }
            else {
                cm.replaceSelection("##### " + selection);
            }
        },

        h6: function () {
            var cm = this.cm;
            var cursor = cm.getCursor();
            var selection = cm.getSelection();

            if (cursor.ch !== 0) {
                cm.setCursor(cursor.line, 0);
                cm.replaceSelection("###### " + selection);
                cm.setCursor(cursor.line, cursor.ch + 7);
            }
            else {
                cm.replaceSelection("###### " + selection);
            }
        },

        "list-ul": function () {
            var cm = this.cm;
            var cursor = cm.getCursor();
            var selection = cm.getSelection();

            if (selection === "") {
                cm.replaceSelection("- " + selection);
            }
            else {
                var selectionText = selection.split("\n");

                for (var i = 0, len = selectionText.length; i < len; i++) {
                    selectionText[i] = (selectionText[i] === "") ? "" : "- " + selectionText[i];
                }

                cm.replaceSelection(selectionText.join("\n"));
            }
        },

        "list-ol": function () {
            var cm = this.cm;
            var cursor = cm.getCursor();
            var selection = cm.getSelection();

            if (selection === "") {
                cm.replaceSelection("1. " + selection);
            }
            else {
                var selectionText = selection.split("\n");

                for (var i = 0, len = selectionText.length; i < len; i++) {
                    selectionText[i] = (selectionText[i] === "") ? "" : (i + 1) + ". " + selectionText[i];
                }

                cm.replaceSelection(selectionText.join("\n"));
            }
        },

        hr: function () {
            var cm = this.cm;
            var cursor = cm.getCursor();
            var selection = cm.getSelection();

            cm.replaceSelection(((cursor.ch !== 0) ? "\n\n" : "\n") + "------------\n\n");
        },

        tex: function () {
            if (!this.settings.tex) {
                alert("settings.tex === false");
                return this;
            }

            var cm = this.cm;
            var cursor = cm.getCursor();
            var selection = cm.getSelection();

            cm.replaceSelection("$$" + selection + "$$");

            if (selection === "") {
                cm.setCursor(cursor.line, cursor.ch + 2);
            }
        },

        link: function () {
            this.executePlugin("linkDialog", "link-dialog/link-dialog");
        },

        "reference-link": function () {
            this.executePlugin("referenceLinkDialog", "reference-link-dialog/reference-link-dialog");
        },

        pagebreak: function () {
            if (!this.settings.pageBreak) {
                alert("settings.pageBreak === false");
                return this;
            }

            var cm = this.cm;
            var selection = cm.getSelection();

            cm.replaceSelection("\r\n[========]\r\n");
        },

        image: function () {
            this.executePlugin("imageDialog", "image-dialog/image-dialog");
        },

        code: function () {
            var cm = this.cm;
            var cursor = cm.getCursor();
            var selection = cm.getSelection();

            cm.replaceSelection("`" + selection + "`");

            if (selection === "") {
                cm.setCursor(cursor.line, cursor.ch + 1);
            }
        },

        "code-block": function () {
            this.executePlugin("codeBlockDialog", "code-block-dialog/code-block-dialog");
        },

        "preformatted-text": function () {
            this.executePlugin("preformattedTextDialog", "preformatted-text-dialog/preformatted-text-dialog");
        },

        table: function () {
            this.executePlugin("tableDialog", "table-dialog/table-dialog");
        },

        datetime: function () {
            var cm = this.cm;
            var selection = cm.getSelection();
            var date = new Date();
            var langName = this.settings.lang.name;
            var datefmt = editormd.dateFormat() + " " + editormd.dateFormat((langName === "zh-cn" || langName === "zh-tw") ? "cn-week-day" : "week-day");

            cm.replaceSelection(datefmt);
        },

        emoji: function () {
            this.executePlugin("emojiDialog", "emoji-dialog/emoji-dialog");
        },

        "html-entities": function () {
            this.executePlugin("htmlEntitiesDialog", "html-entities-dialog/html-entities-dialog");
        },

        "goto-line": function () {
            this.executePlugin("gotoLineDialog", "goto-line-dialog/goto-line-dialog");
        },

        watch: function () {
            this[this.settings.watch ? "unwatch" : "watch"]();
        },

        preview: function () {
            this.previewing();
        },

        fullscreen: function () {
            this.fullscreen();
        },

        clear: function () {
            this.clear();
        },

        search: function () {
            this.search();
        },

        help: function () {
            this.executePlugin("helpDialog", "help-dialog/help-dialog");
        },

        info: function () {
            this.showInfoDialog();
        }
    };

    editormd.appendMethod(dialogMethods)

    editormd.trim = trim;
    editormd.ucwords = editormd.wordsFirstUpperCase = ucwords;
    editormd.firstUpperCase = editormd.ucfirst = firstUpperCase;
    editormd.markedRenderer = markedRenderer;
    editormd.markdownToCRenderer = markdownToCRenderer;
    editormd.tocDropdownMenu = tocDropdownMenu;
    editormd.filterHTMLTags = filterHTMLTags


    editormd.loadPlugins = {};

    editormd.loadFiles = {
        js: [],
        css: [],
        plugin: []
    };

    editormd.loadPlugin = loadPlugin;
    editormd.loadCSS = loadCSS
    editormd.loadScript = loadScript


    editormd.appendMethod(markedPlugin);

    editormd.appendMethod(kaTexPlugin);
    editormd.appendPrototype(katexProto);

    editormd.appendMethod(codeMirrorPlugin);
    editormd.appendPrototype(codeMirrorProto);

    editormd.appendPrototype(flowChartProto);

    editormd.appendPrototype(prettyPrintProto);

    editormd.appendMethod(defaultConst);


    /**
     * 锁屏
     * lock screen
     * 
     * @param   {Boolean}   lock   Boolean 布尔值，是否锁屏
     * @returns {void}
     */

    editormd.lockScreen = function (lock) {
        $("html,body").css("overflow", (lock) ? "hidden" : "");
    };

    editormd.createDialog = createDialog;
    editormd.mouseOrTouch = mouseOrTouch;

    editormd.appendMethod(editorDate);

    console.log(`=================`, { editormd })

    return editormd;

}));

jQuery(document).ready(function () {
    jQuery('textarea[data-role="editor-md"]').each(function (index, input) {
        const editor = editormd(input, {
            // width  : "100%",
            // height : "100%",
            //path: '//quanict.github.local/editor.md/1.5.0/lib/',
            autoHeight: true,
            flowChart: false, // conflict bootrap.js
            toolbar: false,
            autoFocus: false,
            imgPath: input.dataset.imgPath ?? '/ict-rs1',
            // onpreviewing : function() {
            //     console.log('onpreviewing', this);
            // },
            // onpreviewed:()=>{
            //     console.warn("on onpreviewed")
            // },
            // onwatch : function() {
            //     console.log("onwatch =>", this, this.id, this.settings);
            // },
            // onload : function() {
            //     jQuery('img',this.preview).updateImageStoragePath();
            //
            // },
            // onchange : function() {
            //     jQuery('img',this.preview).updateImageStoragePath();
            // }
        });
    });
});