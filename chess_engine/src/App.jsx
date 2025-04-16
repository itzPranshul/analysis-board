import React, { useState } from 'react';
import { Chess } from 'chess.js';
import ChessBoardComponent from './assets/ChessBoardComponent';
import Controls from './assets/Controls';
import BestMoveDisplay from './assets/BestMoveDisplay';
import MoveHistory from './assets/MoveHistory';
import EvaluationDisplay from './assets/EvaluationDisplay';


function App() {
  const [game, setGame] = useState(new Chess());
  const [fenHistory, setFenHistory] = useState([new Chess().fen()]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bestMove, setBestMove] = useState('');

  const makeAMove = (move) => {
    const newGame = new Chess(fenHistory[currentIndex]);
    const result = newGame.move(move);
    if (result) {
      const newFen = newGame.fen();
      const updatedHistory = [...fenHistory.slice(0, currentIndex + 1), newFen];

      setFenHistory(updatedHistory);
      setCurrentIndex(updatedHistory.length - 1);
      setGame(newGame);
    }
  };

  const analyze = async () => {
    const res = await fetch('http://localhost:5000/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fen: fenHistory[currentIndex] }),
    });

    const data = await res.json();
    setBestMove(data.best_move);
  };

  const getPGN = () => { 
    const fullPGN = game.pgn()
    return fullPGN.replace(/\[.*?\]\s*\n/g, '').trim();// for removing all other headers
  };

  const handleReset = () => {
    const initialFen = new Chess().fen();
    setFenHistory([initialFen]);  // Reset history to just the initial position
    setCurrentIndex(0);           // Move to the start
    setGame(new Chess());         // Reset the game instance
  };
  


  return (
    <div style={{ display: 'flex', padding: 20 }}>
      {/* Left side: Chessboard */}
      <div style={{ flex: 1, marginRight: 20 }}>
        <ChessBoardComponent
          position={fenHistory[currentIndex]}
          onDrop={makeAMove}
        />
      </div>
  
      {/* Right side: Controls and displays */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
  
        <EvaluationDisplay fen={fenHistory[currentIndex]} />
  
        <BestMoveDisplay bestMove={bestMove} />
  
        <MoveHistory pgn={getPGN()} />
        <Controls
  currentIndex={currentIndex}
  historyLength={fenHistory.length}
  setCurrentIndex={setCurrentIndex}
  onAnalyze={analyze}
  onReset={handleReset}
/>

      </div>
    </div>
  );
  
}

export default App;
