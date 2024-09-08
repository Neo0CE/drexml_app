import React, { useState, useEffect, useRef } from 'react';
import Heatmap from '../vizs/heatmap';
import Heatmap_drugview from '../vizs/heatmap_drugview';
import BarChartGene from '../vizs/barchart_gene';
import BarChartCircuit from '../vizs/barchart_circuit';
import StabilityChart from '../vizs/stability_chart';
import './Results.css';

const Results = ({ dataMap, dataCrossed }) => {
  const [selectedDisease, setSelectedDisease] = useState("");
  const [selectedDrug, setSelectedDrug] = useState("");
  const [selectedCircuit, setSelectedCircuit] = useState("");
  const [data, setData] = useState(null);
  const [dataCrossedForDisease, setDataCrossedForDisease] = useState(null);
  const [view, setView] = useState("");
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

    if (selectedDisease && dataCrossed[selectedDisease]) {
      setDataCrossedForDisease(dataCrossed[selectedDisease]);
    } else {
      setDataCrossedForDisease(null);
    }
  }, [selectedDisease, dataMap, dataCrossed]);

  const handleSelectDisease = (event) => {
    setSelectedDisease(event.target.value);
    setSelectedDrug("")
    setSelectedCircuit("")
  };

  const handleViewChange = (view) => {
    setView(view);
  };

  if (!dataMap) {
    return <div>Loading...</div>; // Muestra un mensaje de carga mientras se obtienen los datos
  }

  const diseases = Object.keys(dataMap);


  return (

    
    <div className='content'>

      <div className="header-slector">
      <div className="disease-selector">
        <label htmlFor="diseaseSelector" className="dropdown_disease">Selected disease:</label>
        <select className="dropdown_label" id="diseaseSelector" value={selectedDisease} onChange={handleSelectDisease}>
          <option value="">Select a disease</option>
          {diseases.map((disease) => (
            <option key={disease} value={disease}>{disease}</option>
          ))}
        </select>
      </div>

      {selectedDisease && (
         <div 
         className="view-buttons">
          <p className='viewtext'>Selected view:</p>
         <button
           className={`view-selector ${view === "droga" ? 'selected' : ''}`}
           onClick={() => handleViewChange("droga")}
         >
           Drug View
         </button>
         <button
           className={`view-selector ${view === "objetivo" ? 'selected' : ''}`}
           onClick={() => handleViewChange("objetivo")}
         >
           Target View
         </button>
       </div>
      )}

</div>

      <div className="visualization-container">
        {data && view == "objetivo" && (
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

            
            
          </>

          
        )}
        {dataCrossed && view == "droga" && (
          <>
            <div className="heatmap-container" >
            <Heatmap_drugview dataCrossed={dataCrossedForDisease} onSelectDrug={setSelectedDrug} onSelectCircuit={setSelectedCircuit} />
            </div>

            <div className="charts-container">
              <div className="chart-container">
                <div className='barchart-container'>
                  <div className='dropdown-title'>
                    <label className="dropdown_drug" htmlFor="drugSelector">Selected Drug:</label>
                    <select className="dropdown_label" id="drugSelector" value={selectedDrug} onChange={(event) => setSelectedDrug(event.target.value)}>
                      <option value="">No drug selected</option>
                      {dataCrossedForDisease.columns.slice(1).map((drug, index) => (
                        <option key={index} value={drug}>{drug}</option>
                      ))}
                    </select>
                  </div>
                  {selectedDrug && (
                    <div className="chart">
                      <BarChartGene data={dataCrossedForDisease} selectedDrug={selectedDrug} />
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
                      {dataCrossedForDisease.map((d, index) => (
                        <option key={index} value={d.circuit_name}>{d.circuit_name}</option>
                      ))}
                    </select>
                  </div>
                  {selectedCircuit && (
                    <div className="chart">
                      <BarChartCircuit data={dataCrossedForDisease} selectedCircuit={selectedCircuit} />
                    </div>
                  )}
                </div>
              </div>
            </div>
            </>
        )}

        
      </div>
    </div>
  );
};

export default Results;
