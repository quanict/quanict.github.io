const displayProto = {
    /**
     * 显示编辑器
     * Show editor
     * 
     * @param   {Function} [callback=function()] 回调函数
     * @returns {editormd}                       返回editormd的实例对象
     */

    show: function (callback) {
        callback = callback || function () { };

        var _this = this;
        this.editor.show(0, function () {
            $.proxy(callback, _this)();
        });

        return this;
    },

    /**
     * 隐藏编辑器
     * Hide editor
     * 
     * @param   {Function} [callback=function()] 回调函数
     * @returns {editormd}                       返回editormd的实例对象
     */

    hide: function (callback) {
        callback = callback || function () { };

        var _this = this;
        this.editor.hide(0, function () {
            $.proxy(callback, _this)();
        });

        return this;
    },

    /**
     * 加载队列完成之后的显示处理
     * Display handle of the module queues loaded after.
     * 
     * @param   {Boolean}   recreate   是否为重建编辑器
     * @returns {editormd}             返回editormd的实例对象
     */

    loadedDisplay: function (recreate) {

        recreate = recreate || false;

        var _this = this;
        var editor = this.editor;
        var preview = this.preview;
        var settings = this.settings;

        this.containerMask.hide();

        this.save();

        if (settings.watch) {
            preview.show();
        }

        editor.data("oldWidth", editor.width()).data("oldHeight", editor.height()); // 为了兼容Zepto

        this.resize();
        this.registerKeyMaps();

        $(window).resize(function () {
            _this.resize();
        });

        this.bindScrollEvent().bindChangeEvent();

        if (!recreate) {
            $.proxy(settings.onload, this)();
        }

        this.state.loaded = true;

        return this;
    },

    /**
    * 锁屏
    * lock screen
    * 
    * @param   {Boolean}    lock    Boolean 布尔值，是否锁屏
    * @returns {editormd}           返回editormd的实例对象
    */

    lockScreen: function (lock) {
        editormd.lockScreen(lock);
        this.resize();

        return this;
    },

    /**
     * 编辑器全屏显示
     * Fullscreen show
     * 
     * @returns {editormd}         返回editormd的实例对象
     */

    fullscreen: function () {

        var _this = this;
        var state = this.state;
        var editor = this.editor;
        var preview = this.preview;
        var toolbar = this.toolbar;
        var settings = this.settings;
        var fullscreenClass = this.classPrefix + "fullscreen";

        if (toolbar) {
            toolbar.find(".fa[name=fullscreen]").parent().toggleClass("active");
        }

        var escHandle = function (event) {
            if (!event.shiftKey && event.keyCode === 27) {
                if (state.fullscreen) {
                    _this.fullscreenExit();
                }
            }
        };

        if (!editor.hasClass(fullscreenClass)) {
            state.fullscreen = true;

            $("html,body").css("overflow", "hidden");

            editor.css({
                width: $(window).width(),
                height: $(window).height()
            }).addClass(fullscreenClass);

            this.resize();

            $.proxy(settings.onfullscreen, this)();

            $(window).bind("keyup", escHandle);
        }
        else {
            $(window).unbind("keyup", escHandle);
            this.fullscreenExit();
        }

        return this;
    },

    /**
     * 编辑器退出全屏显示
     * Exit fullscreen state
     * 
     * @returns {editormd}         返回editormd的实例对象
     */

    fullscreenExit: function () {

        var editor = this.editor;
        var settings = this.settings;
        var toolbar = this.toolbar;
        var fullscreenClass = this.classPrefix + "fullscreen";

        this.state.fullscreen = false;

        if (toolbar) {
            toolbar.find(".fa[name=fullscreen]").parent().removeClass("active");
        }

        $("html,body").css("overflow", "");

        editor.css({
            width: editor.data("oldWidth"),
            height: editor.data("oldHeight")
        }).removeClass(fullscreenClass);

        this.resize();

        $.proxy(settings.onfullscreenExit, this)();

        return this;
    },
}