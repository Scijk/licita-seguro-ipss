import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Licitaciones from './pages/Licitaciones';
import DetalleLicitacion from './pages/DetalleLicitacion';
import BuscarProveedor from './pages/BuscarProveedor';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => (
  <>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/licitaciones" element={<Licitaciones />} />
      <Route path="/licitaciones/:codigo" element={<DetalleLicitacion />} />
      <Route path="/buscar-proveedor" element={<BuscarProveedor />} />
    </Routes>
    <Footer />
  </>
);

export default App;