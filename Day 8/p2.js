const { input } = require("./input");
const { UnionFind } = require("./union_find.js");

const grid = [];
input.forEach((line) => {
  const gridRow = line.split(",").map(Number);
  grid.push(gridRow);
});

function mainLoop(grid) {
  const unionFinder = new UnionFind(grid.length);
  const pairs = generatePairs(grid);
  const result = getLast2JunctionBoxes(grid, unionFinder, pairs);
  console.log("Result of first index of last 2 junction boxes:", result);
}

function generatePairs(grid) {
  const pairs = [];
  let pair;

  for (let i = 0; i < grid.length; ++i) {
    pair = [];
    for (let j = 0; j < grid.length; ++j) {
      if (i === j) continue;

      const distance = calculate3DEuclideanDistance(grid[i], grid[j]);
      pair = [distance, i, j];
      pairs.push(pair);
    }
  }

  return pairs.sort((a, b) => a[0] - b[0]);
}

function getLast2JunctionBoxes(grid, unionFinder, pairs) {
  const filteredPairs = pairs.filter((_, index) => index % 2 === 0); // chatGPT, no clue how to do otherwise

  for (let i = 0; i < filteredPairs.length; ++i) {
    const set1 = filteredPairs[i][1];
    const set2 = filteredPairs[i][2];

    unionFinder.uniteSet(set1, set2);

    const afterUniteSize = unionFinder.getAllSizes();
    for (let j = 0; j < afterUniteSize.length; ++j) {
      // this value may changed based on input given (1000)
      if (afterUniteSize[j] == 1000) {
        const t1 = grid[filteredPairs[i][1]];
        const t2 = grid[filteredPairs[i][2]];

        console.log("1st Junction Box:", t1);
        console.log("2nd Junction Box:", t2);

        return t1[0] * t2[0];
      }
    }
  }

  return -1; //shouldnt be possible unless the 1000 thing
}

function calculate3DEuclideanDistance(p1, p2) {
  const sums =
    Math.pow(p1[0] - p2[0], 2) +
    Math.pow(p1[1] - p2[1], 2) +
    Math.pow(p1[2] - p2[2], 2);

  return Math.sqrt(sums);
}

mainLoop(grid);
