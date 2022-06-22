/**
 *
 * 生成TOC(Table of Contents)
 * Creating ToC (Table of Contents)
 * 
 * @param   {Array}    toc             从marked获取的TOC数组列表
 * @param   {Element}  container       插入TOC的容器元素
 * @param   {Integer}  startLevel      Hx 起始层级
 * @returns {Object}   tocContainer    返回ToC列表容器层的jQuery对象元素
 */

const markdownToCRenderer = function (toc, container, tocDropdown, startLevel) {

    var html = "";
    var lastLevel = 0;
    var classPrefix = this.classPrefix;

    startLevel = startLevel || 1;

    for (var i = 0, len = toc.length; i < len; i++) {
        var text = toc[i].text;
        var level = toc[i].level;

        if (level < startLevel) {
            continue;
        }

        if (level > lastLevel) {
            html += "";
        }
        else if (level < lastLevel) {
            html += (new Array(lastLevel - level + 2)).join("</ul></li>");
        }
        else {
            html += "</ul></li>";
        }

        html += "<li><a class=\"toc-level-" + level + "\" href=\"#" + text + "\" level=\"" + level + "\">" + text + "</a><ul>";
        lastLevel = level;
    }

    var tocContainer = container.find(".markdown-toc");

    if ((tocContainer.length < 1 && container.attr("previewContainer") === "false")) {
        var tocHTML = "<div class=\"markdown-toc " + classPrefix + "markdown-toc\"></div>";

        tocHTML = (tocDropdown) ? "<div class=\"" + classPrefix + "toc-menu\">" + tocHTML + "</div>" : tocHTML;

        container.html(tocHTML);

        tocContainer = container.find(".markdown-toc");
    }

    if (tocDropdown) {
        tocContainer.wrap("<div class=\"" + classPrefix + "toc-menu\"></div><br/>");
    }

    tocContainer.html("<ul class=\"markdown-toc-list\"></ul>").children(".markdown-toc-list").html(html.replace(/\r?\n?\<ul\>\<\/ul\>/g, ""));

    return tocContainer;
};