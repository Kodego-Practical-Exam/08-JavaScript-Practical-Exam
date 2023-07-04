"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var boardEvaluator_1 = require("./tic-tac-toe-lib/boardEvaluator");
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.post('/evaluate-board', function (req, res) {
    var _a = req.body, squares = _a.squares, move = _a.move;
    if (!Array.isArray(squares) || squares.length !== 9 || !Number.isInteger(move) || move < 0 || move > 8) {
        res.status(400).json({ error: 'Invalid request. The request should contain "squares" (an array of 9 elements) and "move" (an integer between 0 and 8).' });
        return;
    }
    if (!(0, boardEvaluator_1.isMoveLegal)(squares, move)) {
        res.status(400).json({ error: 'Invalid move. The selected square is already taken.' });
        return;
    }
    squares[move] = 'X';
    var winner = (0, boardEvaluator_1.calculateWinner)(squares);
    if (winner) {
        res.json({ winner: winner });
        return;
    }
    if ((0, boardEvaluator_1.isBoardFull)(squares)) {
        res.json({ draw: true });
        return;
    }
    var emptySquares = squares.map(function (square, index) { return (square === null ? index : null); }).filter(function (index) { return index !== null; });
    var computerMove = emptySquares[Math.floor(Math.random() * emptySquares.length)];
    squares[computerMove] = 'O';
    var computerWinner = (0, boardEvaluator_1.calculateWinner)(squares);
    if (computerWinner) {
        res.json({ winner: computerWinner });
        return;
    }
    if ((0, boardEvaluator_1.isBoardFull)(squares)) {
        res.json({ draw: true });
        return;
    }
    res.json({ nextMove: squares });
});
var port = 3001;
app.listen(port, function () {
    console.log("Server is running on http://localhost:".concat(port));
});
