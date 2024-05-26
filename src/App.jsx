import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './modules/header';
import Results from './modules/Results';
import DatasetExample from './modules/DatasetExample';

const App = () => {
  const [data, setData] = useState(null);
  const [selectedDrug, setSelectedDrug] = useState("");
  const [selectedCircuit, setSelectedCircuit] = useState("");

  useEffect(() => {
    const csvUrl = "https://raw.githubusercontent.com/Neo0CE/TIA/main/absolute_final.csv";
    d3.csv(csvUrl).then((csvData) => {
      setData(csvData);
    }).catch((error) => {
      console.error("Error loading the CSV data", error);
    });
  }, []);

  const handleChange = (event) => {
    setSelectedDrug(event.target.value);
  };

  const handleSelectDrug = (drug) => {
    setSelectedDrug(drug);
  };

  const handleCircuitChange = (event) => {
    setSelectedCircuit(event.target.value);
  };

  const handleSelectCircuit = (circuit) => {
    setSelectedCircuit(circuit);
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <main className="App-content">
          <Routes>
            <Route path="/results" element={
              <Results 
                data={data} 
                selectedDrug={selectedDrug} 
                handleChange={handleChange} 
                handleSelectDrug={handleSelectDrug}
                selectedCircuit={selectedCircuit}
                handleCircuitChange={handleCircuitChange}
                handleSelectCircuit={handleSelectCircuit}
              />} 
            />
            <Route path="/dataset-example" element={
              <DatasetExample 
                data={data} 
                selectedDrug={selectedDrug} 
                handleChange={handleChange}
              />} 
            />
          </Routes>
        </main>
        <footer className="App-footer">
          <p>© 2024 DRExML</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
