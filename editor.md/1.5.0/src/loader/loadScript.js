/**
 * 动态加载JS文件的方法
 * Load javascript file method
 * 
 * @param {String}   fileName              JS文件名
 * @param {Function} [callback=function()] 加载成功后执行的回调函数
 * @param {String}   [into="head"]         嵌入页面的位置
 */

const loadScript = function (fileName, callback, into) {

    into = into || "head";
    callback = callback || function () { };

    var script = null;
    script = document.createElement("script");
    script.id = fileName.replace(/[\./]+/g, "-");
    script.type = "text/javascript";
    script.src = fileName + ".js";

    if (editormd.isIE8) {
        script.onreadystatechange = function () {
            if (script.readyState) {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    editormd.loadFiles.js.push(fileName);
                    callback();
                }
            }
        };
    }
    else {
        script.onload = function () {
            editormd.loadFiles.js.push(fileName);
            callback();
        };
    }

    if (into === "head") {
        document.getElementsByTagName("head")[0].appendChild(script);
    } else {
        document.body.appendChild(script);
    }
};