const DOM = {
    svg:function (w,h) {
        let svg = document.createElement("svg");
        if( typeof h !== 'undefined'){
            svg.height = h;
        }
        if( typeof w !== 'undefined'){
            svg.width = w;
        }
        return svg;
    }
};