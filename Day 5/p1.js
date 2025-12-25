const { input } = require("./input");

const intervals = [];
const ingredientsIds = [];
let emptyLine = false;

input.forEach((line) => {
  if (line.length === 0) {
    emptyLine = true;
    return;
  }

  if (!emptyLine) {
    // find all the ranges
    startEndRanges = line.split("-");

    const start = Number(startEndRanges[0]);
    const end = Number(startEndRanges[1]);
    intervals.push([start, end]);
  } else {
    ingredientsIds.push(Number(line));
  }
});

function mainLoop(intervals, ingredientsIds) {
  intervals.sort(function (a, b) {
    return a[0] - b[0]; // sort based on starting range
  });

  const sortedIntervals = mergeIntervals(intervals);
  const freshIngredients = getFreshIngredients(sortedIntervals, ingredientsIds);
  console.log("Fresh Ingredients: ", freshIngredients);
}

/*
 [ 3, 5 ], [ 10, 14 ],  [ 12, 18 ], [ 16, 20 ]
  converted to (simplification for intervals) -- reduce overlapping ranges
 [ 3 , 5 ], [ 10, 20 ]
*/
function mergeIntervals(intervals) {
  const sortedIntervals = [];

  let startingInterval = intervals[0];
  for (let i = 1; i < intervals.length; ++i) {
    let leftEnd = startingInterval[1];

    let rightStart = intervals[i][0];
    let rightEnd = intervals[i][1];

    //
    if (leftEnd >= rightStart) {
      startingInterval[1] = Math.max(leftEnd, rightEnd);
    } else {
      sortedIntervals.push(startingInterval);
      startingInterval = intervals[i];
    }
  }
  sortedIntervals.push(startingInterval);

  return sortedIntervals;
}

function getFreshIngredients(sortedIntervals, ingredientsIds) {
  let result = 0;
  let leftRange;
  let rightRange;
  let ingredientsId;

  for (let i = 0; i < ingredientsIds.length; ++i) {
    for (let j = 0; j < sortedIntervals.length; ++j) {
      leftRange = sortedIntervals[j][0];
      rightRange = sortedIntervals[j][1];
      ingredientsId = ingredientsIds[i];
      if (ingredientsId >= leftRange && ingredientsId <= rightRange) {
        result++;
      }
    }
  }

  return result;
}

mainLoop(intervals, ingredientsIds);
