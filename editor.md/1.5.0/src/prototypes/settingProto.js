const settingProto = {
    /**
     * 设置或扩展当前实例对象，单个设置
     * Extend editormd instance object, one by one
     * 
     * @param   {String|Object}   key       option key
     * @param   {String|Object}   value     option value
     * @returns {editormd}                  this(editormd instance object.)
     */

    set: function (key, value) {

        if (typeof value !== "undefined" && typeof value === "function") {
            value = $.proxy(value, this);
        }

        this[key] = value;

        return this;
    },

    /**
     * 重新配置
     * Resetting editor options
     * 
     * @param   {String|Object}   key       option key
     * @param   {String|Object}   value     option value
     * @returns {editormd}                  this(editormd instance object.)
     */

    config: function (key, value) {
        var settings = this.settings;

        if (typeof key === "object") {
            settings = $.extend(true, settings, key);
        }

        if (typeof key === "string") {
            settings[key] = value;
        }

        this.settings = settings;
        this.recreate();

        return this;
    },
};