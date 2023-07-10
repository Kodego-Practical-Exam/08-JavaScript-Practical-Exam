"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateBoardState = void 0;
function evaluateBoardState(board) {
    var lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    // Check each line to find a winning player
    for (var i = 0; i < lines.length; i++) {
        var _a = lines[i], a = _a[0], b = _a[1], c = _a[2];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a]; // Return the winning player
        }
    }
    // Check if the board is draw
    if (board.every(function (square) { return square !== null; })) {
        return 'draw'; // Return 'draw' if the board is full and no winner
    }
    return null; // Return null if the game is still in progress
}
exports.evaluateBoardState = evaluateBoardState;
