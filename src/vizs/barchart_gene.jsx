import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChartGene = ({ data, selectedDrug }) => {
  const ref = useRef();

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
    const height = 250 - margin.top - margin.bottom;

    const svg = d3.select(ref.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    svg.selectAll("*").remove(); // Limpia cualquier contenido previo

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const colorScale = d3.scaleSequential(d3.interpolateRdBu)
      .domain([1, -1]);

    const x = d3.scaleBand()
      .domain(drugData.map(d => d.circuit_name))
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([-1,1])
      .range([height, 0]);

    // Ejes
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .call(d3.axisBottom(x).tickFormat(''));

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
      .attr("y", d => y(d.value))
      .attr("height", d => height - y(d.value))
      .attr("fill", d => colorScale(d.value));

  }, [data, selectedDrug]);

  return (
    <svg ref={ref}></svg>
  );
};

export default BarChartGene;
