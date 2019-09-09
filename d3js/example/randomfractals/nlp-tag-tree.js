function createTagTree(uniqueTags) {
    const map = new Map();
    for (const tagType of tagTypes) {
        map.set(tagType, {name: tagType, children: []});
    }
    for (const tag of uniqueTags.children) {
        const tagTypes = tag.children[0].tags;
        for (const tagType of tagTypes) {
            const type = map.get(tagType);
            if (type) {
                type.children.push({name: tag.name, count: tag.children.length, color: tagColors[tagType]});
                type.color = tagColors[tagType];
                break;
            }
        }
    }
    return {name: 'term', children: [...map.values()]};
}
function getUniqueTags(tags) {
    const map = new Map();
    for (const tag of tags) {
        let group = map.get(tag.normal);
        if (!group) {
            group = {name: tag.normal, children: []};
            map.set(tag.normal, group);
        }
        group.children.push(tag);
        tag.targets = [];
    }
    return {name: 'tags', children: [...map.values()]};
}

function createTagTreeSvg(tagTree) {
    const root = getRoot(tagTree);
    let x0 = Infinity;
    let x1 = -x0;
    root.each(d => {
        if (d.x > x1) x1 = d.x;
        if (d.x < x0) x0 = d.x;
    });
    const svg = d3.select(DOM.svg(width, x1 - x0 + root.dx * 2))
        .style("width", "100%")
        .style("height", "auto");

    const g = svg.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("transform", `translate(${root.dy / 3},${root.dx - x0})`);

    const link = g.append("g")
        .attr("fill", "none")
        .attr("stroke", "#555")
        .attr("stroke-opacity", 0.4)
        .attr("stroke-width", 1.5)
        .selectAll("path")
        .data(root.links())
        .enter().append("path")
        .attr("d", d3.linkHorizontal()
            .x(d => d.y)
            .y(d => d.x));

    const node = g.append("g")
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 3)
        .selectAll("g")
        .data(root.descendants().reverse())
        .enter().append("g")
        .attr("transform", d => `translate(${d.y},${d.x})`);

    node.append("circle")
        .attr("fill", d => d.children ? "#555" : d.data.color) //"#999")
        .attr("r", 2.5);

    node.append("text")
        .attr("dy", "0.31em")
        .attr("x", d => d.children ? -6 : 6)
        .attr("text-anchor", d => d.children ? "end" : "start")
        .attr("fill", d => d.data.color)
        .text(d => d.data.count ? `${d.data.count} ${d.data.name}`: `${d.data.children.length} ${d.data.name}s`)
        .clone(true).lower()
        .attr("stroke", "white");

    return svg.node();
}

function downloadTagTreeSvg(fileName, svg) {
    return html `${DOM.download(serialize(svg), `${fileName}.svg`, "Save SVG")}`;
}