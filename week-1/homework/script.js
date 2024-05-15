// script.js

document.addEventListener('DOMContentLoaded', () => {
    const boardSize = 3; // Change this to generate a different board size
    let currentPlayer = 'X';
    let board = Array(boardSize * boardSize).fill('');
    let gameActive = true;

    const cells = [];
    const statusText = document.getElementById('status');
    const restartButton = document.getElementById('restart');
    const gameBoard = document.getElementById('game-board');

    const createBoard = () => {
        gameBoard.style.gridTemplateColumns = `repeat(${boardSize}, 100px)`;
        gameBoard.style.gridTemplateRows = `repeat(${boardSize}, 100px)`;
        for (let i = 0; i < boardSize * boardSize; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-index', i);
            cell.addEventListener('click', handleCellClick);
            gameBoard.appendChild(cell);
            cells.push(cell);
        }
    };

    const generateWinningConditions = (size) => {
        const conditions = [];
        for (let i = 0; i < size; i++) {
            // Rows
            const row = [];
            for (let j = 0; j < size; j++) {
                row.push(i * size + j);
            }
            conditions.push(row);

            // Columns
            const col = [];
            for (let j = 0; j < size; j++) {
                col.push(j * size + i);
            }
            conditions.push(col);
        }

        // Diagonals
        const diag1 = [];
        const diag2 = [];
        for (let i = 0; i < size; i++) {
            diag1.push(i * size + i);
            diag2.push(i * size + (size - 1 - i));
        }
        conditions.push(diag1);
        conditions.push(diag2);

        return conditions;
    };

    const winningConditions = generateWinningConditions(boardSize);

    const handleCellClick = (event) => {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (board[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        board[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;

        if (checkWin()) {
            statusText.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
        } else if (!board.includes('')) {
            statusText.textContent = `It's a draw!`;
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusText.textContent = `It's ${currentPlayer}'s turn`;

            if (currentPlayer === 'O') {
                aiMove();
            }
        }
    };

    const aiMove = () => {
        const bestMove = getBestMove(board, 'O');
        board[bestMove] = 'O';
        cells[bestMove].textContent = 'O';

        if (checkWin()) {
            statusText.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
        } else if (!board.includes('')) {
            statusText.textContent = `It's a draw!`;
            gameActive = false;
        } else {
            currentPlayer = 'X';
            statusText.textContent = `It's ${currentPlayer}'s turn`;
        }
    };

    const getBestMove = (newBoard, player) => {
        let bestVal = -Infinity;
        let move = -1;

        for (let i = 0; i < newBoard.length; i++) {
            if (newBoard[i] === '') {
                newBoard[i] = player;
                let moveVal = minimax(newBoard, 0, false, -Infinity, Infinity);
                newBoard[i] = '';
                if (moveVal > bestVal) {
                    move = i;
                    bestVal = moveVal;
                }
            }
        }
        return move;
    };

    const minimax = (newBoard, depth, isMaximizingPlayer, alpha, beta) => {
        const scores = {
            'X': -1,
            'O': 1,
            'tie': 0
        };

        const result = evaluateBoard(newBoard);
        if (result !== null) {
            return scores[result];
        }

        if (isMaximizingPlayer) {
            let best = -Infinity;
            for (let i = 0; i < newBoard.length; i++) {
                if (newBoard[i] === '') {
                    newBoard[i] = 'O';
                    best = Math.max(best, minimax(newBoard, depth + 1, false, alpha, beta));
                    newBoard[i] = '';
                    alpha = Math.max(alpha, best);
                    if (beta <= alpha) {
                        break;
                    }
                }
            }
            return best;
        } else {
            let best = Infinity;
            for (let i = 0; i < newBoard.length; i++) {
                if (newBoard[i] === '') {
                    newBoard[i] = 'X';
                    best = Math.min(best, minimax(newBoard, depth + 1, true, alpha, beta));
                    newBoard[i] = '';
                    beta = Math.min(beta, best);
                    if (beta <= alpha) {
                        break;
                    }
                }
            }
            return best;
        }
    };

    const evaluateBoard = (board) => {
        for (const condition of winningConditions) {
            const [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        if (!board.includes('')) {
            return 'tie';
        }
        return null;
    };

    const checkWin = () => {
        for (const condition of winningConditions) {
            if (condition.every(index => board[index] === currentPlayer)) {
                return true;
            }
        }
        return false;
    };

    const restartGame = () => {
        currentPlayer = 'X';
        board = Array(boardSize * boardSize).fill('');
        gameActive = true;
        statusText.textContent = `It's ${currentPlayer}'s turn`;
        cells.forEach(cell => cell.textContent = '');
    };

    createBoard();
    restartButton.addEventListener('click', restartGame);
    statusText.textContent = `It's ${currentPlayer}'s turn`;
});
