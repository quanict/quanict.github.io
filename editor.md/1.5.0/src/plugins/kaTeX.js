const kaTexPlugin = {
    $katex: null,
    // 使用国外的CDN，加载速度有时会很慢，或者自定义URL
    // You can custom KaTeX load url.
    katexURL: {
        css: "//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.3.0/katex.min",
        js: "//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.3.0/katex.min"
    },

    kaTeXLoaded: false,

    /**
     * 加载KaTeX文件
     * load KaTeX files
     * 
     * @param {Function} [callback=function()]  加载成功后执行的回调函数
     */

    loadKaTeX: function (callback) {
        editormd.loadCSS(editormd.katexURL.css, function () {
            editormd.loadScript(editormd.katexURL.js, callback || function () { });
        });
    }
};

const katexProto = {
    /**
     * 解析TeX(KaTeX)科学公式
     * TeX(KaTeX) Renderer
     * 
     * @returns {editormd}             返回editormd的实例对象
     */

    katexRender: function () {

        if (timer === null) {
            return this;
        }

        this.previewContainer.find("." + editormd.classNames.tex).each(function () {
            var tex = $(this);
            editormd.$katex.render(tex.text(), tex[0]);

            tex.find(".katex").css("font-size", "1.6em");
        });

        return this;
    },
};