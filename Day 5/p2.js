const { input } = require("./input");

const intervals = [];
let emptyLine = false;

input.forEach((line) => {
  if (line.length === 0 || emptyLine) {
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
    return;
  }
});

function mainLoop(intervals) {
  intervals.sort(function (a, b) {
    return a[0] - b[0]; // sort based on starting range
  });

  const sortedIntervals = mergeIntervals(intervals);
  const distanceBetweenIntervals = getTotalIntervalDistance(sortedIntervals);
  console.log("Distance between intervals: ", distanceBetweenIntervals);
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

function getTotalIntervalDistance(sortedIntervals) {
  let result = 0;
  let start;
  let end;
  for (let i = 0; i < sortedIntervals.length; ++i) {
    start = sortedIntervals[i][0];
    end = sortedIntervals[i][1];

    // end - start + 1, gives the full range
    result += end - start + 1;
  }

  return result;
}

mainLoop(intervals);
