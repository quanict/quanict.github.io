(function ($) {
    const icon = $('<svg/>', {
        class: "text-dark mb-1",
        width: "16px",
        height: "16px",
        version: "1.1"
    });

    const iconSetting = icon.clone().html('<use href="#svg-setting" />');
    const tableBtn = $('<a/>', { class:"nav-link text-body", 'data-scroll':""});

    iconSetting.html();

    const defaults = {
        ajax: null
    }
    let columnDefs = $('input[name=columnDefs').val();

    const render = {
        'settings': function (data, type, row, meta) { 
            let btn = tableBtn.clone();
            btn.html(iconSetting);

            const urlEdit = $('input[name=url_edit]');
            if (urlEdit.length > 0) {
                let url = urlEdit.val();
                console.log(`===============`, { data, type, row, meta });
                url = url.replace("/0", `/${row.id}`);
                
                btn.attr('href', url);
            }
            return btn.prop('outerHTML');
        },
        default: function (data, type, row, meta) { 
            const doc = new DOMParser().parseFromString(data, "text/html");
            html = doc.documentElement.textContent;

            let col = meta.col;
            let columnDef = Object.values(columnDefs)[col];
            if (typeof columnDef.options !== 'undefined' && typeof columnDef.options.render !== 'undefined') {
                return columnDef.options.render.replace('$data', html);
            }
            
            return html;
        }
    };
    
    async function headerInit(table, options) {
        options.columns= [];
        
        columnDefs = JSON.parse(columnDefs);
        let thead = document.createElement("thead");
        thead.classList = "thead-light text-xxs text-uppercase";
        for (let [key, value] of Object.entries(columnDefs)) {
            let th = document.createElement("th");
            let a = document.createElement("a");
            a.classList = "dataTable-sorter";
            a.setAttribute("href", "javascript:void(0)");
            a.innerText = typeof value === "object" ? value[0] : value;
            th.appendChild(a);
            thead.appendChild(th);

            if (key == 'settings') {
                options.columns.push({ data: key, render:  render.settings});
            } else {
                options.columns.push({data: key, render: render.default});
            }
            
        }
        table.prepend(thead);
        return options;
    }

    const datatableRun = async function (table, options) {
        var settings = $.extend({}, defaults, options);
        
        if ( $('thead th', table).length < 1 && columnDefs.length > 0) {
            settings = await headerInit(table, settings);
        }

        let ajax = table.dataset.ajax;
        if (typeof ajax === 'undefined' || ajax.length < 6) {
            settings.ajax = `${window.location.href}.json`;
        }

        if (settings.ajax) {
            settings.processing = true;
            settings.serverSide = true;
        }

        //console.log(`================== debug datatable`, settings)
        $(table).DataTable(settings);
    }

    $.fn.datatables = function (options) {
        const elms = this;
        
        this.each(function (i, table) {
            datatableRun(table, options);
        });
        return this;
    };
 
}(jQuery));

$(document).ready(function () {
    $('table.table').datatables();
});

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
