
$(document).ready(function () {
    $('form.auto-submit').formAutoSubmit();
    $(document).formShortcut();
});

(function ($) { 
    $.fn.formAutoSubmit = function (options) {
        function execute(form, options) {
            console.log(`handler submit form`, {form})
            $('input', form).change(function () { 
                form.submit();
            });
        }

        this.each(function (i, form) {
            execute(form, options);
        });
        return this;
    };
}(jQuery));

(function ($) { 
    const inputs = ['input', 'textarea'];
    const sKey = 83;
    $.fn.formShortcut = function (options) {
        $(document).keydown(function (e) {
            let form = $(e.target).parents('form');
            if (inputs.indexOf(e.target.nodeName.toLowerCase()) > -1 && e.ctrlKey === true) {
                if (e.keyCode === sKey) {
                    $('button[name=save]', form).click();
                    e.preventDefault;
                    return false;
                }
            }

            if( e.key === 'Enter' && ['SELECT','INPUT'].indexOf(e.target.nodeName)){
                e.preventDefault;
                return false;
            }
        });
        return this;
    };
}(jQuery));
