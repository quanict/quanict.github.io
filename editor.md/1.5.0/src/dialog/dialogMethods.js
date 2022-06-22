const dialogMethods = {
    /**
        * 锁屏
        * lock screen when dialog opening
        * 
        * @returns {void}
        */

    dialogLockScreen: function () {
        var settings = this.settings || { dialogLockScreen: true };

        if (settings.dialogLockScreen) {
            $("html,body").css("overflow", "hidden");
            this.resize();
        }
    },

    /**
     * 显示透明背景层
     * Display mask layer when dialog opening
     * 
     * @param   {Object}     dialog    dialog jQuery object
     * @returns {void}
     */

    dialogShowMask: function (dialog) {
        var editor = this.editor;
        var settings = this.settings || { dialogShowMask: true };

        dialog.css({
            top: ($(window).height() - dialog.height()) / 2 + "px",
            left: ($(window).width() - dialog.width()) / 2 + "px"
        });

        if (settings.dialogShowMask) {
            editor.children("." + this.classPrefix + "mask").css("z-index", parseInt(dialog.css("z-index")) - 1).show();
        }
    },
};