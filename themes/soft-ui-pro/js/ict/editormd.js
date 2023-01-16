(function ($) {
    const editorMdInit = function (elm, options) {
        if( typeof GITHUB_ICT_URL === 'undefined' ){
            console.error(`variable GITHUB_ICT_URL is not defined`);
            return;
        }
        const input = jQuery('textarea', elm).get(0);
        const editor = editormd(elm, {
            // width  : "100%",
            // height : "100%",
            path   : '//quanict.github.local/editor.md/1.5.0/lib/',
            autoHeight : true,
            flowChart : false, // conflict bootrap.js
            toolbar  : false,
            autoFocus:false,
            imgPath: input.dataset.imgPath ?? '/g-rs1',
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
        
    };

    $.fn.editorMdGroup = function (options) {
        if( typeof editormd === 'undefined'){
            return;
        }
        this.each(function (i, elm) {
            editorMdInit(elm, options);
        });
        return this;
    };
}(jQuery));

$(document).ready(function () {
    //$('div.editor-md-group').editorMdGroup();
});