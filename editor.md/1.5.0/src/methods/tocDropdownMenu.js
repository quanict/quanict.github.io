/**
 *
 * 生成TOC下拉菜单
 * Creating ToC dropdown menu
 * 
 * @param   {Object}   container       插入TOC的容器jQuery对象元素
 * @param   {String}   tocTitle        ToC title
 * @returns {Object}                   return toc-menu object
 */

const tocDropdownMenu = function (container, tocTitle) {

    tocTitle = tocTitle || "Table of Contents";

    var zindex = 400;
    var tocMenus = container.find("." + this.classPrefix + "toc-menu");

    tocMenus.each(function () {
        var $this = $(this);
        var toc = $this.children(".markdown-toc");
        var icon = "<i class=\"fa fa-angle-down\"></i>";
        var btn = "<a href=\"javascript:;\" class=\"toc-menu-btn\">" + icon + tocTitle + "</a>";
        var menu = toc.children("ul");
        var list = menu.find("li");

        toc.append(btn);

        list.first().before("<li><h1>" + tocTitle + " " + icon + "</h1></li>");

        $this.mouseover(function () {
            menu.show();

            list.each(function () {
                var li = $(this);
                var ul = li.children("ul");

                if (ul.html() === "") {
                    ul.remove();
                }

                if (ul.length > 0 && ul.html() !== "") {
                    var firstA = li.children("a").first();

                    if (firstA.children(".fa").length < 1) {
                        firstA.append($(icon).css({ float: "right", paddingTop: "4px" }));
                    }
                }

                li.mouseover(function () {
                    ul.css("z-index", zindex).show();
                    zindex += 1;
                }).mouseleave(function () {
                    ul.hide();
                });
            });
        }).mouseleave(function () {
            menu.hide();
        });
    });

    return tocMenus;
};