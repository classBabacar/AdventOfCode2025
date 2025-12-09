const { input } = require("./input");

let lockPosition = 50;
let result = 0;

input.forEach((line) => {
  let direction = line[0];
  let dial = parseInt(line.slice(1));

  lockPosition = processLock(lockPosition, dial, direction);
});

function processLock(lockPosition, dial, direction) {
  while (dial > 0) {
    if (lockPosition == 0) result++;

    direction == "R" ? lockPosition++ : lockPosition--;

    if (lockPosition >= 100) {
      lockPosition = 0;
    }
    if (lockPosition < 0) {
      lockPosition = 99;
    }
    dial--;
  }

  return lockPosition;
}

console.log("result is: ", result);
