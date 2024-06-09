import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import './DatasetExample.css';

const DatasetExample = ({ dataMap, diseases }) => {
  const [selectedDisease, setSelectedDisease] = useState(diseases[0]);
  const [selectedGenes, setSelectedGenes] = useState([]);
  const [filteredColumns, setFilteredColumns] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setSelectedGenes([]); // Resetear genes seleccionados cuando cambia la enfermedad seleccionada
  }, [selectedDisease]);

  useEffect(() => {
    if (!dataMap || !dataMap[selectedDisease]) {
      return;
    }

    const data = dataMap[selectedDisease];

    // Filtrar datos según los genes seleccionados
    const filteredData = data.map(row => {
      const newRow = { 'Circuit Name': row.circuit_name }; // Cambio aquí
      selectedGenes.forEach(gene => {
        newRow[gene] = row[gene];
      });
      return newRow;
    });

    // Determinar columnas a mostrar
    const columnsToDisplay = ['Circuit Name', ...selectedGenes]; // Cambio aquí

    setFilteredColumns(columnsToDisplay);
    setFilteredData(filteredData);
  }, [dataMap, selectedDisease, selectedGenes]);

  const handleChangeDisease = (event) => {
    setSelectedDisease(event.target.value);
  };

  const handleChangeGene = (gene) => {
    if (selectedGenes.includes(gene)) {
      setSelectedGenes(prevGenes => prevGenes.filter(item => item !== gene));
    } else {
      if (selectedGenes.length < 12) { // Límite de selección a 12 genes
        setSelectedGenes(prevGenes => [...prevGenes, gene]);
      } else {
        alert("Solo se pueden seleccionar hasta 12 genes.");
      }
    }
  };

  const clearSelection = () => {
    setSelectedGenes([]);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  if (!dataMap || !dataMap[selectedDisease]) {
    return <div>No hay datos disponibles para {selectedDisease}</div>;
  }

  const data = dataMap[selectedDisease];
  const availableGenes = Object.keys(data[0]).filter(key => key !== "circuit_name");
  const filteredGenes = availableGenes.filter(gene => gene.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="table-container">
      <div className="table-header">
        <div className="dropdown_container">
          <label className="dropdown_disease" htmlFor="diseaseSelector">Select a disease:</label>
          <select className="dropdown_label" id="diseaseSelector" value={selectedDisease} onChange={handleChangeDisease}>
            {diseases.map((disease, index) => (
              <option key={index} value={disease}>{disease}</option>
            ))}
          </select>
        </div>
        <div className="dropdown_container">
          <div className="drug-dropdown">
            <div className="drug-dropdown-selected" onClick={toggleDropdown}>
              {selectedGenes.length > 0 ? `${selectedGenes.length} gene(s) selected` : 'Select Gene'}
              <i className={`fas fa-chevron-${dropdownOpen ? 'up' : 'down'}`}></i>
            </div>
            {dropdownOpen && (
              <div className="drug-dropdown-options">
                <input
                  type="text"
                  placeholder="Search Genes"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="search-input"
                />
                <div className="drug-dropdown-scroll">
                  {filteredGenes.map((gene, index) => (
                    <div key={index} className="drug-dropdown-option">
                      <input
                        type="checkbox"
                        id={gene}
                        checked={selectedGenes.includes(gene)}
                        onChange={() => handleChangeGene(gene)}
                      />
                      <label htmlFor={gene}>{gene}</label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="toggle-columns">
          <button className="clear-selected" onClick={clearSelection}>Clean Selection</button>
        </div>
        <div className="download-links">
          <div className="download-link-one">
            <CSVLink
              data={data}
              headers={Object.keys(data[0]).map(key => key === 'circuit_name' ? 'Circuit Name' : key)} // Cambio aquí
              filename={`${selectedDisease}_full_dataset.csv`}
              className="btn btn-primary"
              target="_blank"
            >
              Download Full Dataset
            </CSVLink>
          </div>
          <div className="download-link-two">
            <CSVLink
              data={filteredData}
              headers={filteredColumns.map(column => column === 'circuit_name' ? 'Circuit Name' : column)} // Cambio aquí
              filename={`${selectedDisease}_dataset.csv`}
              className="btn btn-primary"
              target="_blank"
            >
              Download Selection as csv
            </CSVLink>
          </div>
        </div>
      </div>
      {/* Tabla */}
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              {filteredColumns.map((column, index) => (
                <th key={index}>{column}</th> // Cambio aquí
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
    </div>
  );
};

export default DatasetExample;
