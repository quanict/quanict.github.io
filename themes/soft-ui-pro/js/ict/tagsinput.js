(function ($) {
    /**
     * https://bootstrap-tagsinput.github.io/bootstrap-tagsinput/
     * https://bootstrap-tagsinput.github.io/bootstrap-tagsinput/examples/
     * @param options
     * @returns {Window.jQuery}
     */
    $.fn.tagsInput = function (options) {
        if ( typeof $.fn.tagsinput === 'undefined') {
            return;
        }

        this.each(function (i, element) {
            console.log(`===== debug taginput`, {element})
            jQuery(element).tagsinput({
                typeahead: {
                    // source: function(query) {
                    //     return $.get('http://someservice.com');
                    // }
                    source: ['Amsterdam', 'Washington', 'Sydney', 'Beijing', 'Cairo']
                },
                freeInput: true,
                trimValue: true,
                typeaheadjs:true

            });
        });
        return this;
    };
}(jQuery));

$(function() {
    $("input[data-role=tags-input], select[multiple][data-role=tags-input]").tagsInput();
});