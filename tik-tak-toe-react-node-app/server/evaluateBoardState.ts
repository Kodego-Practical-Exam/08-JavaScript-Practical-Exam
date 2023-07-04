export function evaluateBoardState(squares: Array<string | null>, move: number) {
  if (!isMoveLegal(squares, move)) {
    return { error: 'Invalid move. The selected square is already taken.' };
  }

  const updatedSquares = [...squares];
  updatedSquares[move] = 'X';

  if (isPlayerWinning(updatedSquares, 'X')) {
    return { winner: 'X' };
  }

  if (isBoardFull(updatedSquares)) {
    return { draw: true };
  }

  const availableMoves = getAvailableMoves(updatedSquares);
  const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
  updatedSquares[randomMove] = 'O';

  if (isPlayerWinning(updatedSquares, 'O')) {
    return { winner: 'O' };
  }

  return { nextMove: updatedSquares };
}

function isMoveLegal(squares: Array<string | null>, move: number): boolean {
  return squares[move] === null;
}

function isPlayerWinning(squares: Array<string | null>, player: string): boolean {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (squares[a] === player && squares[b] === player && squares[c] === player) {
      return true;
    }
  }

  return false;
}

function isBoardFull(squares: Array<string | null>): boolean {
  return squares.every(square => square !== null);
}

function getAvailableMoves(squares: Array<string | null>): number[] {
  const availableMoves: number[] = [];

  squares.forEach((square, index) => {
    if (square === null) {
      availableMoves.push(index);
    }
  });

  return availableMoves;
}
