import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './modules/header';
import Results from './modules/Results';
import DatasetExample from './modules/DatasetExample';
import Team from './modules/Team';
import Home from './modules/Home';

const App = () => {
  const [dataMap, setDataMap] = useState(null); // Cambiar el nombre a dataMap para evitar confusiones

  useEffect(() => {
    const diseases = ["Familial Melanoma", "Fanconi Anemia"]; // Lista de enfermedades disponibles
    const fetchData = async () => {
      const data = {};

      for (const disease of diseases) {
        const csvUrl = `https://raw.githubusercontent.com/Neo0CE/TIA/main/${disease}.csv`;

        try {
          const csvData = await d3.csv(csvUrl);
          data[disease] = csvData;
        } catch (error) {
          console.error(`Error al cargar los datos para ${disease}:`, error);
        }
      }

      setDataMap(data);
    };

    fetchData();
  }, []);

  if (!dataMap) {
    return <div>Loading...</div>; // Muestra un mensaje de carga mientras se cargan los datos
  }

  return (
    <Router>
      <div className="App">
        <Header />
        <main className="App-content">
          
          <Routes>
            <Route path="/results" element={<Results dataMap={dataMap} />} />
            <Route path="/dataset-example" element={<DatasetExample dataMap={dataMap} />} />
            <Route path="/team"  element={<Team />}/>
            <Route path="/home"  element={<Home />}/>
          </Routes>
        </main>
        
      </div>
    </Router>
  );
};

export default App;
