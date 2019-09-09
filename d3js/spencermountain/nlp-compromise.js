//helper function to render a document as colored terms
function printHtml(doc){
    let el = DOM.element()
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