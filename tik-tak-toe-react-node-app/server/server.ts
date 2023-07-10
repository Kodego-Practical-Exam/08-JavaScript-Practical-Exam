import express, { Request, Response } from 'express';

// Import evaluateBoardState()
import { evaluateBoardState } from './evaluateBoardState';

// Create an Express application
const app = express();
app.use(express.json());

// Initialize the game state
let squares: Array<string | null> = Array.from({ length: 9 }, () => null);
let currentPlayer: string = 'X';

//Root Endpoint that indicates the server is running
app.get('/', (req: Request, res: Response) => {
  res.send('Server is running');
});

// Endpoint that sets the current board state
app.get('/api/board', (req: Request, res: Response) => {
  // Evaluate the current board state
  const evaluationResult = evaluateBoardState(squares);

  // Respond with the board state, current player, and winner or draw
  res.json({ squares, currentPlayer, winner: evaluationResult });
});

// Endpoint that evaluates the move on the board
app.post('/api/move', (req: Request, res: Response) => {
  const { index } = req.body;

   // Validate the move 
  if (!Number.isInteger(index) || index < 0 || index > 8) {
    res.status(400).json({ error: 'Invalid move. Please provide a valid square index (0-8).' });
    return;
  }

  // Check if the selected square is already taken
  if (squares[index]) {
    res.status(400).json({ error: 'Invalid move. The selected square is already taken.' });
    return;
  }

  // Make the move and update the current player
  squares[index] = currentPlayer;

  // Evaluate the board state after the move
  const evaluationResult = evaluateBoardState(squares);

  // Respond with the updated board state, current player, and winner (if any)
  if (evaluationResult === 'X' || evaluationResult === 'O') {
    res.json({ squares, currentPlayer, winner: evaluationResult });
  } else if (evaluationResult === 'draw') {
    res.json({ squares, currentPlayer, winner: evaluationResult });
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    res.json({ squares, currentPlayer });
  }
});

// Endpoint that resets the game
app.post('/api/reset', (req: Request, res: Response) => {
  // Reset the game state to its initial values
  squares = Array.from({ length: 9 }, () => null);
  currentPlayer = 'X';

  // Respond with the reset board state, current player, and null winner
  res.json({ squares, currentPlayer, winner: null });
});

// Start the server in port 3001
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
