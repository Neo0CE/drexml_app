import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
import './DatasetExample.css'; // Importa el archivo de estilos CSS

const DatasetExample = ({ data }) => {
  const [selectedDrug, setSelectedDrug] = useState(""); // Estado para almacenar la droga seleccionada

  if (!data || data.length === 0) {
    return null; // Si no hay datos, no renderiza nada o muestra un mensaje de carga
  }

  // Obtén las drogas disponibles
  const drugs = Object.keys(data[0]).filter(key => key !== "circuit_name");
  const columns = Object.keys(data[0])
  // Manejar el cambio de selección de droga
  const handleChange = (event) => {
    setSelectedDrug(event.target.value);
  };

  // Filtrar las columnas según la droga seleccionada
  const filteredColumns = selectedDrug ? ["circuit_name", selectedDrug] : ["circuit_name", ...drugs.slice(0, 9)]; // Limitar a 9 columnas
  
  // Obtener los datos filtrados
  let filteredData = data.map(row => {
    const newRow = {};
    filteredColumns.forEach(column => {
      newRow[column] = row[column];
    });
    return newRow;
  });

  // Limitar a 12 filas
  //filteredData = filteredData.slice(0, 12);

  // Renderizar la tabla utilizando los datos filtrados
  return (
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
        data={data}
        headers={columns}
        filename="full_dataset.csv"
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
        filename="dataset.csv"
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
  );
};

export default DatasetExample;
