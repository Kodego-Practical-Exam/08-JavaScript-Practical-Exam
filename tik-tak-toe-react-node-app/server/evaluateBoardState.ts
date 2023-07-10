function evaluateBoardState(board: Array<string | null>) {
  const lines = [
    [0, 1, 2], // Rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // Columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // Diagonals
    [2, 4, 6],
  ];

  // Check each line to find a winning player
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // Return the winning player
    }
  }

  // Check if the board is draw
  if (board.every((square) => square !== null)) {
    return 'draw'; // Return 'draw' if the board is full and no winner
  }

  return null; // Return null if the game is still in progress
}

export {evaluateBoardState}