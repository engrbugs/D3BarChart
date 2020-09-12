console.log('start');
var width = $(window).width();
console.log('screen width:', width);
fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
    .then(res => res.json())
    .then(res => {
        const { data } = res;
        console.log(data);
        console.log(data.length);
        createGraph(data);
    })


function createGraph(data) {
    console.log(data);
    var width = 800,
        height = 400,
        barWidth = width / (data.length);

 
    const gdpScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d[1])])
        .range([0, height]);
    
    const svg = d3.select('body').append('svg')
        .attr('width', width)
        .attr('height', height);
    
    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (d, i) => i * barWidth)
        .attr('y', d => height - gdpScale(d[1]))
        .attr('width', barWidth)
        .attr('height', d => gdpScale(d[1]) + 'px');
    

}
