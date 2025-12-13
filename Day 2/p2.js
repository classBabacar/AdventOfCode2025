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
    checkInvalidIds(start, end);
  }
}

function checkInvalidIds(start, end) {
  for (let num = start; num <= end; ++num) {
    let stringNumber = num.toString();
    let substringDistance = 1;
    for (i of stringNumber) {
      let subId = stringNumber.substring(0, substringDistance++);
      let emptyId = "";
      let addsHappened = 0;

      while (emptyId.length < stringNumber.length) {
        addsHappened++;
        emptyId = emptyId + subId;
      }

      let IdAsDigit = Number(emptyId);
      if (
        addsHappened >= 2 &&
        emptyId == stringNumber &&
        IdAsDigit >= start &&
        IdAsDigit <= end
      ) {
        result += IdAsDigit;
        break; // this break is here to avoid duplicates
      }
    }
  }
}

getIds(parseFile(fileLines));

console.log("Invalid Id Sum: ", result);
