"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// Import evaluateBoardState()
var evaluateBoardState_1 = require("./evaluateBoardState");
// Create an Express application
var app = (0, express_1.default)();
app.use(express_1.default.json());
// Initialize the game state
var squares = Array.from({ length: 9 }, function () { return null; });
var currentPlayer = 'X';
//Root Endpoint that indicates the server is running
app.get('/', function (req, res) {
    res.send('Server is running');
});
// Endpoint that sets the current board state
app.get('/api/board', function (req, res) {
    // Evaluate the current board state
    var evaluationResult = (0, evaluateBoardState_1.evaluateBoardState)(squares);
    // Respond with the board state, current player, and winner or draw
    res.json({ squares: squares, currentPlayer: currentPlayer, winner: evaluationResult });
});
// Endpoint that evaluates the move on the board
app.post('/api/move', function (req, res) {
    var index = req.body.index;
    // Validate the move 
    if (!Number.isInteger(index) || index < 0 || index > 8) {
        res.status(400).json({ error: 'Invalid move. Please provide a valid square index (0-8).' });
        return;
    }
    // Check if the selected square is already taken
    if (squares[index]) {
        res.status(400).json({ error: 'Invalid move. The selected square is already taken.' });
        return;
    }
    // Make the move and update the current player
    squares[index] = currentPlayer;
    // Evaluate the board state after the move
    var evaluationResult = (0, evaluateBoardState_1.evaluateBoardState)(squares);
    // Respond with the updated board state, current player, and winner (if any)
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
// Endpoint that resets the game
app.post('/api/reset', function (req, res) {
    // Reset the game state to its initial values
    squares = Array.from({ length: 9 }, function () { return null; });
    currentPlayer = 'X';
    // Respond with the reset board state, current player, and null winner
    res.json({ squares: squares, currentPlayer: currentPlayer, winner: null });
});
// Start the server in port 3001
var port = 3001;
app.listen(port, function () {
    console.log("Server is running on http://localhost:".concat(port));
});
