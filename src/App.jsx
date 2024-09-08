import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './modules/header';
import Results from './modules/Results';
import DatasetExample from './modules/DatasetExample';
import Team from './modules/Team';
import Home from './modules/Home';
import AboutUs from './modules/AboutUs';
import Collaborate from './modules/collaborate'

const App = () => {
  const [dataMap, setDataMap] = useState(null);
  const [dataCrossed, setDataMapCrossed] = useState(null); // Cambiar el nombre a dataMap para evitar confusiones
  const [diseases, setDiseases] = useState([]);


  useEffect(() => {
    const diseasesList = ["Familial Melanoma", "Fanconi Anemia"]; // Lista de enfermedades disponibles
  
    const fetchData = async () => {
      const data = {};  // Datos principales
      const dataCrossed = {};  // Datos cruzados
  
      for (const disease of diseasesList) {
        const csvUrl = `https://raw.githubusercontent.com/Neo0CE/drexml_app/master/datasets/${disease}.csv`;
        const csvUrlCrossed = `https://raw.githubusercontent.com/Neo0CE/drexml_app/master/datasets/${disease}_crossed.csv`;
  
        try {
          const csvData = await d3.csv(csvUrl);
          data[disease] = csvData;
  
          const csvDataCrossed = await d3.csv(csvUrlCrossed);
          dataCrossed[disease] = csvDataCrossed;
        } catch (error) {
          console.error(`Error al cargar los datos para ${disease}_crossed:`, error);
        }
      }
  
      setDataMap(data);  // Establece los datos principales
      setDataMapCrossed(dataCrossed);  // Establece los datos cruzados
      setDiseases(diseasesList);
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
            <Route path="/results" element={<Results dataMap={dataMap} dataCrossed={dataCrossed} />} />
            <Route path="/dataset-example" element={<DatasetExample dataMap={dataMap} diseases={diseases} />} />
            <Route path="/team"  element={<Team />}/>
            <Route path="/home"  element={<Home />}/>
            <Route path="/about-us"  element={<AboutUs />}/>
            <Route path="/collaborate"  element={<Collaborate />}/>
            <Route path="*"  element={<Home />}/>
          </Routes>
        </main>
        
      </div>
    </Router>
  );
};

export default App;
