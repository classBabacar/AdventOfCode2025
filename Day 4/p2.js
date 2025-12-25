const { input } = require("./input");

const grid = [];

input.forEach((line) => {
  const row = [];

  for (char of line) {
    row.push(char);
  }
  grid.push(row);
});

function mainLoop(grid) {
  let badPapers = 0;
  let result;
  do {
    const positions = [];
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col] === "@") {
          positions.push([row, col]);
        }
      }
    }

    [grid, result] = bfs(positions, grid);
    badPapers += result;
  } while (result != 0); // if there was no guarantee terminal state then this would need to be changed

  console.log("Rolls of papers removed: ", badPapers);
}

function bfs(positions, grid) {
  let result = 0;
  const directions = [
    [-1, 0], // up
    [1, 0], // down
    [0, 1], // right
    [0, -1], // left
    [-1, -1], // up left
    [-1, 1], // up right
    [1, 1], // down right
    [1, -1], // down left
  ];

  const positionsToBeRemoved = [];
  while (typeof (i = positions.shift()) !== "undefined") {
    const row = i[0];
    const col = i[1];

    let surrounding = 0;
    for (direction of directions) {
      const newRow = row + direction[0];
      const newCol = col + direction[1];

      if (
        newRow < 0 ||
        newCol < 0 ||
        newRow >= grid.length ||
        newCol >= grid[0].length
      )
        continue;

      if (grid[newRow][newCol] === "@") surrounding++;
    }

    if (surrounding < 4) {
      result++;
      positionsToBeRemoved.push([row, col]);
    }
  }

  while (typeof (i = positionsToBeRemoved.shift()) !== "undefined") {
    const row = i[0];
    const col = i[1];
    grid[row][col] = "x"; // setting it to dummy value to mark as "visited"
  }

  return [grid, result];
}

mainLoop(grid);
