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
  const stockfish = spawn('/Users/pranshul/Desktop/projects/stockfish/Stockfish/src/stockfish');

  let bestLine = '';

  stockfish.stdin.write('uci\n');
  stockfish.stdin.write('isready\n');
  stockfish.stdin.write(`position fen ${fen}\n`);
  stockfish.stdin.write('go depth 15\n');

  stockfish.stdout.on('data', (data) => {
    const output = data.toString();
    console.log(output); // for debugging: see what's coming back

    // Match the principal variation line with the best sequence
    const pvMatch = output.match(/info .+ pv (.+)/);
    if (pvMatch) {
      bestLine = pvMatch[1];
    }

    // When bestmove is received, respond with the best sequence found
    if (output.includes('bestmove')) {
      res.json({ best_line: bestLine });
      stockfish.kill();
    }
  });
});


app.post('/evaluate', (req, res) => {
  const fen = req.body.fen;
  const stockfish = spawn('/Users/pranshul/Desktop/projects/stockfish/Stockfish/src/stockfish');

  let evaluation = null;

  stockfish.stdin.write('uci\n');
  stockfish.stdin.write('isready\n');
  stockfish.stdin.write(`position fen ${fen}\n`);
  stockfish.stdin.write('go depth 15\n');

  stockfish.stdout.on('data', (data) => {
    const output = data.toString();
    console.log(output); // for debugging

    // Find evaluation in centipawns
    const evalMatch = output.match(/score cp (-?\d+)/);
    if (evalMatch) {
      evaluation = (parseInt(evalMatch[1], 10) / 100).toFixed(2); // e.g., +0.43
    }

    // If we get 'bestmove', Stockfish is done analyzing
    if (output.includes('bestmove')) {
      res.json({ evaluation });
      stockfish.kill();
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
