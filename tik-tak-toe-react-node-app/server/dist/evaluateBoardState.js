"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateBoardState = void 0;
function evaluateBoardState(squares, move) {
    if (!isMoveLegal(squares, move)) {
        return { error: 'Invalid move. The selected square is already taken.' };
    }
    var updatedSquares = __spreadArray([], squares, true);
    updatedSquares[move] = 'X';
    if (isPlayerWinning(updatedSquares, 'X')) {
        return { winner: 'X' };
    }
    if (isBoardFull(updatedSquares)) {
        return { draw: true };
    }
    var availableMoves = getAvailableMoves(updatedSquares);
    var randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    updatedSquares[randomMove] = 'O';
    if (isPlayerWinning(updatedSquares, 'O')) {
        return { winner: 'O' };
    }
    return { nextMove: updatedSquares };
}
exports.evaluateBoardState = evaluateBoardState;
function isMoveLegal(squares, move) {
    return squares[move] === null;
}
function isPlayerWinning(squares, player) {
    var winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (var _i = 0, winningCombinations_1 = winningCombinations; _i < winningCombinations_1.length; _i++) {
        var combination = winningCombinations_1[_i];
        var a = combination[0], b = combination[1], c = combination[2];
        if (squares[a] === player && squares[b] === player && squares[c] === player) {
            return true;
        }
    }
    return false;
}
function isBoardFull(squares) {
    return squares.every(function (square) { return square !== null; });
}
function getAvailableMoves(squares) {
    var availableMoves = [];
    squares.forEach(function (square, index) {
        if (square === null) {
            availableMoves.push(index);
        }
    });
    return availableMoves;
}
