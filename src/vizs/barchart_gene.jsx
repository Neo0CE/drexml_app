import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChartGene = ({ data, selectedDrug }) => {
  const ref = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    if (!data || !selectedDrug) return;

    const drugData = data.map(d => ({
      circuit_name: d.circuit_name,
      value: +d[selectedDrug]
    }));

    if (!drugData) {
      console.log(`No se encontraron datos para la droga: ${selectedDrug}`);
      return;
    }

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 500 - margin.left - margin.right;
    const height = 290.5 - margin.top - margin.bottom;

    const svg = d3.select(ref.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    svg.selectAll("*").remove(); // Limpia cualquier contenido previo

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

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

    const colorScale = d3.scaleSequential(d3.interpolateRdBu)
      .domain([1, -1]);

    const x = d3.scaleBand()
      .domain(drugData.map(d => d.circuit_name))
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([-1, 1])
      .range([height, 0]);

    // Eje x sin ticks ni etiquetas
    g.append("line")
      .attr("x1", 0)
      .attr("y1", y(0))
      .attr("x2", width)
      .attr("y2", y(0))
      .attr("stroke", "white")
      .attr("stroke-width", 1);

    // Eje y
    g.append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .attr("fill", "white"); // Color de las etiquetas del eje Y

    // Cambiar el color de las líneas de los ejes a blanco
    g.selectAll(".domain, .tick line")
      .attr("stroke", "white");
// Barras
g.selectAll(".bar")
  .data(drugData)
  .enter().append("rect")
  .attr("class", "bar")
  .attr("x", d => x(d.circuit_name))
  .attr("width", x.bandwidth())
  .attr("y", d => d.value >= 0 ? y(d.value) : y(0))
  .attr("height", d => Math.abs(y(d.value) - y(0)))
  .attr("fill", d => colorScale(d.value))
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

  tooltipRef.current.html(`${d.circuit_name}<br> Value: ${d.value}`)
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

  }, [data, selectedDrug]);

  return (
    <svg ref={ref}></svg>
  );
};

export default BarChartGene;
