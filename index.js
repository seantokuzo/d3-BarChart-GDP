const rootDiv = document.getElementById('root')
var tooltip = d3
    .select('.svg-div')
    .append('div')
    .attr('id', 'tooltip')
    .style('opacity', 0);

var overlay = d3
    .select('.svg-div')
    .append('div')
    .attr('class', 'overlay')
    .style('opacity', 0);

fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        const gdpData = data.data.map(item => item[1])
        const gdpMax = d3.max(gdpData, (d) => d)
        const gdpMin = d3.min(gdpData, (d) => d)
        const datesData = data.data.map(item => new Date(item[0]))
        const dateMax = d3.max(datesData)
        const dateMin = d3.min(datesData)
        const w = (16 * 45)
        const h = (9 * 45)
        const barWidth = (w / 275) * .6
        const padding = 50

        const xScale = d3.scaleTime()
            .domain([dateMin, dateMax])
            .range([padding, w - padding])

        const yScale = d3.scaleLinear()
            .domain([0, gdpMax])
            .range([h - padding, padding])

        const scaledGDP = gdpData.map(gdp => Math.floor(yScale(gdp)))
        console.log(gdpData[0])
        console.log(scaledGDP)

        const svg = d3.select('.svg-div')
            .append('svg')
            .attr('width', w)
            .attr('height', h)

        svg.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('x', -300)
            .attr('y', 75)
            .attr('font-family', 'sans-serif')
            .text('Gross Domestic Product')
        svg.append('text')
            .attr('x', w / 3.15)
            .attr('y', h - (padding / 8))
            .text('More Information: http://www.bea.gov/national/pdf/nipaguid.pdf')
            .attr('class', 'info')
            .attr('font-family', 'sans-serif')

        var years = data.data.map(function (item) {
            var quarter;
            var temp = item[0].substring(5, 7);

            if (temp === '01') {
                quarter = 'Q1';
            } else if (temp === '04') {
                quarter = 'Q2';
            } else if (temp === '07') {
                quarter = 'Q3';
            } else if (temp === '10') {
                quarter = 'Q4';
            }

            return item[0].substring(0, 4) + ' ' + quarter;
        })
        console.log(years)

        svg.selectAll('rect')
            .data(gdpData)
            .enter()
            .append('rect')
            .attr('data-date', (d, i) => data.data[i][0])
            .attr('data-gdp', (d, i) => data.data[i][1])
            .attr('x', (d, i) => xScale(datesData[i]))
            .attr('y', (d) => yScale(d))
            .attr('width', barWidth)
            .attr('height', (d) => h - yScale(d) - padding)
            .attr("class", "bar")
            .attr('fill', 'grey')
            .attr('index', (d, i) => i)
            .on('mouseover', function (event, d) {

                var i = this.getAttribute('index')

                overlay
                    .transition()
                    .duration(0)
                    .style('height', d + 'px')
                    .style('width', barWidth + 'px')
                    .style('opacity', 0.9)
                    .style('left', i * barWidth + 0 + 'px')
                    .style('top', h - d + 'px')
                    .style('transform', 'translateX(60px)')
                tooltip.transition().duration(200).style('opacity', 0.9)
                tooltip
                    .html(
                        years[i] +
                        '<br>' +
                        '$' +
                        gdpData[i].toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') +
                        ' Billion'
                )
                    .style('font-family', 'sans-serif')
                    .attr('data-date', data.data[i][0])
                    .style('left', i * (w / 275) + 30 + 'px')
                    .style('top', h - 50 + 'px')
                    .style('transform', 'translateX(60px)')
            })
            .on('mouseout', function () {
                tooltip.transition().duration(200).style('opacity', 0)
                overlay.transition().duration(200).style('opacity', 0)
            })

        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        svg.append("g")
            .call(xAxis)
            .attr('id', 'x-axis')
            .attr("transform", "translate(0," + (h - padding) + ")")

        svg.append("g")
            .call(yAxis)
            .attr('id', 'y-axis')
            .attr("transform", "translate(" + padding + ", 0)")


        // console.log(gdpData)
        // console.log(gdpMax)
        // console.log(gdpMin)
    })