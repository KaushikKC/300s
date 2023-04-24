import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import Prediction from './pages/Prediction';


function App() {
    return (
      
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Prediction />} />
        </Routes>
        </BrowserRouter>
      
    );
  
}

export default App;
