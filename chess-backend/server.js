const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/analyze', (req, res) => {
  const fen = req.body.fen;

  const stockfish = spawn('/Users/pranshul/Desktop/projects/stockfish/Stockfish/src/stockfish'); // change path if needed

  let bestMove = '';

  stockfish.stdin.write('uci\n');
  stockfish.stdin.write('isready\n');
  stockfish.stdin.write(`position fen ${fen}\n`);
  stockfish.stdin.write('go depth 15\n');

  stockfish.stdout.on('data', (data) => {
    const output = data.toString();

    if (output.includes('bestmove')) {
      const match = output.match(/bestmove (\w+)/);
      if (match) {
        bestMove = match[1];
        res.json({ best_move: bestMove });
        stockfish.kill();
      }
    }
  });

  stockfish.stderr.on('data', (data) => {
    console.error(`Stockfish error: ${data}`);
  });

  stockfish.on('exit', (code) => {
    if (code !== 0) {
      console.log(`Stockfish exited with code ${code}`);
    }
  });
});



//this is just for testing 
// app.post('/analyze', (req, res) => {
//     const { fen } = req.body;
  
//     console.log("Received FEN:", fen);
  
//     // Simulate a fake best move
//     const fakeBestMove = 'e2e4'; // Just for testing
  
//     res.json({ best_move: fakeBestMove });
//   });
  

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
