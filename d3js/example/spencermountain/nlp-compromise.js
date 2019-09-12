//a helper function to pretty-print output of .out('topk')
const printList = function (list) {
    const max = 35;

    // return function(list) {
        console.log("debug printlist",{list});
        let len = list.length;
        list = list.slice(0, max);
        let el = document.createElement("table");
        el.innerHTML = list.reduce((str, o) => {
            str += '<tr>'
            str += `<td style="color:#46468B;">${o.normal || o.text || ''}</td>`
            str += `<td style="color:#7A7A8B;">${o.count || ''}</td>`
            str += `<td style="color:#B7B7D1;">${o.percent + '%'}</td>`
            str += '</tr>'
            return str
        }, '')
        if (len > list.length) {
            el.innerHTML += '<b>(of ' + len + ' results)<b>'
        }
        return el
    // }
};

//a helper function to print our nested tags, from a given tag
const printTags = function () {

    let tagset = nlp().world().tags;
    const printTags = (tag, text) => {
        text += '<ul>' + tag;
        if (tagset[tag] && tagset[tag].downward) {
            tagset[tag].downward.forEach((t) => {
                text = printTags(t, text); //recursive
            });
        }
        return text + '</ul>';
    };
    //return a proper html element
    return (tag) => {
        let el = document.createElement("div");
        el.innerHTML = printTags(tag, '')
        return el
    }
};

//helper function to render a document as colored terms
function printHtml(doc,el){
    // let el = DOM.element()
    let html = doc.out('html')
    el.innerHTML = html
    //add a hover 'title'
    let sentences= el.children[0].children
    for (var i = 0; i < sentences.length; i++) {
        sentences[i].style='display:block;'
        for (var o = 0; o < sentences[i].children.length; o++) {
            let e=sentences[i].children[o]
            var tags = e.getAttribute('class').split(' ').map(c=>c.replace(/^nl-/,' '))
            e.classList.add('term')
            e.setAttribute('title', tags)
        }
    }
    return el
}
