const keyboardProto = {
    /**
     * 跳转到指定的行
     * Goto CodeMirror line
     * 
     * @param   {String|Intiger}   line      line number or "first"|"last"
     * @returns {editormd}                   返回editormd的实例对象
     */

    gotoLine: function (line) {

        var settings = this.settings;

        if (!settings.gotoLine) {
            return this;
        }

        var cm = this.cm;
        var editor = this.editor;
        var count = cm.lineCount();
        var preview = this.preview;

        if (typeof line === "string") {
            if (line === "last") {
                line = count;
            }

            if (line === "first") {
                line = 1;
            }
        }

        if (typeof line !== "number") {
            alert("Error: The line number must be an integer.");
            return this;
        }

        line = parseInt(line) - 1;

        if (line > count) {
            alert("Error: The line number range 1-" + count);

            return this;
        }

        cm.setCursor({ line: line, ch: 0 });

        var scrollInfo = cm.getScrollInfo();
        var clientHeight = scrollInfo.clientHeight;
        var coords = cm.charCoords({ line: line, ch: 0 }, "local");

        cm.scrollTo(null, (coords.top + coords.bottom - clientHeight) / 2);

        if (settings.watch) {
            var cmScroll = this.codeMirror.find(".CodeMirror-scroll")[0];
            var height = $(cmScroll).height();
            var scrollTop = cmScroll.scrollTop;
            var percent = (scrollTop / cmScroll.scrollHeight);

            if (scrollTop === 0) {
                preview.scrollTop(0);
            }
            else if (scrollTop + height >= cmScroll.scrollHeight - 16) {
                preview.scrollTop(preview[0].scrollHeight);
            }
            else {
                preview.scrollTop(preview[0].scrollHeight * percent);
            }
        }

        cm.focus();

        return this;
    },

    /**
     * 移除 CodeMirror 键盘快捷键
     * Remove CodeMirror keyboard shortcuts key map
     * 
     * @returns {editormd}  返回editormd的实例对象
     */

    removeKeyMap: function (map) {
        this.cm.removeKeyMap(map);

        return this;
    },

    /**
     * 添加 CodeMirror 键盘快捷键
     * Add CodeMirror keyboard shortcuts key map
     * 
     * @returns {editormd}  返回editormd的实例对象
     */

    addKeyMap: function (map, bottom) {
        this.cm.addKeyMap(map, bottom);

        return this;
    },

    /**
    * 注册键盘快捷键处理
    * Register CodeMirror keyMaps (keyboard shortcuts).
    * 
    * @param   {Object}    keyMap      KeyMap key/value {"(Ctrl/Shift/Alt)-Key" : function(){}}
    * @returns {editormd}              return this
    */

    registerKeyMaps: function (keyMap) {

        var _this = this;
        var cm = this.cm;
        var settings = this.settings;
        var toolbarHandlers = editormd.toolbarHandlers;
        var disabledKeyMaps = settings.disabledKeyMaps;

        keyMap = keyMap || null;

        if (keyMap) {
            for (var i in keyMap) {
                if ($.inArray(i, disabledKeyMaps) < 0) {
                    var map = {};
                    map[i] = keyMap[i];

                    cm.addKeyMap(keyMap);
                }
            }
        }
        else {
            for (var k in editormd.keyMaps) {
                var _keyMap = editormd.keyMaps[k];
                var handle = (typeof _keyMap === "string") ? $.proxy(toolbarHandlers[_keyMap], _this) : $.proxy(_keyMap, _this);

                if ($.inArray(k, ["F9", "F10", "F11"]) < 0 && $.inArray(k, disabledKeyMaps) < 0) {
                    var _map = {};
                    _map[k] = handle;

                    cm.addKeyMap(_map);
                }
            }

            $(window).keydown(function (event) {

                var keymaps = {
                    "120": "F9",
                    "121": "F10",
                    "122": "F11"
                };

                if ($.inArray(keymaps[event.keyCode], disabledKeyMaps) < 0) {
                    switch (event.keyCode) {
                        case 120:
                            $.proxy(toolbarHandlers["watch"], _this)();
                            return false;
                            break;

                        case 121:
                            $.proxy(toolbarHandlers["preview"], _this)();
                            return false;
                            break;

                        case 122:
                            $.proxy(toolbarHandlers["fullscreen"], _this)();
                            return false;
                            break;

                        default:
                            break;
                    }
                }
            });
        }

        return this;
    },
}