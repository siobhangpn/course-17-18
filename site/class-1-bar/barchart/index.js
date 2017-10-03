// Source: Mike Bostock (https://gist.github.com/mbostock) (https://bl.ocks.org/mbostock)
// Based on: https://bl.ocks.org/mbostock/raw/3885304/
// License: https://opensource.org/licenses/GPL-3.0

var svg = d3.select("svg"),
    margin = {
        top: 80,
        right: 20,
        bottom: 20,
        left: 60
    },
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;



var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);



var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



d3.tsv("data.tsv", function(d) {
  d.frequency = +d.frequency;
  return d;}, function(error, data) {
  if (error) throw error;

    
    
  x.domain(data.map(function(d) {
      return d.songs;
  }));
  
    
    y.domain([0, d3.max(data, function(d) {
    return d.frequency;
})]);

    
  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    
    
  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(15))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Frequency");

    
    
  g.selectAll(".bar")
    .data(data)
  
  
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.songs); })
      .attr("y", function(d) { return y(d.frequency); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.frequency); 
    });
    
});


