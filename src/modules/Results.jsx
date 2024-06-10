import React, { useState, useEffect, useRef } from 'react';
import Heatmap from '../vizs/heatmap';
import BarChartGene from '../vizs/barchart_gene';
import BarChartCircuit from '../vizs/barchart_circuit';
import StabilityChart from '../vizs/stability_chart';
import './Results.css';

const Results = ({ dataMap }) => {
  const [selectedDisease, setSelectedDisease] = useState("");
  const [selectedDrug, setSelectedDrug] = useState("");
  const [selectedCircuit, setSelectedCircuit] = useState("");
  const [data, setData] = useState(null);
  const alertShownRef = useRef(false);

  useEffect(() => {
    const notifyPermission = () => {
      if (!document.fullscreenElement && !alertShownRef.current) {
        const userAgreed = window.confirm("In order to get the best experience full screen is recommended. Do you want to activate It?");
        if (userAgreed) {
          requestFullScreen();
        }
        alertShownRef.current = true; // Marcar que se ha mostrado la alerta
      }
    };

    const requestFullScreen = () => {
      const element = document.documentElement; // Obtén el elemento raíz para pantalla completa

      if (element.requestFullscreen) {
        element.requestFullscreen().catch((err) => {
          console.error('Error ativating full screen:', err);
        });
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen().catch((err) => {
          console.error('Error ativating full screen:', err);
        });
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen().catch((err) => {
          console.error('Error ativating full screen:', err);
        });
      }
    };

    notifyPermission(); // Llama a la función al cargar el componente
  }, []);



  useEffect(() => {
    if (selectedDisease && dataMap[selectedDisease]) {
      setData(dataMap[selectedDisease]);
    } else {
      setData(null);
    }
  }, [selectedDisease, dataMap]);

  const handleSelectDisease = (event) => {
    setSelectedDisease(event.target.value);
    setSelectedDrug("")
    setSelectedCircuit("")
  };

  if (!dataMap) {
    return <div>Loading...</div>; // Muestra un mensaje de carga mientras se obtienen los datos
  }

  const diseases = Object.keys(dataMap);

  return (
    <div className='content'>
      <div className="disease-selector">
        <label htmlFor="diseaseSelector" className="dropdown_disease">Selected disease:</label>
        <select className="dropdown_label" id="diseaseSelector" value={selectedDisease} onChange={handleSelectDisease}>
          <option value="">Select a disease</option>
          {diseases.map((disease) => (
            <option key={disease} value={disease}>{disease}</option>
          ))}
        </select>
      </div>

      <div className="visualization-container">
        {data && (
          <>
            <div className="heatmap-container" >
              <Heatmap data={data} onSelectDrug={setSelectedDrug} onSelectCircuit={setSelectedCircuit} />
            </div>

            <div className="charts-container">
              <div className="chart-container">
                <div className='barchart-container'>
                  <div className='dropdown-title'>
                    <label className="dropdown_drug" htmlFor="drugSelector">Selected Gene:</label>
                    <select className="dropdown_label" id="drugSelector" value={selectedDrug} onChange={(event) => setSelectedDrug(event.target.value)}>
                      <option value="">No gene selected</option>
                      {data.columns.slice(1).map((drug, index) => (
                        <option key={index} value={drug}>{drug}</option>
                      ))}
                    </select>
                  </div>
                  {selectedDrug && (
                    <div className="chart">
                      <BarChartGene data={data} selectedDrug={selectedDrug} />
                    </div>
                  )}
                </div>
              </div>

              <div className="chart-container">
                <div className='barchart-container'>
                  <div className='dropdown-title'>
                    <label className="dropdown_circuit" htmlFor="circuitSelector">Selected Pathway:</label>
                    <select className="dropdown_label" id="circuitSelector" value={selectedCircuit} onChange={(event) => setSelectedCircuit(event.target.value)}>
                      <option value="">No pathway selected</option>
                      {data.map((d, index) => (
                        <option key={index} value={d.circuit_name}>{d.circuit_name}</option>
                      ))}
                    </select>
                  </div>
                  {selectedCircuit && (
                    <div className="chart">
                      <BarChartCircuit data={data} selectedCircuit={selectedCircuit} />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className='stability-container'>
              <h3>Stability Chart</h3>
              <StabilityChart onChange={handleSelectDisease}/>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Results;
