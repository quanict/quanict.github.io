const loadPluginProto = {
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

        editormd.loadCSS(loadPath + "codemirror/codemirror.min");

        if (settings.searchReplace && !settings.readOnly) {
            editormd.loadCSS(loadPath + "codemirror/addon/dialog/dialog");
            editormd.loadCSS(loadPath + "codemirror/addon/search/matchesonscrollbar");
        }

        if (settings.codeFold) {
            editormd.loadCSS(loadPath + "codemirror/addon/fold/foldgutter");
        }

        editormd.loadScripts(editormd.codeMirrorScripts, settings.path)
            .then(() => {
                _this.codeMirrorLoaderHandler();
            });


        return this;
    },

    loadFlowChartOrSequenceDiagram: function () {
        var _this = this;
        var { settings } = this;

        if (editormd.isIE8) {
            _this.loadedDisplay();
            return;
        }

        if (settings.flowChart || settings.sequenceDiagram) {
            editormd.loadScripts([
                "raphael.min.js",
                "underscore.min.js"
            ], settings.path).then(() => {
                if (!settings.flowChart && settings.sequenceDiagram) {
                    editormd.loadScripts([
                        "sequence-diagram.min.js",
                    ], settings.path).then(() => {
                        _this.loadedDisplay();
                    });
                }
                else if (settings.flowChart && !settings.sequenceDiagram) {
                    editormd.loadScripts([
                        editormd.flowChartScripts
                    ], settings.path).then(() => {
                        _this.loadedDisplay();
                    });
                }
                else if (settings.flowChart && settings.sequenceDiagram) {
                    editormd.loadScripts([
                        editormd.flowChartScripts.push("sequence-diagram.min.js")
                    ], settings.path).then(() => {
                        _this.loadedDisplay();
                    });

                    // editormd.loadScript(loadPath + "flowchart.min", function () {
                    //     editormd.loadScript(loadPath + "jquery.flowchart.min", function () {
                    //         editormd.loadScript(loadPath + "", function () {
                    //             _this.loadedDisplay();
                    //         });
                    //     });
                    // });
                }
            });

            // editormd.loadScript(loadPath + "raphael.min", function () {
            //     editormd.loadScript(loadPath + "underscore.min", function () {


            //     });

            // });
        }
        else {
            _this.loadedDisplay();
        }
    },
};