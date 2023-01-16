(function( $ ) {
    class TreeView {
        constructor(data, root) {
            this.data = data;
            this.root = root;
            this.urlEdit = root.data('urlEdit');
            this.init();
        }

        async init() {
            await this.groupView();
            //pageSetUp();
        }

        groupView() {
            let that = this;
            this.data.forEach(function (data) {
                that.groupNode(data);
            });
        };

        groupNode(row) {
            let dataWiget = {
                colorbutton: false,
                editbutton: false,
                custombutton: false,
                sortable: false,
                deletebutton: false,
                // togglebutton:true,
                // fullscreenbutton:true,
                // collapsed:true,
            };

            let container = $('<div/>',{'class':'col-md-6'});
            let widget = $('<div/>',{'class':'jarviswidget jarviswidget-color-orange'});
            for (const [key, value] of Object.entries(dataWiget)) {
                widget.attr(`data-widget-${key}`,value);
            }
            // create header
            let header = this.groupHeader(row);
            widget.append(header);

            let body = this.groupContent(row);
            widget.append(body);

            container.append(widget);

            this.root.append(container);
        };

        groupHeader(data) {
            let header = $('<header/>');
            header.append(`<span class="widget-icon"> <i class="fa fa-comments"></i> </span>`);
            header.append(`<h2>${data.name}</h2>`);
            let btn = `<a href="${this.urlEdit.format(data.id)}" class="button-icon" rel="tooltip" title="" data-placement="bottom" data-original-title="Edit"><i class="fa-edit fa"></i></a>`;

            header.append(`<div class="jarviswidget-ctrls">${btn} </div>`);
            return header;
        };

        groupContent(row) {
            let main = $(`<div/>`);
            let ctr = `<div class="jarviswidget-editbox"></div>`;
            main.append(ctr);

            let body = $(`<div/>`, {class: "widget-body"});
            if (typeof row.category !== 'undefined' && row.category && row.category.length > 0) {
                let nodeArea = $(`<div/>`, {class: 'alert alert-block alert-warning'});
                row.category.forEach((ca) => {
                    nodeArea.append(`<label class="label label-info">${ca.name}</label>`)
                });
                body.append(nodeArea);
            }
            if( typeof  row.childs !== 'undefined' && row.childs.length > 0){
                let childList = $(`<ol/>`,{class:"dd-list"});
                row.childs.forEach((data)=>{
                    let itemNode = this.itemRender(data);
                    childList.append(itemNode);
                });

                let childRoot = $(`<div/>`,{class:"dd nestable2"});
                childRoot.append(childList);
                body.append(childRoot);

            }
            main.append(body);

            return main;
        };

        itemRender(data) {
            let root = $(`<div/>`, {class: "dd-item", "data-id": data.id});
            let body = $(` <div/>`, {class: "dd-handle"});
            let label = $(`<span/>`).html(data.title_sub ? data.title_sub : data.name);
            if (data.conceptCategory && data.conceptCategory.length > 0) {
                data.conceptCategory.forEach((ca) => {
                    label.append(`<sup class="label label-info">${ca.name}</sup>`);
                });
            }

            body.append(label);
            let button = this.itemButton(data);
            body.append(button);
            root.append(body);

            if( typeof data.childs !== 'undefined' ){
                let childList = $(`<ol/>`,{class:"dd-list"});
                data.childs.forEach((data)=>{
                    let itemNode = this.itemRender(data);
                    childList.append(itemNode);
                });
                root.append(childList);

            }
            return root;
        };

        itemButton(data) {
            let editStr = "Edit Concept %s";

            let opt = {
                'class': 'pull-right btn btn-xs',
                'rel': "tooltip",
                'data-placement': "left",
                'title': editStr.format(data.name),
                'data-original-title': editStr.format(data.name),
                'href': '', //this.urlEdit.format(data.id)
            };
            return $(`<a/>`, opt).html(`<i class="fa fa-edit"></i>`);
        }

    }

    $.fn.treeNestable = function() {
        return this.each(function() {
            let container = $(this);
            if( typeof  this.dataset.json !== 'undefined'){
                $.ajax( this.dataset.json )
                    .done(function(data) {
                        if( data && data.length > 0 ){
                            const treeNestable = new TreeView(data, container);
                        }
                    })
            }

        });
    };

    $(document).ready(function () {
        $('.nestable-container').treeNestable();
    });
}( jQuery ));

var runPageSetup = false;
let updateOutput = function(e) {

};

$('#nestable2').nestable({
    group : 2
}).on('change', updateOutput);

$('#nestable-menu').on('click', function(e) {
    let target = $(e.target), action = target.data('action');
    if (action === 'expand-all') {
        $('.dd').nestable('expandAll');
    }
    if (action === 'collapse-all') {
        $('.dd').nestable('collapseAll');
    }
});