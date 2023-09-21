const $ = document;
const playBtnElem = $.querySelector(".start__play");
const usernameInputElem = $.querySelector(".start__username");
const usernameElem = $.querySelector(".nav__username");

const restartBtnElem = $.querySelector(".restart");
const removeNumbersBtnElem = $.querySelector(".remove-numbers");

const numberLevelBtnElem = $.querySelector(".level__number");
const previousLevelBtnElem = $.querySelector(".level__previous");
const nextLevelBtnElem = $.querySelector(".level__next");

let level = 1;

const cellsElem = $.querySelectorAll(".cell");
const boardElem = $.querySelector(".board");

function startGame() {
  const isValidUsername = checkUsername(usernameInputElem.value);
  if (!isValidUsername) {
    usernameInputElem.classList.add("invalid");
    return;
  }

  $.body.classList.add("play");

  sudoku = Array(9)
    .fill()
    .map(() => Array(9).fill(0));

  creatNewSudoku();
  renderSudoku();
}

function renderSudoku() {
  cellsElem.forEach((cell) => {
    if (cell.dataset.default) {
      cell.dataset.default = "";
      cell.textContent = "";
    }
  });

  numberLevelBtnElem.textContent = level;
  cellDisplayQuantity = level === 1 ? 45 : level === 2 ? 30 : 20;

  const puzzle = creatNewPuzzle(cellDisplayQuantity);

  for (let i = 0; i < 9; i++)
    for (let j = 0; j < 9; j++)
      if (puzzle[i][j] != 0) {
        boardElem.children[i].children[j].textContent = puzzle[i][j];
        boardElem.children[i].children[j].dataset.default = "true";
      }
}
function creatNewPuzzle(number) {
  number = 81 - number;
  const puzzle = sudoku.map((item) => item.slice());

  const indexs = [];

  for (let i = 0; i < number; i++) {
    const newI = randomNumber(9);
    const newJ = randomNumber(9);

    if (
      !indexs.some((item) => {
        return item[0] === newI && item[1] === newJ;
      })
    ) {
      indexs.push([newI, newJ]);
    } else {
      i--;
    }
  }
  for (const key of indexs) {
    const i = key[0] - 1;
    const j = key[1] - 1;
    puzzle[i][j] = 0;
  }
  return puzzle;
}

function restartGame() {
  $.body.classList.remove("play");
}
function checkUsername(username) {
  if (username) {
    usernameElem.textContent = username;
    localStorage.setItem("username", username);
    return true;
  }

  return false;
}

previousLevelBtnElem.addEventListener("click", () => {
  if (level === 1) return;
  nextLevelBtnElem.classList.remove("level__step--inactive");
  level--;
  if (level === 1) {
    previousLevelBtnElem.classList.add("level__step--inactive");
  }
  startGame();
});
nextLevelBtnElem.addEventListener("click", () => {
  if (level === 3) return;
  previousLevelBtnElem.classList.remove("level__step--inactive");
  level++;
  if (level === 3) {
    nextLevelBtnElem.classList.add("level__step--inactive");
  }
  startGame();
});
restartBtnElem.addEventListener("click", restartGame);
playBtnElem.addEventListener("click", startGame);
usernameInputElem.addEventListener("input", () => {
  usernameInputElem.classList.remove("invalid");
});
window.addEventListener("load", () => {
  usernameInputElem.value = localStorage.getItem("username");
});

// !====> sudoku logic start <====!

let sudoku = Array(9)
  .fill()
  .map(() => Array(9).fill(0));

function creatNewSudoku(row = 0, column = 0) {
  // Checks if we have reached the end of the column.
  if (column >= sudoku[0].length) {
    // If we have reached the end of the column, move to the next row and reset the column to 0.
    column = 0;
    row++;
  }

  // Checks if we have reached the end of the row.
  if (row >= sudoku.length) {
    // If we have reached the end of the row, then we have successfully generated a Sudoku puzzle and we can return `true`.
    return true;
  }

  for (let number = 1; number <= 9; number++) {
    // Generates a random number.
    const newNumber = randomNumber();

    // Checks if the new number is valid to place in the current cell.
    if (isValid(newNumber, row, column)) {
      sudoku[row][column] = newNumber;

      // Recursively calls the `creatNewSudoku()` function to try to place a number in the next cell.
      if (creatNewSudoku(row, column + 1)) {
        // If the recursive call is successful, then we have successfully generated a Sudoku puzzle and we can return `true`.
        return true;
      }
      // If the recursive call is not successful, then we need to try placing a different number in the current cell.
      sudoku[row][column] = 0;
    }
  }
  // If we have tried all possible numbers and none of them were valid, then we cannot generate a Sudoku puzzle and we can return `false`.
  return false;
}

// Checks if the number is already present in the row.
function checkRow(number, row) {
  return !sudoku[row].includes(number);
}

// Checks if the number is already present in the column.
function checkColumn(number, row, column) {
  for (let i = 0; i < row; i++) {
    if (sudoku[i][column] === number) return false;
  }

  return true;
}

// Checks if the number is already present in the 3x3 square containing the cell.
function checkSquare(number, row, column) {
  const startRow = row - (row % 3);
  const startColumn = column - (column % 3);

  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startColumn; j < startColumn + 3; j++) {
      if (sudoku[i][j] === number) return false;
    }
  }

  return true;
}

// Function that checks if a number is valid to place in a given cell.
function isValid(number, row, column) {
  return (
    checkRow(number, row) &&
    checkColumn(number, row, column) &&
    checkSquare(number, row, column)
  );
}

// Function that generates a random number from 1 to 9.
function randomNumber() {
  return Math.floor(Math.random() * 9) + 1;
}
