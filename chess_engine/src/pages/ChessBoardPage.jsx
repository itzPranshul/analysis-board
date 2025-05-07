import React, { useState } from 'react';
import { Chess } from 'chess.js';
import ChessBoardComponent from '../assets/ChessBoardComponent';
import Controls from '../assets/Controls';
import BestMoveDisplay from '../assets/BestMoveDisplay';
import MoveHistory from '../assets/MoveHistory';
import EvaluationDisplay from '../assets/EvaluationDisplay';
import './ChessBoardPage.css'; // optional CSS specific to this page

function ChessBoardPage() {
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
    setBestMove(data.best_line);
  };

  const getPGN = () => {
    return game.pgn().replace(/\[.*?\]\s*\n/g, '').trim();
  };

  const handleReset = () => {
    const initialFen = new Chess().fen();
    setFenHistory([initialFen]);
    setCurrentIndex(0);
    setGame(new Chess());
  };

  return (
    <div className="app-container">
      <div className="chessboard-container">
        <ChessBoardComponent
          position={fenHistory[currentIndex]}
          onDrop={makeAMove}
        />
      </div>
      <Controls
        currentIndex={currentIndex}
        historyLength={fenHistory.length}
        setCurrentIndex={setCurrentIndex}
        onAnalyze={analyze}
        onReset={handleReset}
      />
      <div className="controls-container">
        <EvaluationDisplay fen={fenHistory[currentIndex]} />
        <BestMoveDisplay bestMove={bestMove} />
        <MoveHistory pgn={getPGN()} />
      </div>
    </div>
  );
}

export default ChessBoardPage;
