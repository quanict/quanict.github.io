
$(document).ready(function () {
    $('form.auto-submit').formAutoSubmit();
    $(document).formShortcut();
});

(function ($) { 
    $.fn.formAutoSubmit = function (options) {
        const elms = this;
        
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
            if (inputs.indexOf(e.target.nodeName.toLowerCase()) > -1 && e.ctrlKey === true) {
                let form = $(e.target).parents('form');
                if (e.keyCode === sKey) {
                    $('button[name=save]', form).click();
                    return false;
                }
                //console.log(`============== ${e.keyCode}`, { e });
    
            }
        });
        return this;
    };
}(jQuery));
