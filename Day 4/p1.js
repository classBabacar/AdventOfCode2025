const { input } = require("./input");

const grid = [];
input.forEach((line) => {
  let row = [];

  for (char of line) {
    row.push(char);
  }
  grid.push(row);
});

function mainLoop(grid) {
  const positions = [];
  for (let row = 0; row < grid.length; row++) {
    for (col = 0; col < grid[row].length; ++col) {
      if (grid[row][col] === "@") {
        positions.push([row, col]);
      }
    }
  }

  const result = bfs(positions, grid);
  console.log("Rolls of paper accessed: ", result);
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

  while (typeof (i = positions.shift()) !== "undefined") {
    let row = i[0];
    let col = i[1];

    let surrounding = 0;
    for (direction of directions) {
      let newRow = row + direction[0];
      let newCol = col + direction[1];

      if (
        newRow < 0 ||
        newCol < 0 ||
        newRow >= grid.length ||
        newCol >= grid[0].length
      )
        continue;

      if (grid[newRow][newCol] === "@") surrounding++;
    }

    if (surrounding < 4) result++;
  }

  return result;
}

mainLoop(grid);
