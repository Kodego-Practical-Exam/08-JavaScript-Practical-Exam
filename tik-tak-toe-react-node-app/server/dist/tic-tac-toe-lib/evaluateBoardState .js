"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMoveLegal = exports.isBoardFull = exports.calculateWinner = void 0;
function calculateWinner(squares) {
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
    for (var i = 0; i < lines.length; i++) {
        var _a = lines[i], a = _a[0], b = _a[1], c = _a[2];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
exports.calculateWinner = calculateWinner;
function isBoardFull(squares) {
    return squares.every(function (s) { return s !== null; });
}
exports.isBoardFull = isBoardFull;
function isMoveLegal(squares, move) {
    return squares[move] === null;
}
exports.isMoveLegal = isMoveLegal;
