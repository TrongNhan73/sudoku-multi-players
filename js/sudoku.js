const createEmptyGrid = () => {
  return Array.from({ length: 9 }, () => Array(9).fill(0));
};


const isSafe = (grid, row, col, num) => {
  for (let i = 0; i < 9; i++) {
    if (grid[row][i] === num || grid[i][col] === num) return false;
  }

  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[startRow + i][startCol + j] === num) return false;
    }
  }
  return true;
};

const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

function countSolutions(grid, limit = 2) {
  let count = 0;

  function dfs() {
    // Tìm ô trống
    let found = false;
    let r = -1,
      c = -1;
    for (let i = 0; i < 9 && !found; i++) {
      for (let j = 0; j < 9; j++) {
        if (grid[i][j] === 0) {
          r = i;
          c = j;
          found = true;
          break;
        }
      }
    }
    if (!found) {
      count++;
      return count >= limit; // nếu vượt limit → stop
    }

    for (let num = 1; num <= 9; num++) {
      if (isSafe(grid, r, c, num)) {
        grid[r][c] = num;
        if (dfs()) {
          grid[r][c] = 0;
          return true;
        } // early exit
        grid[r][c] = 0;
      }
    }
    return false;
  }

  dfs();
  return count;
}

const fillGrid = (grid) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        shuffle(numbers); // trộn ngẫu nhiên để bảng khác nhau mỗi lần
        for (const num of numbers) {
          if (isSafe(grid, row, col, num)) {
            grid[row][col] = num;
            if (fillGrid(grid)) return true;
            grid[row][col] = 0;
          }
        }
        return false; // nếu không có số nào hợp lệ, quay lui
      }
    }
  }
  return true; // đã đầy đủ
};

const removeCells = (grid, clues = 40) => {
  let puzzle = grid.map((row) => row.slice());
  const positions = Array.from({ length: 9 * 9 }, (_, i) => i);
  shuffle(positions);

  let removed = 9 * 9;
  for (const pos of positions) {
    const row = Math.floor(pos / 9);
    const col = pos % 9;
    const backup = puzzle[row][col];
    puzzle[row][col] = 0;

    const work = puzzle.map((r) => r.slice()); // copy
    if (countSolutions(work, 2) !== 1) {
      puzzle[row][col] = backup; // revert, không xóa ô này
    } else {
      removed--;
    }
    if (removed <= 9 * 9 - clues) break;
  }
  return puzzle;
};

const boardToObject = (grid) => {
  const obj = {};
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      obj[`${i+1}-${j+1}`] = grid[i][j];
    }
  }
  return obj;
}

const objectToBoard = (obj) => {
  const grid = createEmptyGrid();
  for (const key in obj) {
    const [row, col] = key.split('-').map(Number);
    grid[row - 1][col - 1] = obj[key];
  }
  return grid;
}

const isCompleteBoard = (grid) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (grid[i][j] === 0) return false;
    }
  }
  return true;
}