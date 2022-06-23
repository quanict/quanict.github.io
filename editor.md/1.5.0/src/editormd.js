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
    editormd.appendMethod(dialogMethods);
    editormd.appendMethod(loaderProp);
    editormd.appendPrototype(loadPluginProto);


    editormd.toolbarHandlers = toolbarHandlers;
    editormd.trim = trim;
    editormd.ucwords = editormd.wordsFirstUpperCase = ucwords;
    editormd.firstUpperCase = editormd.ucfirst = firstUpperCase;
    editormd.tocDropdownMenu = tocDropdownMenu;
    editormd.filterHTMLTags = filterHTMLTags


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
            //toolbar: false,
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