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
  const [fullscreenAllowed, setFullscreenAllowed] = useState(false);
  const alertShownRef = useRef(false);

  useEffect(() => {
    const notifyPermission = () => {
      if (!document.fullscreenElement && !fullscreenAllowed && !alertShownRef.current) {
        alert("Recomendamos el uso de pantalla completa para ver los resultados. ¿Quieres activarla?");
        requestFullScreen();
        setFullscreenAllowed(true);
        alertShownRef.current = true; // Marcar que se ha mostrado la alerta
      }
    };

    const requestFullScreen = () => {
      const element = document.documentElement; // Obtén el elemento raíz para pantalla completa

      if (element.requestFullscreen) {
        element.requestFullscreen().catch((err) => {
          console.error('Error al intentar activar pantalla completa:', err);
        });
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen().catch((err) => {
          console.error('Error al intentar activar pantalla completa:', err);
        });
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen().catch((err) => {
          console.error('Error al intentar activar pantalla completa:', err);
        });
      }
    };

    notifyPermission(); // Llama a la función al cargar el componente

    // Limpiar el estado al desmontar el componente
    return () => {
      setFullscreenAllowed(false);
    };
  }, [fullscreenAllowed]);



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
        <label htmlFor="diseaseSelector" className="dropdown_drug">Enfermedad seleccionada:</label>
        <select id="diseaseSelector" value={selectedDisease} onChange={handleSelectDisease}>
          <option value="">Selecciona una enfermedad</option>
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
                    <label className="dropdown_drug" htmlFor="drugSelector">Gen seleccionado:</label>
                    <select className="dropdown_label" id="drugSelector" value={selectedDrug} onChange={(event) => setSelectedDrug(event.target.value)}>
                      <option value="">Ningún gen seleccionado</option>
                      {data.columns.slice(1).map((drug, index) => (
                        <option key={index} value={drug}>{drug}</option>
                      ))}
                    </select>
                  </div>
                  {selectedDrug && (
                    <div className="chart">
                      <h3>Gen: {selectedDrug}</h3>
                      <BarChartGene data={data} selectedDrug={selectedDrug} />
                    </div>
                  )}
                </div>
              </div>

              <div className="chart-container">
                <div className='barchart-container'>
                  <div className='dropdown-title'>
                    <label className="dropdown_circuit" htmlFor="circuitSelector">Circuito seleccionado:</label>
                    <select className="dropdown_label" id="circuitSelector" value={selectedCircuit} onChange={(event) => setSelectedCircuit(event.target.value)}>
                      <option value="">Ningún circuito seleccionado</option>
                      {data.map((d, index) => (
                        <option key={index} value={d.circuit_name}>{d.circuit_name}</option>
                      ))}
                    </select>
                  </div>
                  {selectedCircuit && (
                    <div className="chart">
                      <h3>Circuito: {selectedCircuit}</h3>
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
