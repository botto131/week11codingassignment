// Track the game state
let currentPlayer = 'X';
let gameState = Array(9).fill(null); // Array to track the state of the grid (null means unoccupied)

// Function to handle cell click
function handleCellClick(event) {
    const cellIndex = event.target.getAttribute('data-index');

    // If the cell is already occupied or the game is over, do nothing
    if (gameState[cellIndex] !== null || checkWinner()) {
        return;
    }

    // Update the grid state and UI
    gameState[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

    // Check if the game is won or is a draw
    if (checkWinner()) {
        showAlert(`${currentPlayer} Wins!`);
    } else if (!gameState.includes(null)) {
        showAlert("It's a Draw!");
    } else {
        // Switch player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('turn-indicator').textContent = `${currentPlayer}'s Turn`;
    }
}

// Function to check for a winner
function checkWinner() {
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

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return true;
        }
    }

    return false;
}

// Function to show a Bootstrap alert
function showAlert(message) {
    const alertPlaceholder = document.getElementById('alert-placeholder');
    alertPlaceholder.innerHTML = `<div class="alert alert-success">${message}</div>`;
}

// Function to restart the game
function restartGame() {
    gameState = Array(9).fill(null); // Reset the game state
    document.querySelectorAll('.cell').forEach(cell => cell.textContent = ''); // Clear the grid
    document.getElementById('alert-placeholder').innerHTML = ''; // Remove any alerts
    currentPlayer = 'X'; // Reset the starting player
    document.getElementById('turn-indicator').textContent = "X's Turn"; // Reset the turn indicator
}

// Add event listeners
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.getElementById('restart-button').addEventListener('click', restartGame);