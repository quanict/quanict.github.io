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
    let columnDefs = $('input[name=columnDefs]').val();

    const render = {
        settings: function (data, type, row, meta) { 
            let btn = tableBtn.clone();
            btn.html(iconSetting);

            const urlEdit = $('input[name=url_edit]');
            if (urlEdit.length > 0) {
                let url = urlEdit.val();
                url = url.replace("/0", `/${row.id}`);
                
                btn.attr('href', url);
            }
            return btn.prop('outerHTML');
        },
        default: function (data, type, row, meta) { 
            const doc = new DOMParser().parseFromString(data, "text/html");
            let html = doc.documentElement.textContent;

            let col = meta.col;
            let columnDef = Object.values(columnDefs)[col];
            if (typeof columnDef.options !== 'undefined' && typeof columnDef.options.render !== 'undefined') {
                return columnDef.options.render.replace('$data', html);
            }
            
            return html;
        },
        tags:function(data){
            if( !data ){
                return '';
            }

            const div = document.createElement("div");
            const items = data.split(", ");
            if( items && items.length > 0 ){
                items.forEach((txt, i) => {
                    const span = document.createElement("span");
                    span.className="badge badge-info";
                    if( i> 0){
                        span.className += " ms-1"
                    }
                    span.innerText = txt;
                    div.appendChild(span);
                });
            }
            
            return div.outerHTML;
        },
        site_source: function(data, type, row){
            const {logo, source} = row;
            const btn = $('<a/>', { class:"badge badge-light", 'data-scroll':""});
            btn.attr('href', source);
            btn.html('<i class="ni ni-atom"></i>');
            return btn.prop('outerHTML');
        },

        favicon: function(data, type, row){
            const {favicon, domain} = row;

            const btn = $('<a/>', { class:"", 'data-scroll':"", title: domain, target:"_blank"});
            btn.attr('href', `//${domain}`);
            btn.html(`<img src="${favicon}" style="height:16px;" />`);
            return btn.prop('outerHTML');
        },

        page_source: function (data, type, row) {
            const {source, title} = row;
            const btn = $('<a/>', { class:"", 'data-scroll':"", title: source, target:"_blank"});
            btn.attr('href', `//${source}`);
            btn.html(title);
            return btn.prop('outerHTML');
        },

        classes: function (data, type, row){
            const div = document.createElement("div");
            div.innerText = data;
            return div.outerHTML;
        }
    };
    
    async function headerInit(table, options) {
        options.columns= [];
        const valueFunctionsMap = {
            'title':{},
            'col':{},
            'orderSequence':{},
            'classes':{},
            'renderFunction':{}
        };
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

            const renderFunctionIndex = Object.keys(valueFunctionsMap).indexOf('renderFunction');
            const colDef = {data: key, render: render.default};
            if (key === 'settings') {
                colDef.render = render.settings;
            } else if( typeof value[renderFunctionIndex] !== 'undefined' ){
                colDef.render = render[value[renderFunctionIndex]];
                // options.columns.push({data: key, render: , className:'xxxx'});
            }

            const renderClassNameIndex = Object.keys(valueFunctionsMap).indexOf('classes');

            if( typeof value[renderClassNameIndex] !== 'undefined' && value[renderClassNameIndex] ){
                colDef.className = value[renderClassNameIndex].trim();
            }
            options.columns.push(colDef);
        }
        table.prepend(thead);
        return options;
    }

    const datatableRun = async function (table, options) {
        let settings = $.extend({}, defaults, options);
        
        if ( $('thead th', table).length < 1 && columnDefs.length > 0) {
            settings = await headerInit(table, settings);
        }

        let ajax = table.dataset.ajax;
        if (typeof ajax === 'undefined' || ajax.length < 6) {
            return;
        } else {
            settings.ajax = ajax;
        }

        if (settings.ajax) {
            settings.processing = true;
            settings.serverSide = true;
        }

        $(table).DataTable(settings);
    }

    $.fn.datatables = function (options) {
        this.each(function (i, table) {
            datatableRun(table, options);
        });
        return this;
    };
 
}(jQuery));

$(document).ready(function () {
    $('table.table').datatables();
});