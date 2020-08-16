const cdn = {
    'raphael':[
        {
            path:'raphael/2.0.2/raphael-min.js',
            version:'2.0.2'
        }
    ],

    'kanjiViewer':{
        path:"kanji-viewer/kanjiviewer.js",
        require:{
            "raphael":"2.0.2"
        },
    }
};

function domain_from_url(url) {
    let result;
    let match;
    let regex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im;

    // regex = new RegExp([
    //     '^(https?:)//', // protocol
    //     '(([^:/?#]*)(?::([0-9]+))?)', // host (hostname and port)
    //     '(/{0,1}[^?#]*)', // pathname
    //     '(\\?[^#]*|)', // search
    //     '(#.*|)$' // hash
    // ].join(''));

    if (match = url.match(regex)) {
        result = match[0];
        // if (match = result.match(/^[^\.]+\.(.+\..+)$/)) {
        //     result = match[1]
        // }
    }
    return result
}

function loadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.head;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    console.log(`=== load script`,{url})
    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}

function loadCDN(resources, version){
    if( typeof resources === 'object'){
        let fileSrc = $('script[src*="/loader.js"]').attr('src');
        let host = domain_from_url(fileSrc);
        // test = URL(fileSrc)
        // console.log(`===`,{fileSrc, srcInfo, test})
        loadScript(`${host}/${resources.path}`);
        if( typeof resources.require !== 'undefined'){
            for (const [key, value] of Object.entries(resources.require)) {
                if( typeof cdn[key] !== 'undefined'){
                    let resource = cdn[key].filter(s=>s.version===value);
                    if( resource.length > 0){
                        loadCDN(resource[0]);
                    }
                }
              }
        }
    }
}


jQuery.extend({
    loader: function(files) {
        return new Promise((resolve, reject) => {
            if( typeof files === 'object'){

            }
    
            if( typeof files === 'string'){
                if( typeof cdn[files] !== 'undefined'){
                    loadCDN(cdn[files]);
                }
            }

            resolve(true);
        });
        
        // console.log('test',{files});
    }
});