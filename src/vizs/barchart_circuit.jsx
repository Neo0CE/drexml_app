import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChartCircuit = ({ data, selectedCircuit }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || !selectedCircuit) return;

    const circuitData = data.find(d => d.circuit_name === selectedCircuit);
    if (!circuitData) return;

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 500 - margin.left - margin.right;
    const height = 250 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const x = d3.scaleBand()
      .domain(Object.keys(circuitData).slice(1)) // Exclude "circuit_name"
      .range([0, width])
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([-1, 1]) // Assuming the range of values for bars
      .range([height, 0]);

    // Escala de color
    const colorScale = d3.scaleSequential(d3.interpolateRdBu)
      .domain([1, -1]); // Ajusta el dominio según tus datos

    svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .call(d3.axisBottom(x).tickFormat(''));

    svg.append("g")
    .call(d3.axisLeft(y))
    .selectAll("text")
    .attr("fill", "white");

    svg.selectAll(".domain, .tick line")
    .attr("stroke", "white");

    svg.selectAll(".bar")
      .data(Object.keys(circuitData).slice(1)) // Exclude "circuit_name"
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d))
      .attr("width", x.bandwidth())
      .attr("y", d => y(circuitData[d]))
      .attr("height", d => height - y(circuitData[d]))
      .attr("fill", d => colorScale(circuitData[d])); // Aplica la escala de color al relleno de las barras

      return () => {
        d3.select(svgRef.current).selectAll("*").remove(); // Limpia en desmontaje
      };

  }, [data, selectedCircuit]);

  return (
    <svg ref={svgRef}></svg>
  );
};

export default BarChartCircuit;
