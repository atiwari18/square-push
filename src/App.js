import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './Pages/Landing.js';
import Board1 from './Pages/Board1.js';
import Board2 from './Pages/Board2.js';
import Board3 from './Pages/Board3.js';
import Victory from './Pages/Victory.js';

function App() {

  return (
    <div className = "App">
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="board1" element={<Board1/>}/>
        <Route path="board2" element={<Board2/>}/>
        <Route path="board3" element={<Board3/>}/>
        <Route path="victory" element={<Victory/>}/>
      </Routes>
    </div>
  );
}

export default App;
