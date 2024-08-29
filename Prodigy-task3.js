const cells = document.querySelectorAll('[data-cell]');
const statusText = document.querySelector('.status');
const restartButton = document.querySelector('.restart');
let isXTurn = true;
let gameActive = true;

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

const handleClick = (e) => {
    const cell = e.target;
    const currentClass = isXTurn ? 'X' : 'O';
    if (cell.textContent || !gameActive) return;

    cell.textContent = currentClass;
    cell.classList.add(currentClass);

    if (checkWin(currentClass)) {
        statusText.textContent = `${currentClass} wins!`;
        gameActive = false;
    } else if (isDraw()) {
        statusText.textContent = 'It\'s a draw!';
        gameActive = false;
    } else {
        isXTurn = !isXTurn;
        statusText.textContent = `Player ${isXTurn ? 'X' : 'O'}'s turn`;
    }
};

const checkWin = (currentClass) => {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
};

const isDraw = () => {
    return [...cells].every(cell => {
        return cell.textContent;
    });
};

const restartGame = () => {
    isXTurn = true;
    gameActive = true;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });
    statusText.textContent = 'Player X\'s turn';
};

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

restartButton.addEventListener('click', restartGame);
