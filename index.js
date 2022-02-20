const rootDiv = document.getElementById('root')

fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        const gdpData = data.data.map(item => item[1])
        const gdpMax = d3.max(gdpData, (d) => d)
        const gdpMin = d3.min(gdpData, (d) => d)
        console.log(gdpData)
        console.log(gdpMax)
        console.log(gdpMin)
        const w = 1000
        const h = 500
        const barWidth = (w / 275) - ((w / 275) * .2)
        const padding = 20

        const xScale = d3.scaleLinear()
            .domain([0, w])
            .range([padding, w - padding])
        const yScale = d3.scaleLinear()
            .domain([0, gdpMax])
            .range([0, h - padding])

        const svg = d3.select('.svg-div')
            .append('svg')
            .attr('width', w)
            .attr('height', h)

        svg.selectAll('rect')
            .data(gdpData)
            .enter()
            .append('rect')
            .attr('x', (d, i) => xScale(i * (w / 275)))
            .attr('y', (d) => h - yScale(d) - padding)
            .attr('width', xScale(barWidth) - 11)
            .attr('height', (d) => yScale(d))
            .attr('fill', 'grey')

        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        // svg.append("g")
        //     .attr("transform", "translate(0," + (h - padding) + ")")
        //     .call(xAxis)
        svg.append("g")
            .call(xAxis)
            .attr('id', 'x-axis')
            .attr("transform", "translate(0," + (h - padding) + ")")

        svg.append("g")
            .call(yAxis)
            .attr('id', 'y-axis')
            .attr("transform", "translate(0, " + padding + ")")


        // svg.append("rect")
        //     .attr("x", 0)
        //     .attr("y", 0)
        //     .attr("height", h)
        //     .attr("width", w)
        //     .style("stroke", '#000000')
        //     .style("fill", "none")
        //     .style("stroke-width", '1px')

    })

// const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];
// const w = 500;
// const h = 100;
// const svg = d3.select(".svg-div")
//     .append("svg")
//     .attr("width", w)
//     .attr("height", h);
//     svg.selectAll("rect")
//         .data(dataset)
//         .enter()
//         .append("rect")
//         .attr("x", (d, i) => i * 30)
//         .attr("y", (d, i) => h - 3 * d)
//         .attr("width", 25)
//         .attr("height", (d, i) => d * 3)
//         .attr("fill", "navy")

//     svg.selectAll("text")
//         .data(dataset)
//         .enter()
//         .append("text")
//         .attr("x", (d, i) => i * 30)
//         .attr("y", (d, i) => h - 3 * d - 3)
//         .text((d, i) => d)
//         .style("font-size", "25px")
//         .style("fill", "red")
//         .attr("class", "bar")
//         .append("title")
//         .text((d) => d)