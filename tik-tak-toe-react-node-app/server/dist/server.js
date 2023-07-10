"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
app.use(express_1.default.json());
var squares = Array.from({ length: 9 }, function () { return null; });
var currentPlayer = 'X';
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
var checkWinner = function (player) {
    for (var _i = 0, winningCombinations_1 = winningCombinations; _i < winningCombinations_1.length; _i++) {
        var combination = winningCombinations_1[_i];
        var a = combination[0], b = combination[1], c = combination[2];
        if (squares[a] === player && squares[b] === player && squares[c] === player) {
            return true;
        }
    }
    return false;
};
app.get('/', function (req, res) {
    res.send('Server is running');
});
app.get('/api/board', function (req, res) {
    res.json({ squares: squares, currentPlayer: currentPlayer });
});
app.post('/api/move', function (req, res) {
    var index = req.body.index;
    if (!Number.isInteger(index) || index < 0 || index > 8) {
        res.status(400).json({ error: 'Invalid move. Please provide a valid square index (0-8).' });
        return;
    }
    if (squares[index]) {
        res.status(400).json({ error: 'Invalid move. The selected square is already taken.' });
        return;
    }
    squares[index] = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    var isWinner = checkWinner(currentPlayer);
    var winner = isWinner ? currentPlayer : null;
    res.json({ squares: squares, currentPlayer: currentPlayer, winner: winner });
});
app.post('/api/reset', function (req, res) {
    squares = Array.from({ length: 9 }, function () { return null; });
    currentPlayer = 'X';
    res.json({ squares: squares, currentPlayer: currentPlayer });
});
var port = 3001;
app.listen(port, function () {
    console.log("Server is running on http://localhost:".concat(port));
});
