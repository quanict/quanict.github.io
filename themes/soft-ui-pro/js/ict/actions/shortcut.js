(function ($) {
    $.fn.shortcutHandler = function (options) {
        this.each(function (i, element) {
            const str = element.dataset.shortcut;
            jQuery(element).html('');
            const keys = str.split('+');
            keys.map((key, i)=>{
                jQuery(element).append(`<kbd>${key}</kbd>`);
                if( i < keys.length -1 ){
                    jQuery(element).append(`<i class="kbd-space" >+</i>`);
                }
            })
        });

        $(document).keydown(function (e) {
            const shortcut = jQuery(e.target).closest('.form-group').find('[data-shortcut]');
            if(shortcut.length > 0 ){
                const keys = shortcut.attr('data-shortcut').split('+');
                if(
                    (
                        (keys.indexOf('ctr') > -1 && e.ctrlKey === true)
                     || (keys.indexOf('alt') > -1 && e.altKey === true)
                    )
                    && keys.indexOf(e.key.toLowerCase() ) > -1
                ) {
                    if( e.target.dataset.submit==="submitCrawler"){
                        $("button.data-crawler").click();
                    } else {
                        $('button[name=save]', form).click();
                    }
                    // e.preventDefault;
                    return true;
                }
                e.preventDefault;
            }
        });
    };
}(jQuery));
$(document).ready(function () {
    $('[data-shortcut]').shortcutHandler();
});