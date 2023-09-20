const sudoku = Array(9)
  .fill()
  .map(() => Array(9).fill(0));

creatNewSudoku();

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
