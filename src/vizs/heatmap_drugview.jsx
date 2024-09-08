import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './heatmap_styles.css';

const Heatmap_drugview = ({ dataCrossed, onSelectDrug, onSelectCircuit }) => {
  console.log("Heatmap_drugview mounted");
  const ref = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    if (!dataCrossed || !dataCrossed.length) {
      console.log("No dataCrossed available", dataCrossed);
      return;
    }
  
    const margin = { top: 10, bottom: 150, left: 135, right: 10 };
    const height = 665 - margin.top - margin.bottom;
    const width = 739 - margin.left - margin.right;
  
    const svg = d3.select(ref.current)
      .attr("height", height + margin.top + margin.bottom)
      .attr("width", width + margin.left + margin.right);
  
    const g = svg.append("g")
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
  
    // Extraer columnas y nombres de circuitos
    const columns = dataCrossed[0] ? Object.keys(dataCrossed[0]).filter(key => key !== 'circuit_name') : [];
    const circuit_names = dataCrossed.map(d => d.circuit_name);
  
    console.log("columns:", columns);
    console.log("circuit_names:", circuit_names);
  
    const colorScale = d3.scaleSequential(d3.interpolateRdBu)
      .domain([1, -1]);
  
    const effectiveGridSizeX = width / columns.length;
    const effectiveGridSizeY = height / dataCrossed.length;
  
    console.log("effectiveGridSizeX:", effectiveGridSizeX);
    console.log("effectiveGridSizeY:", effectiveGridSizeY);
  
    const cellsdataCrossed = dataCrossed.reduce((acc, d) => {
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
  
    g.selectAll(".cell")
      .data(cellsdataCrossed)
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
      d3.select(this)
        .raise()
        .transition()
        .duration(100)
        .style("stroke", "#ff00f7")
        .style("stroke-width", "2px");
  
      g.selectAll(".x-axis text")
        .filter(text => text === d.key)
        .transition()
        .duration(100)
        .style("fill", "#ff00f7")
        .style("font-weight", "bold")
        
  
      g.selectAll(".y-axis text")
        .filter(text => text === d.name)
        .transition()
        .duration(100)
        .style("fill", "#ff00f7")
        .style("font-weight", "bold")
        
  
      tooltipRef.current.html(`Pathway: ${d.name}<br>Drug: ${d.key}<br>Value: ${d.value}`)
        .style("opacity", 1)
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 10) + "px");
    }
  
    function handleMouseMove(event) {
      tooltipRef.current.style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 10) + "px");
    }
  
    function handleMouseOut(event, d) {
      d3.select(this)
        .transition()
        .duration(100)
        .style("stroke", "#474747")
        .style("stroke-width", "1px");
  
      g.selectAll(".x-axis text, .y-axis text")
        .transition()
        .duration(100)
        .style("fill", "white")
        .style("font-weight", "normal")
        .style("font-size", "5px");
  
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
  
    const xAxis = g.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale).tickSize(0));
  
    xAxis.selectAll(".tick line, .domain")
      .remove();
  
    xAxis.selectAll(".x-axis text")
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
  
    const yAxis = g.append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(yScale).tickSize(0));
  
    yAxis.selectAll(".tick line, .domain")
      .remove();
  
    yAxis.selectAll(".y-axis text")
      .style("text-anchor", "end")
      .attr("dx", "-0.1em")
      .style("font-size", "5px")
      .style("color", "white");
  
    // Zoom functionality
    const zoom = d3.zoom()
      .scaleExtent([1, 10])
      .translateExtent([[0, 0], [width + margin.left + margin.right, height + margin.top + margin.bottom]])
      .extent([[margin.left, margin.top], [width, height]])
      .on("zoom", zoomed);
  
    svg.call(zoom);
  
    function zoomed(event) {
      g.attr("transform", event.transform);
    }
  
    svg.on("dblclick.zoom", null).on("dblclick", () => {
      svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity.translate(margin.left, margin.top));
    });
  
    return () => {
      d3.select(ref.current).selectAll("*").remove();
      tooltipRef.current.remove();
    };
  }, [dataCrossed, onSelectDrug, onSelectCircuit]);
  
  return <svg ref={ref} className="svg-heatmap"></svg>;
  
};

export default Heatmap_drugview;
