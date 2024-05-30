import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import './DatasetExample.css'; // Importa el archivo de estilos CSS

const DatasetExample = ({ dataMap }) => {
  const [selectedDisease, setSelectedDisease] = useState(""); // Estado para almacenar la enfermedad seleccionada
  const [selectedDrug, setSelectedDrug] = useState(""); // Estado para almacenar el gen seleccionado
  const [filteredData, setFilteredData] = useState([]); // Estado para almacenar los datos filtrados
  const [drugs, setDrugs] = useState([]); // Estado para almacenar los genes disponibles
  const [filteredColumns, setFilteredColumns] = useState(["circuit_name"]); // Estado para almacenar las columnas filtradas inicialmente

  // Manejar el cambio de selección de enfermedad
  const handleSelectDisease = (event) => {
    const selectedDisease = event.target.value;
    setSelectedDisease(selectedDisease);

    // Obtén los datos y genes correspondientes a la enfermedad seleccionada
    const dataset = dataMap[selectedDisease];
    if (dataset && dataset.length > 0) {
      const columns = Object.keys(dataset[0]);
      const initialDrugs = columns.filter(key => key !== "circuit_name");

      setDrugs([initialDrugs]);

      // Actualizar las columnas filtradas con el gen seleccionado
      const updatedFilteredColumns = selectedDrug ? ["circuit_name", selectedDrug] : ["circuit_name", ...initialDrugs];
      setFilteredColumns(updatedFilteredColumns);

      // Filtrar los datos según la enfermedad seleccionada y las columnas filtradas
      const filteredData = dataset.map(row => {
        const newRow = {};
        updatedFilteredColumns.forEach(column => {
          newRow[column] = row[column];
        });
        return newRow;
      });

      setFilteredData(filteredData);
    } else {
      // Reiniciar los estados cuando no hay datos válidos para la enfermedad seleccionada
      setDrugs([]);
      setFilteredColumns(["circuit_name"]);
      setFilteredData([]);
      setSelectedDrug("");
    }
  };

  // Manejar el cambio de selección de gen
  const handleChange = (event) => {
    const selectedDrug = event.target.value;
    setSelectedDrug(selectedDrug);

    // Actualizar las columnas filtradas cuando se selecciona un nuevo gen
    const updatedFilteredColumns = selectedDrug ? ["circuit_name", selectedDrug] : ["circuit_name"];
    setFilteredColumns(updatedFilteredColumns);

    // Filtrar los datos nuevamente cuando se selecciona un nuevo gen
    const dataset = dataMap[selectedDisease];
    if (dataset && dataset.length > 0) {
      const filteredData = selectedDrug ? dataset.map(row => {
        const newRow = {};
        updatedFilteredColumns.forEach(column => {
          newRow[column] = row[column];
        });
        return newRow;
      }) : dataset; // Mostrar el dataset completo si no hay gen seleccionado

      setFilteredData(filteredData);
    }
  };

  // Renderizar la tabla utilizando los datos filtrados solo si hay una enfermedad seleccionada y hay datos filtrados disponibles
  return (
    <div className='content'>
      <div className="disease-selector">
        <label htmlFor="diseaseSelector">Selecciona una enfermedad:</label>
        <select id="diseaseSelector" value={selectedDisease} onChange={handleSelectDisease}>
          <option value="">Selecciona una enfermedad</option>
          {Object.keys(dataMap).map((disease) => (
            <option key={disease} value={disease}>{disease}</option>
          ))}
        </select>
      </div>

      {selectedDisease && (
        <div className="table-container">
          <div className='table-header'>
            <div className="dropdown_container">
              <label className="dropdown_drug" htmlFor="drugSelector">Selecciona un gen:</label>
              <select className="dropdown_label" id="drugSelector" value={selectedDrug} onChange={handleChange}>
                <option value="">No hay gen seleccionado</option>
                {drugs.map((drug, index) => (
                  <option key={index} value={drug}>{drug}</option>
                ))}
              </select>
            </div>
            <div className='download-links'>
              <div className='download-link-one'>
                <CSVLink
                  data={dataMap[selectedDisease]}
                  headers={drugs}
                  filename={`${selectedDisease}_dataset.csv`}
                  className="btn btn-primary"
                  target="_blank"
                >
                  Descargar Dataset Completo
                </CSVLink>
              </div>

              <div className='download-link-two'>
                <CSVLink
                  data={filteredData}
                  headers={filteredColumns.map(column => ({ label: column, key: column }))}
                  filename={`${selectedDisease}_dataset_filtered.csv`}
                  className="btn btn-primary"
                  target="_blank"
                >
                  Descargar selección en formato csv
                </CSVLink>
              </div>
            </div>
          </div>
          {/* Tabla */}
          <table>
            <thead>
              <tr>
                {filteredColumns.map((column, index) => (
                  <th key={index}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {filteredColumns.map((column, colIndex) => (
                    <td key={colIndex} className={colIndex === 0 ? 'first-column' : ''}>
                      {row[column]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DatasetExample;
