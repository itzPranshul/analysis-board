import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './assets/Navbar';
import ChessBoardPage from './pages/ChessBoardPage';
import LevelUpComponent from './pages/LevelUpComponent';
import BuyChessboardComponent from './pages/BuyChessboardComponent';
import CommunityComponent from './pages/CommunityComponent';

import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ChessBoardPage />} />
        <Route path="/level-up" element={<LevelUpComponent />} />
        <Route path="/buy-chessboard" element={<BuyChessboardComponent />} />
        <Route path="/community" element={<CommunityComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
