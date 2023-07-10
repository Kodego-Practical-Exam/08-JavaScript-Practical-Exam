import React, { useEffect, useState } from 'react';

interface Square {
  value: string | null;
}

const App: React.FC = () => {
  const [squares, setSquares] = useState<Square[]>(Array.from({ length: 9 }, () => ({ value: null })));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchBoard();
  }, []);

  const fetchBoard = async () => {
    try {
      const response = await fetch('/api/board');
      const data = await response.json();
      setSquares(data.squares);
      setCurrentPlayer(data.currentPlayer);
    } catch (error) {
      console.error('Error fetching board:', error);
    }
  };

  const handleSquareClick = async (index: number) => {
    const clickedSquare = squares[index];

    if (clickedSquare?.value || winner || isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/move', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ index }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        console.error('Error making move:', error);
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      console.log(data)
      setSquares(data.squares);
      setCurrentPlayer(data.currentPlayer);
      setWinner(data.winner);

    } catch (error) {
      console.error('Error making move:', error);
    }

    setIsLoading(false);
  };

  const renderSquare = (index: number) => {
    console.log(`Squarevalue${index}:`, squares[index]);
    const squareValue = squares[index] || "";



    return (
      <button className="square" onClick={() => handleSquareClick(index)}>
        {String(squareValue)}
      </button>
    );
  };


  const resetGame = async () => {
    try {
      const response = await fetch('/api/reset', { method: 'POST' });
      const data = await response.json();
      setSquares(Array.from({ length: 9 }, () => ({ value: null })));
      setCurrentPlayer('X');
      setWinner(null);
    } catch (error) {
      console.error('Error resetting game:', error);
    }
  };

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
      <div className="status">Current Player: {currentPlayer}</div>
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

export default App;
