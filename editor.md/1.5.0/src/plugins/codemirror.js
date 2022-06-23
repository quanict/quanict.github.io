const codeMirrorPlugin = {
    $CodeMirror: null,
    codeMirrorScripts: [
        'codemirror/codemirror.min.js',
        'codemirror/modes.min.js',
        'codemirror/addons.min.js'
    ],


};

const codeMirrorProto = {
    /**
     * 配置和初始化CodeMirror组件
     * CodeMirror initialization
     * 
     * @returns {editormd}  返回editormd的实例对象
     */

    setCodeMirror: function () {
        const { settings, editor, markdownTextarea } = this;

        if (settings.editorTheme !== "default") {
            editormd.loadCSS(settings.path + "codemirror/theme/" + settings.editorTheme);
        }

        var codeMirrorConfig = {
            mode: settings.mode,
            theme: settings.editorTheme,
            tabSize: settings.tabSize,
            dragDrop: false,
            autofocus: settings.autoFocus,
            autoCloseTags: settings.autoCloseTags,
            readOnly: (settings.readOnly) ? "nocursor" : false,
            indentUnit: settings.indentUnit,
            lineNumbers: settings.lineNumbers,
            lineWrapping: settings.lineWrapping,
            lineNumWidth: 50,
            extraKeys: {
                "Ctrl-Q": function (cm) {
                    cm.foldCode(cm.getCursor());
                }
            },
            foldGutter: settings.codeFold,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
            matchBrackets: settings.matchBrackets,
            indentWithTabs: settings.indentWithTabs,
            styleActiveLine: settings.styleActiveLine,
            styleSelectedText: settings.styleSelectedText,
            autoCloseBrackets: settings.autoCloseBrackets,
            showTrailingSpace: settings.showTrailingSpace,
            highlightSelectionMatches: ((!settings.matchWordHighlight) ? false : { showToken: (settings.matchWordHighlight === "onselected") ? false : /\w/ })
        };

        const codeMirror = editormd.$CodeMirror.fromTextArea(markdownTextarea[0], codeMirrorConfig);
        const codeMirrorDom = editor.children(".CodeMirror");

        if (settings.value !== "") {
            codeMirror.setValue(settings.value);
        }

        codeMirrorDom.css({
            fontSize: settings.fontSize,
            width: (!settings.watch) ? "100%" : "50%"
        });

        if (settings.autoHeight) {
            codeMirrorDom.css("height", "auto");
            codeMirror.setOption("viewportMargin", Infinity);
        }

        if (!settings.lineNumbers) {
            codeMirrorDom.find(".CodeMirror-gutters").css("border-right", "none");
        }

        const gutter = codeMirrorDom.find(".CodeMirror-linenumber").css({ with: `45px` });
        let test = codeMirror.getGutterElement();

        this.cm = codeMirror;
        this.codeMirror = this.cmElement = codeMirrorDom;
        return this;
    },

    /**
        * 获取CodeMirror的配置选项
        * Get CodeMirror setting options
        * 
        * @returns {Mixed}                  return CodeMirror setting option value
        */

    getCodeMirrorOption: function (key) {
        return this.cm.getOption(key);
    },

    /**
     * 配置和重配置CodeMirror的选项
     * CodeMirror setting options / resettings
     * 
     * @returns {editormd}  返回editormd的实例对象
     */

    setCodeMirrorOption: function (key, value) {
        this.cm.setOption(key, value);
        return this;
    },

    codeMirrorLoaderHandler: function () {
        const _this = this;
        var settings = this.settings;

        editormd.$CodeMirror = CodeMirror;
        this.setCodeMirror();
        if (settings.mode !== "gfm" && settings.mode !== "markdown") {
            _this.loadedDisplay();
            return false;
        }

        _this.setToolbar();

        let files = editormd.markedScripts;
        if (settings.previewCodeHighlight) {
            files.push("prettify.min.js");
        }
        editormd.loadScripts(files, settings.path).then(() => {
            editormd.$marked = marked;
            _this.loadFlowChartOrSequenceDiagram();
        });
    }
};