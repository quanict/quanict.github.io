const loaderProp = {
    /**
     * 动态加载CSS文件的方法
     * Load css file method
     * 
     * @param {String}   fileName              CSS文件名
     * @param {Function} [callback=function()] 加载成功后执行的回调函数
     * @param {String}   [into="head"]         嵌入页面的位置
     */

    loadCSS: function (fileName, callback, into) {
        callback = callback || function () { };

        var css = document.createElement("link");
        css.type = "text/css";
        css.rel = "stylesheet";
        css.onload = css.onreadystatechange = function () {
            editormd.loadFiles.css.push(fileName);
            callback();
        };

        css.href = fileName + ".css";

        this.appendFile2Load(css, into);
    },

    /**
     * 动态加载Editor.md插件，但不立即执行
     * Load editor.md plugins
     * 
     * @param {String}   fileName              插件文件路径
     * @param {Function} [callback=function()] 加载成功后执行的回调函数
     * @param {String}   [into="head"]         嵌入页面的位置
     */

    loadPlugin: function (fileName, callback, into) {
        callback = callback || function () { };

        this.loadScript(fileName, function () {
            editormd.loadFiles.plugin.push(fileName);
            callback();
        }, into);
    },

    /**
     * 动态加载JS文件的方法
     * Load javascript file method
     * 
     * @param {String}   fileName              JS文件名
     * @param {Function} [callback=function()] 加载成功后执行的回调函数
     * @param {String}   [into="head"]         嵌入页面的位置
     */

    loadScript: function (fileName, callback, into) {


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
        } else {
            script.onload = function () {
                editormd.loadFiles.js.push(fileName);
                callback();
            };
        }
        this.appendFile2Load(script, into);

    },

    loadScripts: function (filenames, rootPath, callback) {
        if (!filenames) {
            return Promise.resolve();
        }
        if (typeof filenames === 'string') {
            filenames = [filenames];
        }
        if (typeof rootPath === 'function') {
            callback = rootPath;
            rootPath = '';
        }
        const test = filenames.map((filename) => {
            return new Promise(function (resolve, reject) {
                let script = document.createElement('script')
                script.src = rootPath + filename;
                script.id = filename.replace(/[\./]+/g, "-");
                script.type = "text/javascript";
                script.onload = resolve
                script.onerror = reject
                document.getElementsByTagName("head")[0].appendChild(script);
                //document.head.append(script)
            });
        });
        return Promise.allSettled(test)
            .catch(error => {
                console.error(error.message)
            })
        return;
        return new Promise((resolve, reject) => {
            try {
                const script = document.createElement("script");
                const container = document.head || document.body;

                script.async = true;
                script.src = src;
                script.id = fileName.replace(/[\./]+/g, "-");
                script.type = "text/javascript";

                script.onload = function () {
                    editormd.loadFiles.js.push(fileName);
                    callback();
                    resolve({ status: true });
                };

                // el.addEventListener("load", () => {
                //     resolve({ status: true });
                // });

                script.addEventListener("error", () => {
                    reject({
                        status: false,
                        message: `Failed to load the script ${src}`
                    });
                });

                //container.appendChild(el);
                this.appendFile2Load(script);
            } catch (err) {
                reject(err);
            }
        });
    },

    appendFile2Load: function (file, into) {
        into = into || "head";
        if (into === "head") {
            document.getElementsByTagName("head")[0].appendChild(file);
        } else {
            document.body.appendChild(file);
        }
    }
};