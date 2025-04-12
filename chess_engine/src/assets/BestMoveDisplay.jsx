import React from 'react';

function BestMoveDisplay({ bestMove }) {
  if (!bestMove) return null;

  return (
    <p style={{ marginTop: 10 }}>
      Best Move: <strong>{bestMove}</strong>
    </p>
  );
}

export default BestMoveDisplay;
