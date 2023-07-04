import React from 'react';

type SquareProps = {
  value: string | null;
  onSquareClick: () => void;
};

export default function Square({ value, onSquareClick }: SquareProps) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

