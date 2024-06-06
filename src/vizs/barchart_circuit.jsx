import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChartCircuit = ({ data, selectedCircuit }) => {
  const svgRef = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    if (!data || !selectedCircuit) return;

    const circuitData = data.find(d => d.circuit_name === selectedCircuit);
    if (!circuitData) return;

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 500- margin.left - margin.right;
    const height = 290.5 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

      tooltipRef.current = d3.select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "3px")
      .style("padding", "5px")
      .style("opacity", 0);

    const x = d3.scaleBand()
      .domain(Object.keys(circuitData).slice(1)) // Exclude "circuit_name"
      .range([0, width])
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([-1, 1]) // Assuming the range of values for bars
      .range([height, 0]);

    // Color scale
    const colorScale = d3.scaleSequential(d3.interpolateRdBu)
      .domain([1, -1]); // Adjust domain according to your data

    // X Axis
    svg.append("line")
    .attr("x1", 0)
    .attr("y1", y(0))
    .attr("x2", width)
    .attr("y2", y(0))
    .attr("stroke", "white")
    .attr("stroke-width", 1);

    // Y Axis
    svg.append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .attr("fill", "white");

    // Styling axis lines
    svg.selectAll(".domain")
      .attr("stroke", "white");

    // Bars
    svg.selectAll(".bar")
      .data(Object.keys(circuitData).slice(1)) // Exclude "circuit_name"
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d))
      .attr("width", x.bandwidth())
      .attr("y", d => y(Math.max(0, circuitData[d]))) // Start from y=0 for positive values
      .attr("height", d => Math.abs(y(circuitData[d]) - y(0))) // Calculate height based on y scale
      .attr("fill", d => colorScale(circuitData[d])) // Apply color scale to bar fill
      .on("mouseover", mouseover)
      .on("mousemove", handleMouseMove)
      .on("mouseout", mouseout)

      function mouseover(event, d) {
        d3.select(this)
        .raise()
          .transition()
          .duration(100)
          .style("stroke", "#ff00f7")
          .style("stroke-width", "1px");

        tooltipRef.current.html(`${d}<br> Value: ${circuitData[d]}`)
                .style("opacity", 1)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 10) + "px");
      }
      
      function handleMouseMove(event) {
        tooltipRef.current.style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 10) + "px");
      }
      
      function mouseout(event, d) {
        d3.select(this)
  .transition()
  .duration(100)
  .style("stroke-width", "0px");
  
        tooltipRef.current.style("opacity", 0);
      }


    return () => {
      d3.select(svgRef.current).selectAll("*").remove(); // Clean up on unmount
    };

  }, [data, selectedCircuit]);

  return (
    <svg ref={svgRef}></svg>
  );
};

export default BarChartCircuit;
