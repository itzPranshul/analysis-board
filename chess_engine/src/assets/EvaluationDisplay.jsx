// src/assets/EvaluationDisplay.jsx
import React, { useEffect, useState } from 'react';

const EvaluationDisplay = ({ fen }) => {
  const [evaluation, setEvaluation] = useState(null);
//   const [bestMove, setBestMove] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!fen) return;

    const fetchEvaluation = async () => {
      setLoading(true);
      setError('');
      setEvaluation(null);
    //   setBestMove('');

      try {
        const res = await fetch('http://localhost:5000/evaluate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fen }),
        });

        const data = await res.json();

        if (data.error) {
          setError(data.error);
        } else {
          setEvaluation(data.evaluation);
        //   setBestMove(data.bestMove);
        }
      } catch (err) {
        setError('Failed to evaluate position.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvaluation();
  }, [fen]);

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Stockfish Evaluation</h3>
      {loading && <p>Evaluating position...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {evaluation !== null && (
        <>
          <p><strong>Eval:</strong> {evaluation} ♟</p>
          {/* <p><strong>Best Move:</strong> {bestMove}</p> */}
        </>
      )}
    </div>
  );
};

export default EvaluationDisplay;
