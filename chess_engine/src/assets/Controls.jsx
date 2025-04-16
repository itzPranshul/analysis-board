import React from 'react';

function Controls({ currentIndex, historyLength, setCurrentIndex, onAnalyze, onReset }) {
  return (
    <div style={{ marginTop: 10 }}>
      <button
        onClick={() => setCurrentIndex(i => Math.max(i - 1, 0))}
        disabled={currentIndex === 0}
        style={{ marginRight: 10 }}
      >
        ← Back
      </button>
      <button
        onClick={() => setCurrentIndex(i => Math.min(i + 1, historyLength - 1))}
        disabled={currentIndex === historyLength - 1}
        style={{ marginRight: 10 }}
      >
        Forward →
      </button>
      <button onClick={onAnalyze}>Analyze Position</button>
      <button onClick={onReset} style={{ marginLeft: 10 }}>
        Reset
      </button>
    </div>
  );
}


export default Controls;
