import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Hotel1 from './hotel1';
import Hotel2 from './Hotel2';
import Hotel3 from './Hotel3';
import Hotel4 from './Hotel4';
import Hotel5 from './Hotel5';
import Hotel6 from './Hotel6';
import About from './About';
import Contact from './Contact';
import Inscrit from './Inscrit';
import Reservation from './Reservation';
import './App.css';
import Compte from './Compte';
import Annuler from './Annuler'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotel1" element={<Hotel1 />} />
        <Route path="/hotel2" element={<Hotel2 />} />
        <Route path="/hotel3" element={<Hotel3 />} /> 
        <Route path="/hotel4" element={<Hotel4 />} />
        <Route path="/hotel5" element={<Hotel5 />} />
        <Route path="/hotel6" element={<Hotel6 />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/inscrit" element={<Inscrit />} />
        <Route path="/compte" element={<Compte />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/annuler" element={<Annuler />} />
        <Route path="*" element={<Home />} />

      </Routes>
      
    </Router>
  );
}

export default App;