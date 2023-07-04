import React, { useState } from 'react';
import Board from './components/board';

export default function App() {
  const [currentSquares, setCurrentSquares] = useState<Array<string | null>>(Array(9).fill(null));
  const oIsNext = currentSquares.filter((s) => s === null).length % 2 === 0;

  function handlePlay(nextSquares: Array<string | null>) {
    setCurrentSquares(nextSquares);
  }

  function restartGame() {
    setCurrentSquares(Array(9).fill(null));
  }

  const winner = calculateWinner(currentSquares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (currentSquares.every((s) => s !== null)) {
    status = 'Draw';
  } else {
    status = 'Next player: ' + (oIsNext ? 'O' : 'X');
  }

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <div className="game-board">
        <Board xIsNext={!oIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="status">{status}</div>
      <button className="restart-button" onClick={restartGame}>
        Restart
      </button>
    </div>
  );
}

function calculateWinner(squares: Array<string | null>) {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
