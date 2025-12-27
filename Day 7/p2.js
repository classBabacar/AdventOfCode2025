const { input } = require("./input");

const grid = [];
input.forEach((line) => {
  const gridRow = line.split("");
  grid.push(gridRow);
});

function mainLoop(grid) {
  const [startRow, startCol] = findStartingPosition(grid);
  const rows = grid.length;
  const cols = grid[0].length;

  // think of this as a cache to avoid repeated work
  const mem = Array.from({ length: rows }, () => Array(cols).fill(-1));

  // we dont need the result here, just need the cache, java by default is pass by reference
  const dummyValue = dfs(grid, mem, startRow, startCol);

  console.log("Number of Ways: ", mem[startRow][startCol]);
}

// unnecessary method, but nice to have
function findStartingPosition(grid) {
  for (let row = 0; row < grid.length; ++row) {
    for (let col = 0; col < grid[0].length; ++col) {
      if (grid[row][col] === "S") {
        return [row, col];
      }
    }
  }

  // shouldn't be possible
  return [0, 0];
}

function dfs(grid, mem, row, col) {
  if (col < 0 || col >= grid[0].length || row < 0 || row >= grid.length)
    return 0;

  if (mem[row][col] != -1) {
    return mem[row][col];
  }

  // base case
  if (row == grid.length - 1) {
    return 1;
  }

  if (grid[row][col] === "^") {
    mem[row][col] = dfs(grid, mem, row, col - 1) + dfs(grid, mem, row, col + 1);
  } else {
    mem[row][col] = dfs(grid, mem, row + 1, col);
  }

  return mem[row][col];
}

mainLoop(grid);
