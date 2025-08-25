import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/Home';
import Products from './components/Products';
import Brands from './components/brands';
import Images from './components/Image';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Brands" element={<Brands />} />
        <Route path="/Images" element={<Images />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;