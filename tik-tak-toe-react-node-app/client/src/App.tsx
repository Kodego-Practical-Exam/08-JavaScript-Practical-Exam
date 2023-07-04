import React, { useState } from 'react';

interface Square {
  value: string | null;
}

export default function App() {
  const [squares, setSquares] = useState<Square[]>(Array(9).fill(null).map(() => ({ value: null })));
  const [winner, setWinner] = useState<string | null>(null);
  const [draw, setDraw] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSquareClick = async (index: number) => {
    if (squares[index].value || winner || draw || isLoading) {
      return;
    }

    setIsLoading(true);

    const updatedSquares = [...squares];
    updatedSquares[index].value = 'X';
    setSquares(updatedSquares);

    const response = await fetch('/api/evaluate-board', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ squares: updatedSquares, move: index }),
    });

    if (!response.ok) {
      const { error } = await response.json();
      console.error(error);
      setIsLoading(false);
      return;
    }

    const data = await response.json();

    if (data.winner) {
      setWinner(data.winner);
    } else if (data.draw) {
      setDraw(true);
    } else {
      setSquares(data.nextMove);
    }

    setIsLoading(false);
  };

  const renderSquare = (index: number) => {
    return (
      <button className="square" onClick={() => handleSquareClick(index)}>
        {squares[index].value}
      </button>
    );
  };

  const restartGame = () => {
    setSquares(Array(9).fill({ value: null }));
    setWinner(null);
    setDraw(false);
  };

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (draw) {
    status = 'Draw';
  } else {
    status = 'Next player: X';
  }

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <div className="game-board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <div className="status">{status}</div>
      <button className="restart-button" onClick={restartGame}>
        Restart
      </button>
    </div>
  );
}
