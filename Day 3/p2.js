const { input } = require("./input");

let maxJoltage = 0;

input.forEach((line) => {
  let bank = line;
  let stackLimit = 12; // N digits max for the stack
  let digitsUsable = 12; // can only choose N digits from a bank
  let removalsAllowed = bank.length - digitsUsable; // how many times are we allowed to remove a digit, to hit our benchmark
  let jolts = monotonicStack(bank, stackLimit, removalsAllowed);

  const joltsAsNumber = jolts.reduce((accumulator, currentValue) => {
    return accumulator * 10 + currentValue;
  }, 0);

  maxJoltage += joltsAsNumber;
});

function monotonicStack(bank, stackLimit, removalsAllowed) {
  let stack = [];
  for (let i = 0; i < bank.length; ++i) {
    let battery = Number(bank[i]);

    while (
      !stack.length == 0 &&
      removalsAllowed > 0 &&
      battery > stack[stack.length - 1]
    ) {
      stack.pop();
      removalsAllowed--;
    }

    stack.push(battery);
    if (stack.length > stackLimit && removalsAllowed > 0) {
      stack.pop();
      removalsAllowed--;
    }
  }

  return stack;
}

console.log("Max joltage across banks: ", maxJoltage);
