const cloudConfig = ({
        minFontSize: 10,
        maxFontSize: 80,
        height: width/2,
        padding: 1,
    }),
    fontFamilies = ['Corben', 'Pacifico', 'impact'],
    cloudScale = 1
;

let rotateWord = function () {
    return ~~(Math.random() * 4) * 45 - 45;
}
;
function downloadWordCloudSvg(fileName, svg) {
    return html `${DOM.download(serialize(svg), `${fileName}.svg`, "Save SVG")}`;
}

function createWordCloudSvg(words) {
    var layout = d3cloud()
        .size([width, width * 9/16])
        .words(words)
        .padding(cloudConfig.padding * cloudScale)
        .rotate(rotateWord)
        .font(baseFont)
        .fontSize(fontSize)
        .on('word', addWord);

    //const svg = DOM.svg(layout.size()[0], layout.size()[1]); // width, height
    const svg =  document.getElementById('svg-chart');
    svg.style.width = layout.size()[0];
    svg.style.height = layout.size()[1];
    console.warn("debug svg",{svg,words});
    const group = d3.select(svg).append('g');
    //.attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")

    function addWord (word) {
        const text = group.append('text');
        text.style('font-size', '2px')
            .style('font-family', word.font)
            .style('fill', wordColors(Math.random()))
            .style('cursor', 'pointer')
            .attr('text-anchor', 'middle')
            .attr('transform', `translate(${[word.x, word.y]})rotate(${word.rotate})`)
            .text(word.text)
            //.transition()
            //.duration(1500)
            //.ease(d3.easeLinear)
            .style('font-size', `${word.size}px`);
        text.append('title').text(`${word.text} (${word.count})`); // toolitp
    }

    layout.start();
    return svg;
}

function toWords (terms) {
    return terms.map(term => ({
        text: term.normal,
        count: term.count,
        freq: term.percent/100
    }));
}

const wordColors = d3.scaleSequential(d3.interpolateRainbow);

const baseFont = function (d) {
    return fontFamilies[~~(Math.random() * fontFamilies.length)]
};

const frequencyToSize = function (frequency) {
    return Math.sqrt(frequency);
};

const fontSize = ()=>{
    let totalArea = 0;
let minSize = frequencyToSize(words[words.length-1].freq);
let maxSize = frequencyToSize(words[0].freq);
for (let w of words) {
    let size = frequencyToSize(w.freq);
    let fontSize = cloudConfig.minFontSize +
        (cloudConfig.maxFontSize - cloudConfig.minFontSize) * ((size-minSize) / (maxSize-minSize));
    totalArea += (w.text.length * 0.6 + cloudConfig.padding * 2) * fontSize * (fontSize + cloudConfig.padding * 2);
}
let s = Math.sqrt(width * cloudConfig.height/totalArea);
let cloudScale = s;
return function (w) {
    return s * (cloudConfig.minFontSize +
        (cloudConfig.maxFontSize - cloudConfig.minFontSize) * ((frequencyToSize(w.freq) - minSize) / (maxSize - minSize))
    );
}
}