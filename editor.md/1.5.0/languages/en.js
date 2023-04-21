(function(){
    var factory = function (exports) {
        var lang = {

        };
        
        exports.defaults.lang = lang;
    };
    
	// CommonJS/Node.js
	if (typeof require === "function" && typeof exports === "object" && typeof module === "object")
    { 
        module.exports = factory;
    }
	else if (typeof define === "function")  // AMD/CMD/Sea.js
    {
		if (define.amd) { // for Require.js

			define(["editormd"], function(editormd) {
                factory(editormd);
            });

		} else { // for Sea.js
			define(function(require) {
                var editormd = require("../editormd");
                factory(editormd);
            });
		}
	} 
	else
	{
        factory(window.editormd);
	}
    
})();