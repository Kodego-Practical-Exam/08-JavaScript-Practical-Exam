import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

let squares: Array<string | null> = Array.from({ length: 9 }, () => null);
let currentPlayer: string = 'X';

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running');
});

app.get('/api/board', (req: Request, res: Response) => {
  res.json({ squares, currentPlayer });
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
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

  res.json({ squares, currentPlayer });
});

app.post('/api/reset', (req: Request, res: Response) => {
  squares = Array.from({ length: 9 }, () => null);
  currentPlayer = 'X';

  res.json({ message: 'Game reset.',  data: `${squares}` });
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
