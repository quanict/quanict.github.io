let chart = function(data){
  const root = tree(data);
  console.log("debug",data);
  const svg = d3.create("svg")
  // const svg = d3.select("svg")
      .style("max-width", "100%")
      .style("height", "auto")
      .style("font", "10px sans-serif")
      .style("margin", "5px");

  const link = svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5)
    .selectAll("path")
    .data(root.links())
    .join("path")
      .attr("d", d3.linkRadial()
          .angle(d => d.x)
          .radius(d => d.y));
  
  const node = svg.append("g")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 3)
    .selectAll("g")
    .data(root.descendants().reverse())
    .join("g")
      .attr("transform", d => `
        rotate(${d.x * 180 / Math.PI - 90})
        translate(${d.y},0)
      `);

  node.append("circle")
      .attr("fill", d => d.children ? "#555" : "#999")
      .attr("r", 2.5);
  
  node.append("text")
      .attr("dy", "0.31em")
      .attr("x", d => d.x < Math.PI === !d.children ? 6 : -6)
      .attr("text-anchor", d => d.x < Math.PI === !d.children ? "start" : "end")
      .attr("transform", d => d.x >= Math.PI ? "rotate(180)" : null)
      .text(d => d.data.name)
    .clone(true).lower()
      .attr("stroke", "white");

  	//yield svg.node();

  svg.attr("viewBox", autoBox);
};

var tree = data => d3.tree()
    .size([2 * Math.PI, radius])
    .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth)
  (d3.hierarchy(data));

function autoBox() {
  const {x, y, width, height} = this.getBBox();
  return [x, y, width, height];
}
// var tree = data => d3.tree()
//     .size([2 * Math.PI, radius])
//     .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth)
//   (d3.hierarchy(data))
var width = 932,
	radius = width / 2;
// var data = d3.json("flare.json");

var data = d3.json("https://raw.githubusercontent.com/d3/d3-hierarchy/v1.1.8/test/data/flare.json");
console.log("call radial tidy tree",data);

/*
https://observablehq.com/@d3/radial-tidy-tree?collection=@d3/d3-hierarchy
 */
