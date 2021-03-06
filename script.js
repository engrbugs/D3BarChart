const tooltip = document.getElementById('tooltip');

fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
    .then(res => res.json())
    .then(res => {
        const { data } = res;
        createGraph(data);
    })

function createGraph(data) {
    var width = $(window).width() - 480,
        height = $(window).height() - 280,
        xPadding = 60,
        yPadding = 40,
        xyrPadding = 40,
        barWidth = (width) / (data.length);

    var xMax = new Date(d3.max(data, d => new Date(d[0])));
    xMax.setMonth(xMax.getMonth() + 3);

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
        .attr('height', d => height - yScale(d[1]) + yPadding + 'px')
        .on('mousemove',  (d, item) => {
            let yearLine = "";
            switch(item[0].substring(5, 7)) {
                case '01':
                    yearLine = item[0].substring(0, 4) + ' Q1';
                    break;
                case '04':
                    yearLine = item[0].substring(0, 4) + ' Q2';
                    break;
                case '07':
                    yearLine = item[0].substring(0, 4) + ' Q3';
                    break;
                case '10':
                    yearLine = item[0].substring(0, 4) + ' Q4';
                    break;
                default:
                  // code block
              };

            let gdpLine = "$ " + item[1].toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' Billion' 

            tooltip.style.left = d.pageX + xyrPadding + 'px';
            tooltip.style.top = height + xyrPadding + 'px';
            tooltip.innerHTML = yearLine + "<br/>" + gdpLine;
            tooltip.setAttribute("data-date", item[0]);
        })
        .on('mouseover', () => tooltip.style.visibility = "visible")
        .on('mouseout', () => tooltip.style.visibility = "hidden")



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
