import React from 'react';
import Heatmap from '../vizs/heatmap';
import BarChartGene from '../vizs/barchart_gene';
import BarChartCircuit from '../vizs/barchart_circuit';
import StabilityChart from '../vizs/stability_chart';
import { CSVLink } from 'react-csv';
import './Results.css';

const Results = ({ data, selectedDrug, handleChange, handleSelectDrug, selectedCircuit, handleCircuitChange, handleSelectCircuit }) => {

  if (!data) {
    return <div>Loading...</div>; // Mostrar un mensaje de carga mientras se obtienen los datos
  }

  const columns = data.columns || Object.keys(data[0]);

  return (
    <div className='content'>
    <div className="visualization-container">
      <div className="heatmap-container">
        <Heatmap data={data} onSelectDrug={handleSelectDrug} onSelectCircuit={handleSelectCircuit} />
      </div>

      <div className="charts-container">
        <div className="chart-container">
          <div className='barchart-container'>
            <div className='dropdown-title'>
              <label className="dropdown_drug" htmlFor="drugSelector">Selecciona un gen:</label>
              <select className="dropdown_label" id="drugSelector" value={selectedDrug} onChange={handleChange}>
                <option value="">Ningún gen seleccionado</option>
                {columns.slice(1).map((drug, index) => (
                  <option key={index} value={drug}>{drug}</option>
                ))}
              </select>
            </div>
            {selectedDrug && (
              <div className="chart">
                <h3>Gráfico de Barras para {selectedDrug}</h3>
                <BarChartGene data={data} selectedDrug={selectedDrug} />
              </div>
            )}
          </div>
        </div>

        <div className="chart-container">
          <div className='barchart-container'>
            <div className='dropdown-title'>
              <label className="dropdown_circuit" htmlFor="circuitSelector">Selecciona un circuito:</label>
              <select className="dropdown_label" id="circuitSelector" value={selectedCircuit} onChange={handleCircuitChange}>
                <option value="">Ningún circuito seleccionado</option>
                {data.map((d, index) => (
                  <option key={index} value={d.circuit_name}>{d.circuit_name}</option>
                ))}
              </select>
            </div>
            {selectedCircuit && (
              <div className="chart">
                <h3>Gráfico de Barras para {selectedCircuit}</h3>
                <BarChartCircuit data={data} selectedCircuit={selectedCircuit} />
              </div>
            )}
          </div>
        </div>
        
      </div>
      
   
    </div>
      <div className='stability-container'>
        <h3>Stability Chart</h3>
        <StabilityChart />
      </div>
      </div>
    
  );
};

export default Results;
