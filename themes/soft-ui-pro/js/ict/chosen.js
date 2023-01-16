(function ($) {
    /**
     * https://harvesthq.github.io/chosen/
     * @param options
     * @returns {Window.jQuery}
     */
    $.fn.chosenSelect = function (options={}) {
        this.each(function (i, element) {
            const optDefault = {
                disable_search : false,
                disable_search_threshold:true,
                hide_results_on_select:true
            };
            jQuery(element).chosen(optDefault);
        });
        return this;
    };
}(jQuery));

$(document).ready(function () {
    $('[data-role=chosen-select]').chosenSelect();
});