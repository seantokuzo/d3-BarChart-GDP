const rootDiv = document.getElementById('root')

fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        const gdpData = data.data
        console.log(gdpData)
        const w = 600
        const h = 400
        const barWidth = w / 275
        const padding = 50

        const xScale = d3.scaleLinear()
            .domain([0, w])
            .range([padding, w - padding])

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(gdpData, (d) => d[1])])
            .range(padding, h - padding)

        const svg = d3.select('.svg-div')
            .append('svg')
            .attr('width', w)
            .attr('height', h)

        svg.selectAll('rect')
            .data(gdpData)
            .enter()
            .append('rect')
            .attr('x', (d, i) => xScale(i * 20))
            .attr('y', (d, i) => yScale(h - (d[1] * 3)))
            .attr('width', barWidth)
            .attr('height', (d, i) => yScale(d[1] * 3))
            .attr('fill', 'red')

    })