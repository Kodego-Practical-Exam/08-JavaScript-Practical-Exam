"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var evaluateBoardState_1 = require("./evaluateBoardState");
var app = (0, express_1.default)();
app.use(express_1.default.json());
var squares = Array.from({ length: 9 }, function () { return null; });
var currentPlayer = 'X';
app.get('/', function (req, res) {
    res.send('Server is running');
});
app.get('/api/board', function (req, res) {
    var evaluationResult = (0, evaluateBoardState_1.evaluateBoardState)(squares);
    res.json({ squares: squares, currentPlayer: currentPlayer, winner: evaluationResult });
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
    var evaluationResult = (0, evaluateBoardState_1.evaluateBoardState)(squares);
    if (evaluationResult === 'X' || evaluationResult === 'O') {
        res.json({ squares: squares, currentPlayer: currentPlayer, winner: evaluationResult });
    }
    else if (evaluationResult === 'draw') {
        res.json({ squares: squares, currentPlayer: currentPlayer, winner: evaluationResult });
    }
    else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        res.json({ squares: squares, currentPlayer: currentPlayer });
    }
});
app.post('/api/reset', function (req, res) {
    squares = Array.from({ length: 9 }, function () { return null; });
    currentPlayer = 'X';
    res.json({ squares: squares, currentPlayer: currentPlayer, winner: null });
});
var port = 3001;
app.listen(port, function () {
    console.log("Server is running on http://localhost:".concat(port));
});
