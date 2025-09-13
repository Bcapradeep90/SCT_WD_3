const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetBtn = document.getElementById('reset');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

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

function handleCellClick(e) {
  const clickedCell = e.target;
  const clickedIndex = parseInt(clickedCell.getAttribute('data-index'));

  if (gameState[clickedIndex] !== '' || !isGameActive) {
    return;
  }

  updateCell(clickedCell, clickedIndex);
  checkResult();
}

function updateCell(cell, index) {
  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function changePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = `Player ${currentPlayer}'s turn`;
}

function checkResult() {
  let roundWon = false;

  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    status.textContent = `Player ${currentPlayer} wins!`;
    isGameActive = false;
    return;
  }

  if (!gameState.includes('')) {
    status.textContent = "It's a draw!";
    isGameActive = false;
    return;
  }

  changePlayer();
}

function resetGame() {
  currentPlayer = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];
  isGameActive = true;
  status.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => (cell.textContent = ''));
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
