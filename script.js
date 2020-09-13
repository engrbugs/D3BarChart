
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
        xPadding = 60,
        yPadding = 40,
        xyrPadding = 40,
        barWidth = (width) / (data.length);

    var xMax = new Date(d3.max(data, d => new Date(d[0])));
    xMax.setMonth(xMax.getMonth() + 3);
    console.log('MYxMax:', d3.min(data, d => new Date(d[0])));

    var xScale = d3.scaleTime()
        .domain([d3.min(data, d => new Date(d[0])), xMax])
        .range([xPadding, width + xPadding]) 

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d[1])])
        .range([height + yPadding, yPadding]);
    
    var svg = d3.select('body').append('svg')
        .attr('width', width + xPadding + xyrPadding)
        .attr('height', height + yPadding + xyrPadding);
    
    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('data-date', d => d[0])
        .attr('data-gdp',d => d[1])
        .attr('x', (d, i) => i * barWidth + xPadding)
        .attr('y', d => yScale(d[1]) - yPadding + xyrPadding)
        .attr('width', barWidth)
        .attr('height', d => height - yScale(d[1]) + yPadding + 'px');

    tooltop
    var xAxis = d3.axisBottom(xScale);

    var xAxisGroup = svg.append('g')
        .attr('transform', `translate(0, ${height+xyrPadding})`)
        .attr('id', 'x-axis')
        .call(xAxis);

    var yAxis = d3.axisLeft(yScale)

    var yAxisGroup = svg.append('g')
        .attr('transform', `translate(${xPadding}, -${yPadding-xyrPadding})`)
        .attr('id', 'y-axis')
        .call(yAxis);
}
