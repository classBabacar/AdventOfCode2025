const { input } = require("./input");
const { UnionFind } = require("./union_find.js");

const grid = [];
input.forEach((line) => {
  const gridRow = line.split(",").map(Number);
  grid.push(gridRow);
});

function mainLoop(grid) {
  let unionFinder = new UnionFind(grid.length);
  let pairs = generatePairs(grid);
  let sizeArray = getSetSizes(unionFinder, pairs);
  let result = sizeArray.sort((a, b) => b - a);
  console.log(
    "Sizes of the three largest circuits:",
    result[0] * result[1] * result[2]
  );
}

function generatePairs(grid) {
  let pairs = [];
  let pair;

  for (let i = 0; i < grid.length; ++i) {
    pair = [];
    for (let j = 0; j < grid.length; ++j) {
      if (i === j) continue;

      let distance = calculate3DEuclideanDistance(grid[i], grid[j]);
      pair = [distance, i, j];
      pairs.push(pair);
    }
  }

  return pairs.sort((a, b) => a[0] - b[0]);
}

function getSetSizes(unionFinder, pairs) {
  // remove duplicates, and grab first N (pairsToGrab)
  const pairsToGrab = 1000;
  const filteredPairs = pairs
    .filter((_, index) => index % 2 === 0) // chatGPT, no clue how to do otherwise
    .slice(0, pairsToGrab);

  for (let i = 0; i < filteredPairs.length; ++i) {
    let set1 = filteredPairs[i][1];
    let set2 = filteredPairs[i][2];

    unionFinder.uniteSet(set1, set2);
  }

  return unionFinder.getAllSizes();
}

function calculate3DEuclideanDistance(p1, p2) {
  let sums =
    Math.pow(p1[0] - p2[0], 2) +
    Math.pow(p1[1] - p2[1], 2) +
    Math.pow(p1[2] - p2[2], 2);

  return Math.sqrt(sums);
}

mainLoop(grid);
