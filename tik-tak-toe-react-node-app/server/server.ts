import express, { Request, Response } from 'express';
import { calculateWinner, isBoardFull, isMoveLegal } from './tic-tac-toe-lib/evaluateBoardState ';

const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running'); // Or any other response you want to send
});

app.post('/evaluate-board', (req: Request, res: Response) => {
  const { squares, move } = req.body;

  if (!Array.isArray(squares) || squares.length !== 9 || !Number.isInteger(move) || move < 0 || move > 8) {
    res.status(400).json({ error: 'Invalid request. The request should contain "squares" (an array of 9 elements) and "move" (an integer between 0 and 8).' });
    return;
  }

  if (!isMoveLegal(squares, move)) {
    res.status(400).json({ error: 'Invalid move. The selected square is already taken.' });
    return;
  }

  squares[move] = 'X';
  const winner = calculateWinner(squares);

  if (winner) {
    res.json({ winner });
    return;
  }

  if (isBoardFull(squares)) {
    res.json({ draw: true });
    return;
  }

  const emptySquares = squares.map((square, index) => (square === null ? index : null)).filter((index): index is number => index !== null);
  const computerMove = emptySquares[Math.floor(Math.random() * emptySquares.length)]!;
  squares[computerMove] = 'O';


  const computerWinner = calculateWinner(squares);

  if (computerWinner) {
    res.json({ winner: computerWinner });
    return;
  }

  if (isBoardFull(squares)) {
    res.json({ draw: true });
    return;
  }

  res.json({ nextMove: squares });
});

// Set up CORS headers
app.use((req: Request, res: Response, next: Function) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow the specified methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow the specified headers
  next();
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
