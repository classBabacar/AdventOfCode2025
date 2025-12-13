const { input } = require("./input");

let fileLines = "";
let result = 0;

input.forEach((line) => {
  fileLines += line.trimEnd();
});

function parseFile(fileLines) {
  return fileLines.split(",");
}

function getIds(productIds) {
  for (productId of productIds) {
    startEndRanges = productId.split("-");
    let start = Number(startEndRanges[0]);
    let end = Number(startEndRanges[1]);
    let digitLength = startEndRanges[1].length - 1;
    checkInvalidIds(start, end, digitLength);
  }
}

function checkInvalidIds(start, end, digits) {
  let multipleOf10 = digits == 1 || digits == 2 ? 10 : Math.pow(10, digits);
  for (let i = 1; i < multipleOf10; ++i) {
    let left = i.toString();
    let right = i.toString();

    let stringAdd = left + right;
    let value = Number(stringAdd);
    if (value >= start && value <= end) {
      result += value;
    }

    // soften the blow lol
    if (value > end) break;
  }
}

getIds(parseFile(fileLines));

console.log("Invalid Id Sum: ", result);
