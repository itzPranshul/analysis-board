import React from 'react';
import { Chessboard } from 'react-chessboard';
import Header from './Header';

function ChessBoardComponent({ position, onDrop }) {
  const handleDrop = (sourceSquare, targetSquare) => {
    onDrop({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    });
    return true;
  };

  return (
    <>
    <Header/>
    <Chessboard
      position={position}
      onPieceDrop={handleDrop}
      boardWidth={700}
      />

    </>
  );
}

export default ChessBoardComponent;
