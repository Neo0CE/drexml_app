import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import './stability_chart_styles.css';

const StabilityChart = () => {
  const svgRef = useRef();

  useEffect(() => {
    const margin = { top: 60, right: 20, bottom: 60, left: 100 };
    const height = 550 - margin.top - margin.bottom;
    const width = 600 - margin.right - margin.left;

    const svgContainer = d3.select(svgRef.current)
      .append("svg")
      .attr('height', height + margin.top + margin.bottom)
      .attr('width', width + margin.right + margin.left)
      .attr("id", "svg");

    const svg = svgContainer
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

   

    svg.append("text")
      .attr("id", "y_label")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - 80)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("R\u00B2 score")
      .style("fill", "white")

    svg.append("text")
      .attr("id", "x_label")
      .attr("y", height + 40)
      .attr("x", width / 2)
      .style("text-anchor", "middle")
      .text("Stability")
      .style("fill", "white")

        svg.append("text")
        .text("Stability values")
        .style("text-anchor", "start")
        .attr("x", 0)
        .attr("y", -30)
        .style("fill", "white")

    const tooltip = d3.select(svgRef.current).append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("position", "absolute")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px");

    svg.append("defs").append("svg:clipPath")
      .attr("id", "clip")
      .append("svg:rect")
      .attr("width", width)
      .attr("height", height)
      .attr("x", 0)
      .attr("y", 0);

    const initialXDomain = [0, 1];
    const initialYDomain = [0.4, 1];

    const xScale = d3.scaleLinear()
      .domain(initialXDomain)
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain(initialYDomain)
      .range([height, 0]);

    const xAxis = d3.axisBottom(xScale).tickValues([0.0, 0.4, 0.75, 1.0]).tickFormat(d3.format(".2f"));
    const yAxis = d3.axisLeft(yScale).tickValues([0.1, 0.4, 0.6, 0.8, 1.0]).tickFormat(d3.format(".1f"));

    const xAxisGroup = svg.append('g')
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)

    const yAxisGroup = svg.append('g')
      .call(yAxis)
     
      svg.selectAll("text")
      .attr("fill", "white")
      svg.selectAll(".domain, .tick line")
      .attr("stroke", "white");


    const brush = d3.brush()
      .extent([[0, 0], [width, height]])
      .on("end", updateChart);

    svg.append("g")
      .attr("class", "brush")
      .call(brush);

//

    d3.tsv("https://raw.githubusercontent.com/Neo0CE/TIA/main/Familial%20Melanoma_stability.tsv").then(function(data) {
      const filtData = data.filter(d => d.stability !== '' && d.stability_lower_95ci !== '' && d.stability_upper_95ci !== '').map(d => ({
        name: d.name,
        stability: +d.stability,
        r2_mean: +d.r2_mean,
        stability_lower_95ci: +d.stability_lower_95ci,
        stability_upper_95ci: +d.stability_upper_95ci
      }));

      const colorScale = d3.scaleThreshold()
        .domain([0.4, 0.75])
        .range(["#EC7063", "#F4D03F", "#58D68D"]);

      svg.append('g')
        .attr("clip-path", "url(#clip)")
        .selectAll(".point")
        .data(filtData)
        .enter()
        .append("circle")
        .attr("class", "point")
        .attr("r", 4)
        .attr("cx", d => xScale(d.stability))
        .attr("cy", d => yScale(d.r2_mean))
        .style("fill", d => colorScale(d.stability))
        .style("stroke", "black")
        .style("stroke-width", 1.1)
        .style("opacity", 0.8)
        .on("mouseover", (event, d) => {
          tooltip.style("opacity", 1);
          tooltip.html(`Name: ${d.name} <br> Stability: ${d.stability} <br> R2 score: ${d.r2_mean}`)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY + 10) + "px")
            .style("background-color", colorScale(d.stability))
        })
        .on("mouseleave", () => {
          tooltip.style("opacity", 0);
        });

      const legendData = [
        { color: "#EC7063", text: "Low: < 0.4" },
        { color: "#F4D03F", text: "Medium: 0.4 - 0.75" },
        { color: "#58D68D", text: "High: 0.75 - 1.0" }
      ];

      const legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${110}, ${-60})`);

      legend.selectAll(null)
        .data(legendData)
        .enter()
        .append("rect")
        .attr("x", 0)
        .attr("y", (d, i) => i * 20)
        .attr("width", 13)
        .attr("height", 13)
        .style("fill", d => d.color);

      legend.selectAll(null)
        .data(legendData)
        .enter()
        .append("text")
        .attr("class", "leg_text")
        .attr("x", 20)
        .attr("y", (d, i) => i * 20 + 11)
        .text(d => d.text)
        .style("font-size", "15px")
        .style("text-anchor", "start")
        .style("fill", "white")
    });

    function updateChart(event) {
      const selection = event.selection;
      if (!selection) return;

      const [[x0, y0], [x1, y1]] = selection;
      xScale.domain([x0, x1].map(xScale.invert));
      yScale.domain([y1, y0].map(yScale.invert));

      xAxisGroup.transition(500).call(d3.axisBottom(xScale));

      yAxisGroup.transition(500).call(d3.axisLeft(yScale));

      svg.selectAll("text")
      .attr("fill", "white")
      svg.selectAll(".domain, .tick line")
      .attr("stroke", "white");

      svg.selectAll(".point")
        .transition(1000)
        .attr("cx", d => xScale(d.stability))
        .attr("cy", d => yScale(d.r2_mean));

      svg.select(".brush").call(brush.move, null);
    }

    function resetChart() {
      xScale.domain(initialXDomain);
      yScale.domain(initialYDomain);

      xAxisGroup.transition().duration(500).call(xAxis);
      yAxisGroup.transition().duration(500).call(yAxis);

      svg.selectAll("text")
      .attr("fill", "white")
      svg.selectAll(".domain, .tick line")
      .attr("stroke", "white");

      svg.selectAll(".point")
        .transition().duration(1000)
        .attr("cx", d => xScale(d.stability))
        .attr("cy", d => yScale(d.r2_mean));
    }

    svgContainer.on("dblclick", resetChart);

    return () => {
      d3.select(svgRef.current).select("svg").remove();
    };
  }, []);

  return (
    <div id="vizholder" ref={svgRef}></div>
  );
};

export default StabilityChart;
