const { input } = require("./input");

const operationTable = [];
input.forEach((line) => {
  const splitLine = line.split("");
  operationTable.push(splitLine);
});

function mainLoop(operationTable) {
  const lastRow = operationTable.length - 1;
  const expressions = operationTable[lastRow].filter((v) => v !== " ");
  const rightToLeftTable = getRightToLeftTable(operationTable);

  for (let i = 0; i < expressions.length; ++i) {
    // pushing the expression at the end of each row
    rightToLeftTable[i].push(expressions[i].trim());
  }

  const operationResult = solveOperations(rightToLeftTable);
  console.log("Result: ", operationResult);
}

function getRightToLeftTable(operationTable) {
  const digitsTable = [];
  let digits = [];
  let digitSoFar;

  for (let col = 0; col < operationTable[0].length; ++col) {
    digitSoFar = "";
    for (let row = 0; row < operationTable.length - 1; ++row) {
      digitSoFar += operationTable[row][col];
    }

    // if empty string entirely, empty column, we move on.
    if (digitSoFar.trim().length === 0) {
      digitsTable.push(digits);
      digits = [];
    } else {
      digits.push(digitSoFar);
    }
  }

  return digitsTable;
}

function solveOperations(rightToLeftTable) {
  let result = 0;
  let num1;
  let num2;
  let expression;

  for (let row = 0; row < rightToLeftTable.length; ++row) {
    // now all cols are same length (subtle but important detail about this problem)
    const currentRow = rightToLeftTable[row];
    num1 = rightToLeftTable[row][0];
    expression = currentRow[currentRow.length - 1];

    for (let col = 1; col < rightToLeftTable[row].length - 1; ++col) {
      num2 = rightToLeftTable[row][col];
      num1 = evaluateEquation(num1, num2, expression);
    }

    result += num1;
  }

  return result;
}

function evaluateEquation(num1, num2, expression) {
  if (expression == "+") {
    return Number(num1) + Number(num2);
  } else if (expression == "*") {
    return Number(num1) * Number(num2);
  } else {
    console.log("expression is bad", expression);
    return 0;
  }
}

mainLoop(operationTable);
