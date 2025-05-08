const { spawn } = require('child_process');

const STOCKFISH_PATH = '/Users/pranshul/Desktop/projects/stockfish/Stockfish/src/stockfish';

exports.analyzePosition = (req, res) => {
  const fen = req.body.fen;
  const stockfish = spawn(STOCKFISH_PATH);

  let bestLine = '';

  stockfish.stdin.write('uci\n');
  stockfish.stdin.write('isready\n');
  stockfish.stdin.write(`position fen ${fen}\n`);
  stockfish.stdin.write('go depth 15\n');

  stockfish.stdout.on('data', (data) => {
    const output = data.toString();
    console.log(output);

    const pvMatch = output.match(/info .+ pv (.+)/);
    if (pvMatch) {
      bestLine = pvMatch[1];
    }

    if (output.includes('bestmove')) {
      res.json({ best_line: bestLine });
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
};

exports.evaluatePosition = (req, res) => {
  const fen = req.body.fen;
  const stockfish = spawn(STOCKFISH_PATH);

  let evaluation = null;

  stockfish.stdin.write('uci\n');
  stockfish.stdin.write('isready\n');
  stockfish.stdin.write(`position fen ${fen}\n`);
  stockfish.stdin.write('go depth 15\n');

  stockfish.stdout.on('data', (data) => {
    const output = data.toString();
    console.log(output);

    const evalMatch = output.match(/score cp (-?\d+)/);
    if (evalMatch) {
      evaluation = (parseInt(evalMatch[1], 10) / 100).toFixed(2);
    }

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
};
