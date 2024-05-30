import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './heatmap_styles.css';

const Heatmap = ({ data, onSelectDrug, onSelectCircuit }) => {
  const ref = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    if (!data) return;

    const margin = { top: 10, bottom: 100, left: 150, right: 0 };
    const height = 670 - margin.top - margin.bottom;
    const width = 700 - margin.left - margin.right;

    const svg = d3.select(ref.current)
      .attr("height", height + margin.top + margin.bottom)
      .attr("width", width + margin.left + margin.right)
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

    const columns = data.columns.slice(1);
    const circuit_names = data.map(d => d.circuit_name);

    const colorScale = d3.scaleSequential(d3.interpolateRdBu)
      .domain([1, -1]);

    const effectiveGridSizeX = width / columns.length;
    const effectiveGridSizeY = height / data.length;

    const cellsData = data.reduce((acc, d) => {
      columns.forEach(key => {
        acc.push({
          name: d.circuit_name,
          key,
          value: +d[key],
          row: circuit_names.indexOf(d.circuit_name),
          col: columns.indexOf(key)
        });
      });
      return acc;
    }, []);

    svg.selectAll(".cell")
      .data(cellsData)
      .enter().append("rect")
      .attr("x", d => d.col * effectiveGridSizeX)
      .attr("y", d => d.row * effectiveGridSizeY)
      .attr("width", effectiveGridSizeX)
      .attr("height", effectiveGridSizeY)
      .attr("class", "cell")
      .style("fill", d => colorScale(d.value))
      .style("stroke", "#474747")
      .style("stroke-width", "1px")
      .on("mouseover", handleMouseOver)
      .on("mousemove", handleMouseMove)
      .on("mouseout", handleMouseOut)
      .on("click", handleClick)
      .style("cursor", "pointer");

    function handleMouseOver(event, d) {
      svg.selectAll(".cell")
        .filter(cell => cell.row !== d.row && cell.col !== d.col)
        .transition()
        .duration(100)
        .style("opacity", 0.3);

      svg.selectAll(".x-axis text")
        .filter(text => text !== d.key)
        .transition()
        .duration(100)
        .style("opacity", 0.3);

      svg.selectAll(".y-axis text")
        .filter(text => text !== d.name)
        .transition()
        .duration(100)
        .style("opacity", 0.3);

      tooltipRef.current.html(`Pathway: ${d.name}<br>Drug: ${d.key}<br>Value: ${d.value}`)
        .style("opacity", 1)
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 10) + "px");
    }

    function handleMouseMove(event) {
      tooltipRef.current.style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 10) + "px");
    }

    function handleMouseOut() {
      svg.selectAll(".cell")
        .transition()
        .duration(200)
        .style("opacity", 1);

      svg.selectAll(".x-axis text, .y-axis text")
        .transition()
        .duration(200)
        .style("opacity", 1);

      tooltipRef.current.style("opacity", 0);
    }

    function handleClick(event, d) {
      onSelectDrug(d.key); // Actualiza el gráfico de drogas
      onSelectCircuit(d.name); // Actualiza el gráfico de circuitos
    }

    const xScale = d3.scaleBand()
      .domain(columns)
      .range([0, width])
      .padding(0.05);

    svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale).tickSize(0))
      .selectAll(".tick line, .domain")
      .remove();

    svg.selectAll(".x-axis text")
      .attr("transform", "rotate(-90)")
      .attr("dy", "-0.5em")
      .attr("dx", "-0.5em")
      .style("text-anchor", "end")
      .style("font-size", "5px")
      .style("color", "white");

    const yScale = d3.scaleBand()
      .domain(circuit_names)
      .range([0, height])
      .padding(0.05);

    svg.append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(yScale).tickSize(0))
      .selectAll(".tick line, .domain")
      .remove();

    svg.selectAll(".y-axis text")
      .style("text-anchor", "end")
      .attr("dx", "-0.1em")
      .style("font-size", "5px")
      .style("color", "white");

    return () => {
      d3.select(ref.current).selectAll("*").remove();
      tooltipRef.current.remove();
    };
  }, [data, onSelectDrug, onSelectCircuit]);

  return <svg ref={ref}></svg>;
};

export default Heatmap;
