/**
 * 动态加载CSS文件的方法
 * Load css file method
 * 
 * @param {String}   fileName              CSS文件名
 * @param {Function} [callback=function()] 加载成功后执行的回调函数
 * @param {String}   [into="head"]         嵌入页面的位置
 */

const loadCSS = function (fileName, callback, into) {
    into = into || "head";
    callback = callback || function () { };

    var css = document.createElement("link");
    css.type = "text/css";
    css.rel = "stylesheet";
    css.onload = css.onreadystatechange = function () {
        editormd.loadFiles.css.push(fileName);
        callback();
    };

    css.href = fileName + ".css";

    if (into === "head") {
        document.getElementsByTagName("head")[0].appendChild(css);
    } else {
        document.body.appendChild(css);
    }
};