String.prototype.is_url = function () {
    let regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

    if (!regex.test(this)) {
        console.warn("return false");
        return false;
    } else {
        console.warn("return true");
        return true;
    }
};

String.prototype.is_not_url = function () {
    return !this.is_url();
};


jQuery.fn.updateImageStoragePath = function () {
    if (typeof img_storage === 'undefined') {
        return;
    }
    jQuery(this).each((index, img) => {
        const src = $(img).attr('src');
        if (src.is_not_url()) {
            $(img).attr('src', img_storage + "/" + src)
        }
    });
};

; (function (factory) {
    "use strict";
}(function () {
    "use strict";
    var $ = (typeof (jQuery) !== "undefined") ? jQuery : Zepto;

    if (typeof ($) === "undefined") {
        return;
    }
}));

$.fn.guruView = function () {
    const container = this;
    const titleIcons = {
        'intent': 'fa fa-flip-horizontal fa-comment-alt-dots',
        'problem': 'fa fa-frown',
        'solution': 'fa fa-smile-beam',
        'real-world-analogy': 'fa fa-car-side',
        'structure': 'fa fa-sitemap',
        'pseudocode': 'fa fa-hashtag',
        'applicability': 'fa fa-lightbulb-on',
        'how-to-implement': 'fa fa-clipboard-list-check',
        'pros-and-cons': 'fa fa-balance-scale',
        'relations-with-other-patterns': 'fa fa-exchange-alt'
    };
    const guruView = {
        mdContainer: (dom) => {
            $('img', dom).updateImageStoragePath();
            $('h2', dom).each((index, title) => {
                const name = title.textContent.toLowerCase().replace(/\s/g, '-');
                if (name === 'structure') {
                    guruView.structure(title.nextSibling);
                } else {
                    guruView.groupViewImage(title.nextSibling);
                }
                if (typeof titleIcons[name] !== 'undefined') {
                    let icon = $('<i/>', { class: titleIcons[name], 'aria-hidden': "true" });
                    title.prepend(icon.get(0));
                }
            });

        }
    };

    guruView.groupViewImage = (p) => {
        let images = $('img', p);
        let next = p.nextSibling;
        if (images.length > 0) {
            let figure = jQuery('<figure/>', { class: 'image' });
            let figcaption = jQuery('<figcaption/>');

            figure.append(images.clone());
            figure.append(figcaption);
            figure.insertAfter(p);
            p.remove();
        }
        else if (next && next.nodeName !== 'H2') {
            guruView.groupViewImage(next);
        }
    }

    guruView.structureImages = (p) => {

        const image = $('img', p).get(0);
        const src = image.src;
        const fileName = src.split('\\').pop().split('/').pop();
        const fileInfo = fileName.split('.');

        const img = jQuery('<img />', {
            class: 'structure-img-non-indexed hidden-lg-down',
            src: image.src,
            alt: "",
            srcset: ''
        });

        const imgIndex = jQuery('<img />', {
            class: 'structure-img-indexed hidden-hg-up',
            src: src.replace(fileName, `${fileInfo[0]}-indexed.${fileInfo[1]}`),
            alt: "",
            srcset: ''
        });

        const figure = jQuery('<figure/>', { class: 'image' });
        figure.append(img);
        figure.append(imgIndex);

        const gFigure = jQuery('<div/>', { class: 'struct-image1 struct-image' });
        gFigure.append(figure);

        const gDiv = jQuery('<div/>', { class: 'structure' });
        gDiv.append(gFigure);

        gDiv.insertAfter(p);

        let test1 = gDiv.nextSibling;
        let test2 = p.nextSibling;
        let test3 = gDiv.next().get(0);
        if (gDiv.next().get(0) && gDiv.next().get(0).nodeName === 'UL') {
            guruView.structureStruct(gDiv.next().get(0));
        }
        p.remove();
    }

    guruView.structureStruct = (ul) => {
        if ($('.structure', container).length > 0) {
            let ol = $('<ol/>');
            $('li', ul).each((index, li) => {
                let item = $(li).clone().addClass(`struct-li${index + 1}`);
                let content = item.text().split('{nl}');
                item.html('');
                content.forEach(str => {
                    item.append(`<p>${str.trim()}</p>`);
                });
                ol.append(item);
            });

            $('.structure', container).append(ol);
            ul.remove();
        }
    }

    guruView.structure = (p) => {

        let test = `== check img ${$('img', p).length}`;
        if (p) {
            test += `|| check ul:${p.nodeName} `
        }

        if (p === null || p.nodeName === 'H2') {
            return;
        }

        if ($('img', p).length > 0) {
            guruView.structureImages(p);
        }
    }


    $(container).each((index, dom) => {
        guruView.mdContainer(dom);
    });

}



const guruView = function (dom) {
    jQuery('img', dom).updateImageStoragePath();
    const groupViews = ['structure'];

    $('h2', dom).each((index, h2) => {
        const gName = h2.id.replace('h2-', '');
        if (groupViews.indexOf(gName) > -1) {
            const gDiv = jQuery('<div/>', { class: gName });
            const img = jQuery('<image />',
                {
                    class: 'structure-img-non-indexed hidden-lg-down',
                    src: '',
                    alt: "",
                    srcset: ''
                });
            const figure = jQuery('<figure/>', { class: 'image' });

            const gFigure = jQuery('<div/>', { class: 'struct-image1 struct-image' });
            gFigure.append(figure);
            gDiv.append(gFigure);

            console.log(`====guruView h2`, { h2, gDiv });
        }

    });
}

$.fn.mdView = function (options) {
    const defaults = {
        gfm: true,
        toc: true,
        tocm: false,
        tocStartLevel: 1,
        tocTitle: "目录",
        tocDropdown: false,
        tocContainer: "",
        markdown: "",
        markdownSourceCode: false,
        htmlDecode: false,
        autoLoadKaTeX: true,
        pageBreak: true,
        atLink: true,    // for @link
        emailLink: true,    // for mail address auto link
        tex: false,         // TeX(LaTeX), based on KaTeX
        taskList: false,   // Github Flavored Markdown task lists
        emoji: false,
        flowChart: false,
        sequenceDiagram: false,
        previewCodeHighlight: true
    };

    editormd.$marked = marked;

    const div = $(this);
    const settings = div.settings = $.extend(true, defaults, options || {});
    let saveTo = div.find("textarea");
    if (saveTo.length < 1) {
        div.append("<textarea></textarea>");
        saveTo = div.find("textarea");
    }
    var markdownDoc = (settings.markdown === "") ? saveTo.val() : settings.markdown;
    var markdownToC = [];

    var rendererOptions = {
        toc: settings.toc,
        tocm: settings.tocm,
        tocStartLevel: settings.tocStartLevel,
        taskList: settings.taskList,
        emoji: settings.emoji,
        tex: settings.tex,
        pageBreak: settings.pageBreak,
        atLink: settings.atLink,           // for @link
        emailLink: settings.emailLink,        // for mail address auto link
        flowChart: settings.flowChart,
        sequenceDiagram: settings.sequenceDiagram,
        previewCodeHighlight: settings.previewCodeHighlight,
    };

    const markedOptions = {
        renderer: editormd.markedRenderer(markdownToC, rendererOptions),
        gfm: settings.gfm,
        tables: true,
        breaks: true,
        pedantic: false,
        sanitize: (settings.htmlDecode) ? false : true, // 是否忽略HTML标签，即是否开启HTML标签解析，为了安全性，默认不开启
        smartLists: true,
        smartypants: true
    };

    markdownDoc = new String(markdownDoc);
    var markdownParsed = marked(markdownDoc, markedOptions);

    markdownParsed = editormd.filterHTMLTags(markdownParsed, settings.htmlDecode);

    if (settings.markdownSourceCode) {
        saveTo.text(markdownDoc);
    } else {
        saveTo.remove();
    }

    div.addClass(`markdown-body ${this.classPrefix}html-preview`).append(markdownParsed);
    div.guruView();

    var tocContainer = (settings.tocContainer !== "") ? $(settings.tocContainer) : div;

    if (settings.tocContainer !== "") {
        tocContainer.attr("previewContainer", false);
    }

    if (settings.toc) {
        div.tocContainer = editormd.markdownToCRenderer(markdownToC, tocContainer, settings.tocDropdown, settings.tocStartLevel);
        if (settings.tocDropdown || div.find("." + editormd.classPrefix + "toc-menu").length > 0) {
            editormd.tocDropdownMenu(div, settings.tocTitle);
        }
        if (settings.tocContainer !== "") {
            div.find(".editormd-toc-menu, .editormd-markdown-toc").remove();
        }
    }

    if (settings.previewCodeHighlight) {
        div.find("pre").addClass("prettyprint linenums");
        prettyPrint();
    }

    if (!editormd.isIE8) {
        if (settings.flowChart) {
            div.find(".flowchart").flowChart();
        }

        if (settings.sequenceDiagram) {
            div.find(".sequence-diagram").sequenceDiagram({ theme: "simple" });
        }
    }

    if (settings.tex) {
        var katexHandle = function () {
            div.find("." + editormd.classNames.tex).each(function () {
                var tex = $(this);
                katex.render(tex.html().replace(/&lt;/g, "<").replace(/&gt;/g, ">"), tex[0]);
                tex.find(".katex").css("font-size", "1.6em");
            });
        };

        if (settings.autoLoadKaTeX && !editormd.$katex && !editormd.kaTeXLoaded) {
            editormd.loadKaTeX(function () {
                editormd.$katex = katex;
                editormd.kaTeXLoaded = true;
                katexHandle();
            });
        }
        else {
            katexHandle();
        }
    }

    div.getMarkdown = function () {
        return saveTo.val();
    };

    console.log(`===`, { markdownDoc, markdownParsed })
    return this;
}