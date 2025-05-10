import React, { useState, useEffect } from 'react';

const EvaluationDisplay = ({ fen }) => {
  const [evaluation, setEvaluation] = useState(null);

  const fetchEvaluation = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fen }),
      });
      const data = await res.json();

      const parsedEval = parseFloat(data.evaluation);

      // Only accept valid numbers
      if (!isNaN(parsedEval)) {
        setEvaluation(parsedEval);
      } else {
        setEvaluation(null); // Reset if invalid
      }
    } catch (err) {
      console.error('❌ Error fetching evaluation:', err);
      setEvaluation(null);
    }
  };

  useEffect(() => {
    if (fen) {
      fetchEvaluation();
    }
  }, [fen]);

  const getBarHeight = (evalScore) => {
    const clamped = Math.max(Math.min(evalScore, 10), -10);
    return ((clamped + 10) / 20) * 100;
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <label className="text-sm font-semibold mb-1">Evaluation</label>

      <div className="h-64 w-6 rounded-md overflow-hidden border border-gray-400 bg-gradient-to-t from-black via-gray-600 to-white relative">
        {evaluation !== null && (
          <div
            className="absolute bottom-0 w-full transition-all duration-300 bg-blue-400"
            style={{ height: `${getBarHeight(evaluation)}%` }}
          ></div>
        )}
      </div>

      {evaluation !== null && (
        <span className="text-sm mt-1">
          {evaluation >= 0 ? `+${evaluation.toFixed(2)}` : evaluation.toFixed(2)}
        </span>
      )}
    </div>
  );
};

export default EvaluationDisplay;
