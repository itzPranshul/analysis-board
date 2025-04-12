// src/assets/MoveHistory.js

import React from 'react';

const MoveHistory = ({ pgn }) => {
  return (
    <div style={{ marginTop: 20 }}>
      <h3>Move History (PGN)</h3>
      <pre
        style={{
          whiteSpace: 'pre-wrap',
          // background: '#f4f4f4',
          padding: '10px',
          borderRadius: '8px',
        }}
      >
        {pgn || 'No moves yet'}
      </pre>
    </div>
  );
};

export default MoveHistory;
