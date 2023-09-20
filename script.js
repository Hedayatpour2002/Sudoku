const sudoku = Array(9)
  .fill()
  .map(() => Array(9).fill(0));

creatNewSudoku();

function creatNewSudoku(row = 0, column = 0) {
  if (column >= sudoku[0].length) {
    column = 0;
    row++;
  }
  if (row >= sudoku.length) {
    return true;
  }

  for (let number = 1; number <= 9; number++) {
    const newNumber = randomNumber();

    if (isValid(newNumber, row, column)) {
      sudoku[row][column] = newNumber;

      if (creatNewSudoku(row, column + 1)) {
        return true;
      }

      sudoku[row][column] = 0;
    }
  }
}

function checkRow(number, row) {
  return !sudoku[row].includes(number);
}

function checkColumn(number, row, column) {
  for (let i = 0; i < row; i++) {
    if (sudoku[i][column] === number) return false;
  }

  return true;
}

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

function isValid(number, row, column) {
  return (
    checkRow(number, row) &&
    checkColumn(number, row, column) &&
    checkSquare(number, row, column)
  );
}

function randomNumber() {
  return Math.floor(Math.random() * 9) + 1;
}
