// script.js

document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusText = document.getElementById('status');
    const restartButton = document.getElementById('restart');
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

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
            const [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return true;
            }
        }
        return false;
    };

    const restartGame = () => {
        currentPlayer = 'X';
        board = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        statusText.textContent = `It's ${currentPlayer}'s turn`;
        cells.forEach(cell => cell.textContent = '');
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);

    statusText.textContent = `It's ${currentPlayer}'s turn`;
});
