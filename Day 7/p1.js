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
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const beamsSplit = bfs(visited, grid, startRow, startCol);

  console.log("Number of beams split: ", beamsSplit);
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

function bfs(visited, grid, startRow, startCol) {
  const queue = [[startRow, startCol]];
  let beamSplitCount = 0;

  while (typeof (i = queue.shift()) !== "undefined") {
    const row = i[0];
    const col = i[1];

    if (col < 0 || col >= grid[0].length || row < 0 || row >= grid.length)
      continue;

    // avoid repeat work
    if (visited[row][col]) continue;

    visited[row][col] = true;

    // splitter detected
    if (grid[row][col] === "^") {
      beamSplitCount++;
      // add left and or add right
      if (col - 1 >= 0 && !visited[row][col - 1]) {
        queue.push([row, col - 1]);
      }

      if (col + 1 < grid[0].length && !visited[row][col + 1]) {
        queue.push([row, col + 1]);
      }
    } else {
      queue.push([row + 1, col]);
    }

    // Adds style if you want to print the grid :)
    if (grid[row][col] === ".") {
      grid[row][col] = "|";
    }
  }

  return beamSplitCount;
}

mainLoop(grid);
