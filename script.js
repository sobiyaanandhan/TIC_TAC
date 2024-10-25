const cells = document.querySelectorAll('[data-cell]');
const statusMessage = document.getElementById('statusMessage');
const resetButton = document.getElementById('resetButton');

let currentPlayer = 'X';
let gameActive = true;
const boardState = Array(9).fill(null); // Tracks the current state of the game

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});

resetButton.addEventListener('click', resetGame);

function handleClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (!gameActive || boardState[cellIndex] !== null) return;

    placeMark(cell, cellIndex);
    checkGameResult();
}

function placeMark(cell, index) {
    boardState[index] = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
    cell.textContent = currentPlayer;
}

function checkGameResult() {
    let winner = null;

    winningCombinations.some(combination => {
        const [a, b, c] = combination;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            winner = currentPlayer;
            highlightWinningCombination(combination);
            return true;
        }
        return false;
    });

    if (winner) {
        statusMessage.textContent = `Player ${winner} wins!`;
        gameActive = false;
    } else if (boardState.every(cell => cell !== null)) {
        statusMessage.textContent = 'It\'s a draw!';
        gameActive = false;
    } else {
        switchPlayer();
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusMessage.textContent = `Player ${currentPlayer}'s turn`;
}

function highlightWinningCombination(combination) {
    combination.forEach(index => {
        cells[index].classList.add('win');
    });
}

function resetGame() {
    currentPlayer = 'X';
    gameActive = true;
    boardState.fill(null);

    cells.forEach(cell => {
        cell.classList.remove('x', 'o', 'win');
        cell.textContent = '';
        cell.addEventListener('click', handleClick, { once: true });
    });

    statusMessage.textContent = 'Player X\'s turn';
}
