function calculateWinner(squares: Array<string | null>): string | null {
  const lines: Array<Array<number>> = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

function isBoardFull(squares: Array<string | null>): boolean {
  return squares.every((square) => square !== null);
}

function isMoveLegal(squares: Array<string | null>, move: number): boolean {
  return squares[move] === null;
}

export { calculateWinner, isBoardFull, isMoveLegal };
