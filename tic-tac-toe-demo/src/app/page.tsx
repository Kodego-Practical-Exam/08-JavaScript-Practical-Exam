"use client"; // This is a client component 👈🏽
import React, { useState } from 'react';

type SquareProps = {
  value: string | null;
  onSquareClick: () => void;
};

function Square({ value, onSquareClick }: SquareProps) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

type BoardProps = {
  xIsNext: boolean;
  squares: Array<string | null>;
  onPlay: (nextSquares: Array<string | null>) => void;
};

function Board({ xIsNext, squares, onPlay }: BoardProps) {
  function handleClick(i: number) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [currentSquares, setCurrentSquares] = useState<Array<string | null>>(Array(9).fill(null));
  const xIsNext = currentSquares.filter((s) => s === null).length % 2 === 0;

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
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
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

