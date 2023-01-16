(function ($) {
    $.fn.submitCrawler = function (options) {
        this.each(function (i, element) {
            jQuery(element).on('click',function(e){
                let form = jQuery(this).closest('form');
                let source = jQuery('input[type=text][name=source]',form);

                let crawler_source = document.createElement('INPUT');
                crawler_source.setAttribute("type", "hidden");
                crawler_source.setAttribute("name", "crawler_source");
                crawler_source.setAttribute("value", source.val());
                form.append(crawler_source);
                form.find('[type=submit]').click();
                e.preventDefault;
            })
        });
    };
}(jQuery));

$(document).ready(function () {
    $('a.data-crawler, button.data-crawler').submitCrawler();
});