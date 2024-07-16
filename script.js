const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const customAlert = document.getElementById('custom-alert');
const alertMessage = document.getElementById('alert-message');
const closeAlertButton = document.getElementById('close-alert');
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const vsComputerButton = document.getElementById('vs-computer');
const vsPlayerButton = document.getElementById('vs-player');
const startGameButton = document.getElementById('start-game');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const backToHomeButton = document.getElementById('back-to-home');

let currentPlayer = 'X';
let boardState = Array(9).fill(null);
let player1Name = 'Player 1';
let player2Name = 'Player 2';
let vsComputer = false;

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
        e.target.classList.add(currentPlayer.toLowerCase());
        console.log(`Player ${currentPlayer} moved to cell ${index}`);
        
        if (checkWinner(currentPlayer)) {
            console.log(`Player ${currentPlayer} wins!`);
            setTimeout(() => showAlert(`${getPlayerName(currentPlayer)} wins!`, getPlayerName(currentPlayer)), 100);
            return;
        } else if (boardState.every(cell => cell)) {
            console.log("It's a tie!");
            setTimeout(() => showAlert("It's a tie!", 'Tie'), 100);
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (vsComputer && currentPlayer === 'O') {
            computerMove();
        }
    }
}

function showAlert(message, winner) {
    alertMessage.textContent = message;
    customAlert.style.display = 'flex';

    closeAlertButton.classList.remove('green', 'red', 'blue');

    if (winner === `${player1Name}`) {
        console.log("Winner is Player 1, adding class 'green'");
        closeAlertButton.classList.add('green');
    } else if (winner === 'Computer' || winner === `${player2Name}`) {
        console.log("Winner is " + winner + ", adding class 'red'");
        closeAlertButton.classList.add('red');
    } else {
        console.log("It's a tie, adding class 'blue'");
        closeAlertButton.classList.add('blue');
    }

    console.log("Current classes on closeAlertButton:", closeAlertButton.className);
}

function resetGame() {
    boardState.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
    currentPlayer = 'X';
    customAlert.style.display = 'none';
}


function checkWinner(player) {
    const isWinner = winningCombinations.some(combination => {
        const result = combination.every(index => boardState[index] === player);
        console.log(`Checking combination ${combination}: ${result}`);
        return result;
    });
    console.log(`Player ${player} is winner: ${isWinner}`);
    return isWinner;
}


function computerMove() {
    let availableCells = boardState.map((val, index) => val === null ? index : null).filter(val => val !== null);
    let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    boardState[randomIndex] = currentPlayer;
    cells[randomIndex].textContent = currentPlayer;
    cells[randomIndex].classList.add(currentPlayer.toLowerCase());
    if (checkWinner(currentPlayer)) {
        setTimeout(() => showAlert(`${getPlayerName(currentPlayer)} wins!`, getPlayerName(currentPlayer)), 100);
        return;
    } else if (boardState.every(cell => cell)) {
        setTimeout(() => showAlert("It's a tie!", 'Tie'), 100);
        return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}


function getPlayerName(player) {
    if (vsComputer && player === 'O') {
        return 'Computer';
    }
    return player === 'X' ? player1Name : player2Name;
}

function startGame() {
    player1Name = player1Input.value || 'Player 1';
    if (!vsComputer) {
        player2Name = player2Input.value || 'Player 2';
    }
    startScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    resetGame();
}

function chooseVsComputer() {
    vsComputer = true;
    player1Input.style.display = 'block'; // اظهار حقل اسم اللاعب الأول
    player2Input.style.display = 'none'; // أخفاء حقل اسم اللاعب الثاني (إذا كان مرئياً)
    startGameButton.style.display = 'block'; // إظهار زر بدء اللعب
}

function chooseVsPlayer() {
    vsComputer = false;
    player1Input.style.display = 'block'; // إظهار حقل اسم اللاعب الأول
    player2Input.style.display = 'block'; // إظهار حقل اسم اللاعب الثاني
    startGameButton.style.display = 'block'; // إظهار زر بدء اللعب
}
function backToHome() {
    startScreen.style.display = 'block';
    gameScreen.style.display = 'none';
    resetGame();
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
closeAlertButton.addEventListener('click', resetGame);
startGameButton.addEventListener('click', startGame);
vsComputerButton.addEventListener('click', chooseVsComputer);
vsPlayerButton.addEventListener('click', chooseVsPlayer);
backToHomeButton.addEventListener('click', backToHome);
