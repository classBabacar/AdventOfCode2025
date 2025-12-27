const { input } = require("./input");

let operationTable = [];
input.forEach((line) => {
  const splitLine = line.split(" ");
  const tempStorage = [];

  for (let i = 0; i < splitLine.length; ++i) {
    if (splitLine[i] !== "") {
      tempStorage.push(splitLine[i]);
    }
  }

  operationTable.push(tempStorage);
});

function mainLoop(operationTable) {
  const operationResult = solveOperations(operationTable);
  console.log("Result: ", operationResult);
}

function solveOperations(operationTable) {
  let result = 0;
  let num1;
  let num2;
  let expression;

  for (let col = 0; col < operationTable[0].length; ++col) {
    num1 = operationTable[0][col];
    expression = operationTable[operationTable.length - 1][col];

    for (let row = 1; row < operationTable.length - 1; ++row) {
      num2 = operationTable[row][col];
      num1 = evaluateEquation(num1, num2, expression);
    }

    result += num1;
  }

  return result;
}

function evaluateEquation(num1, num2, expression) {
  if (expression === "+") {
    return Number(num1) + Number(num2);
  } else if (expression === "*") {
    return Number(num1) * Number(num2);
  } else {
    console.log("expression is bad", expression);
    return 0;
  }
}

mainLoop(operationTable);
