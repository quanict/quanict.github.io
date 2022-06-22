/**
 * 动态加载Editor.md插件，但不立即执行
 * Load editor.md plugins
 * 
 * @param {String}   fileName              插件文件路径
 * @param {Function} [callback=function()] 加载成功后执行的回调函数
 * @param {String}   [into="head"]         嵌入页面的位置
 */

const loadPlugin = function (fileName, callback, into) {
    callback = callback || function () { };

    this.loadScript(fileName, function () {
        editormd.loadFiles.plugin.push(fileName);
        callback();
    }, into);
};