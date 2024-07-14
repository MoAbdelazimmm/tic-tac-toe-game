const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let boardState = Array(9).fill(null);

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleCellClick(e) {
    const index = e.target.dataset.index;
    if (!boardState[index]) {
        boardState[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        if (checkWinner(currentPlayer)) {
            setTimeout(() => alert(`${currentPlayer} wins!`), 100);
            setTimeout(resetGame, 1000);
            return;
        } else if (boardState.every(cell => cell)) {
            setTimeout(() => alert("It's a tie!"), 100);
            setTimeout(resetGame, 1000);
            return;
        }
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => boardState[index] === player);
    });
}

function resetGame() {
    boardState.fill(null);
    cells.forEach(cell => (cell.textContent = ''));
    currentPlayer = 'X';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
