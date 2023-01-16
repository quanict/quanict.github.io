(function ($) {
    /**
     * https://github.com/dbrekalo/fastselect
     * http://dbrekalo.github.io/fastselect/
     * @param options
     * @returns {Window.jQuery}
     */
    $.fn.fastSelect = function (options) {
        if ( typeof $.fn.fastselect === 'undefined') {
            return;
        }

        this.each(function (i, element) {
            console.log(`===== debug fastselect`, {element})
            jQuery(element).fastselect({
                url: null,
                loadOnce: true,
                apiParam: 'query',
                initialValue: null,
                clearQueryOnSelect: true,
                minQueryLength: 1,
                focusFirstItem: false,
                flipOnBottom: true,
                typeTimeout: 150,
                userOptionAllowed: false,
                valueDelimiter: ',',
                maxItems: null,

                parseData: null,
                onItemSelect: null,
                onItemCreate: null,
                onMaxItemsReached: null,

                placeholder: 'Choose option',
                searchPlaceholder: 'Search options',
                noResultsText: 'No results',
                userOptionPrefix: 'Add '

            });
        });
        return this;
    };
}(jQuery));

$(function() {
    $("[data-role=fast-select]").fastSelect();
});