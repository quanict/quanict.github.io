(function ($) {
    /**
     * https://github.com/Choices-js/Choices#configuration-options
     * @param options
     * @returns {Window.jQuery}
     */
    $.fn.choices = function (options) {
        this.each(function (i, element) {
            const input = new Choices(element, {
                searchEnabled: true,
                removeItemButton: true,
                duplicateItemsAllowed: false,
                allowHTML:true,
            });
        });
        return this;
    };

    $.fn.choicesFlags = function (options) {
        this.each(function (i, element) {
            new Choices(element,
                {
                    allowHTML: true,
                    searchEnabled:false,
                    callbackOnCreateTemplates: function(strToEl) {
                        const itemSelectText = this.config.itemSelectText;
                        return {
                            item: function({ classNames }, data) {
                                const flag = jQuery('<span/>',{style:"margin-right:10px;"}).html(`<img src="${element.dataset.img}/${data.value}.svg" style="max-height: 20px" />`);
                                const label = jQuery('<span/>',{style:"margin-right:10px;"}).html(String(data.label));
                                const itemOpt = {
                                    class:[
                                        String(classNames.item),
                                        String( data.highlighted ? classNames.highlightedState : classNames.itemSelectable )
                                    ].join(' '),
                                    "data-item":"",
                                    "data-id":String(data.id),
                                    "data-value":String(data.value),
                                };
                                if( data.active ){
                                    itemOpt["aria-selected"] = true;
                                }
                                if( data.disabled ){
                                    itemOpt["aria-disabled"] = true;
                                }
                                const div = jQuery('<div/>',itemOpt)
                                    .append(flag)
                                    .append(label);
                                return div.get(0);
                            },

                            choice: function({ classNames }, data) {
                                const img = jQuery('<img />',{"src":`${element.dataset.img}/${data.value}.svg`, "style":"max-height: 20px" })
                                const flag = jQuery('<span/>',{style:"margin-right:10px;"}).append(img);
                                const label = jQuery('<span/>',{style:"margin-right:10px;"}).html(String(data.label));
                                const itemOpt = {
                                    class:[
                                        String(classNames.item),
                                        String(classNames.itemChoice),
                                        String( data.disabled ? classNames.itemDisabled : classNames.itemSelectable
                                        )
                                    ].join(' '),
                                    "data-select-text":String(itemSelectText),
                                    "data-id":String(data.id),
                                    "data-value":String(data.value),
                                    "data-choice":String( data.disabled ? 'data-choice-disabled aria-disabled="true"' : 'data-choice-selectable'
                                    ),
                                };

                                if( data.groupId > 0 ){
                                    itemOpt["role"] = "treeitem";
                                } else {
                                    itemOpt["role"] = "option";
                                }
                                const div = jQuery('<div/>',itemOpt)
                                    .append(flag)
                                    .append(label);
                                return div.get(0);
                            },
                        };
                    },
                }
            );
        });
        return this;
    };

}(jQuery));

$(document).ready(function () {
    $('[data-role=select-choices]').choices();
    $('[data-role=select-choices-locale]').choicesFlags();

    jQuery('select[data-redirect]').change(function (e){
        const input = e.target;
        let vars = {}, hash, url;
        if( window.location.href.indexOf('?') > -1){
            url = window.location.href.slice(0, window.location.href.indexOf('?'));
            const hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for(let i = 0; i < hashes.length; i++)
            {
                hash = hashes[i].split('=');
                vars[hash[0]] = hash[1];
            }
        } else {
            url = window.location.href;
        }

        vars[input.name] = input.value;

        if( Boolean(input.dataset.redirect) ){
            window.location.href = url+ '?' + jQuery.param( vars );
        }

    });
});