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
};