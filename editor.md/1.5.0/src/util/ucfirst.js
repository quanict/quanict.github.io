/**
* 字符串首字母大写
* Only string first char to uppercase
* 
* @param   {String}    str            string
* @returns {String}                   string
*/
"use strict";
let firstUpperCase = function (str) {
    return str.toLowerCase().replace(/\b(\w)/, function ($1) {
        return $1.toUpperCase();
    });
};

let ucfirst = firstUpperCase;