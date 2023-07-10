import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

let squares: Array<string | null> = Array.from({ length: 9 }, () => null);
let currentPlayer: string = 'X';

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running');
});

function evaluateBoard(board: Array<string | null>) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // Return the winning player
    }
  }

  if (board.every((square) => square !== null)) {
    return 'draw'; // Return 'draw' if the board is full and no winner
  }

  return null; // Return null if the game is still in progress
}

app.get('/api/board', (req: Request, res: Response) => {
  const evaluationResult = evaluateBoard(squares);

  res.json({ squares, currentPlayer, winner: evaluationResult });
});

app.post('/api/move', (req: Request, res: Response) => {
  const { index } = req.body;

  if (!Number.isInteger(index) || index < 0 || index > 8) {
    res.status(400).json({ error: 'Invalid move. Please provide a valid square index (0-8).' });
    return;
  }

  if (squares[index]) {
    res.status(400).json({ error: 'Invalid move. The selected square is already taken.' });
    return;
  }

  squares[index] = currentPlayer;

  const evaluationResult = evaluateBoard(squares);

  if (evaluationResult === 'X' || evaluationResult === 'O') {
    res.json({ squares, currentPlayer, winner: evaluationResult });
  } else if (evaluationResult === 'draw') {
    res.json({ squares, currentPlayer, winner: evaluationResult });
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    res.json({ squares, currentPlayer });
  }
});

app.post('/api/reset', (req: Request, res: Response) => {
  squares = Array.from({ length: 9 }, () => null);
  currentPlayer = 'X';

  res.json({ squares, currentPlayer, winner: null });
});


const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
