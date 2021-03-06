const numbers = document.querySelectorAll(".num");
const operators = document.querySelectorAll(".op");
const clear = document.querySelector("#clear");
const enter = document.querySelector("#enter");
const backspace = document.querySelector("#back");
const dot = document.querySelector(".dot");

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("mouseover", mouseEnter);
  button.addEventListener("mouseout", mouseLeave);
});

function mouseEnter(e) {
  e.target.classList.add("mouse-enter");
}
function mouseLeave(e) {
  e.target.classList.remove("mouse-enter");
}

const current = document.querySelector("#current");
const previous = document.querySelector("#previous");

let currentNumber = [];
let previousNumber;
let firstOperator;
let secondOperator;

enter.addEventListener("click", calculateResult);

function calculateResult() {
  let a = previousNumber;
  let b = parseFloat(currentNumber.join(""));
  if (
    currentNumber.length === 0 &&
    firstOperator !== undefined &&
    a !== undefined
  ) {
    console.log(a);
    updateFinalScreen(a);
  } else {
    switch (firstOperator) {
      case "+":
        updateFinalScreen(a + b);
        break;

      case "-":
        updateFinalScreen(a - b);
        break;

      case "*":
        updateFinalScreen(a * b);
        break;

      case "/":
        updateFinalScreen(a / b);
        break;
    }
  }
  function updateFinalScreen(result) {
    previousNumber = result;
    currentNumber = [];
    current.textContent = "";
    previous.textContent = `${result}`;
    firstOperator = undefined;
    secondOperator = undefined;
  }
}

clear.addEventListener("click", clearAll);

function clearAll() {
  currentNumber = [];
  previousNumber = undefined;
  firstOperator = undefined;
  secondOperator = undefined;
  current.textContent = "0";
  previous.textContent = "";
}

backspace.addEventListener("click", deleteLast);
//paTAISYTI KAD IKSA GALETUM SPAUSTI KELIS KARTUS NX
function deleteLast() {
  let deletePrev = Array.from(`${previousNumber}`);
  if (previousNumber === undefined && currentNumber.length === 0) {
    return;
  } else if (currentNumber.length > 0) {
    currentNumber.pop();
    current.textContent = currentNumber.join("");
  } else if (firstOperator !== undefined) {
    current.textContent = "";
    firstOperator = undefined;
    previous.textContent = `${previousNumber}`;
  } else if (deletePrev.length > 1) {
    deletePrev.pop();
    previousNumber = parseFloat(deletePrev.join(""));
    previous.textContent = `${previousNumber}`;
  } else if (deletePrev.length === 1) {
    previous.textContent = "";
    previousNumber = undefined;
    deletePrev = [];
  } else {
    return;
  }
}

//When user clicks on a number and updates currentNumber
numbers.forEach((number) => {
  number.addEventListener("click", getNumber);
});
function getNumber(e) {
  let char = e.target.textContent;
  let lastChar = currentNumber[currentNumber.length - 1];
  if (char === ".") {
    manageFloats();
  } else if (firstOperator === undefined && previousNumber !== undefined) {
    let temporaryNum = previousNumber.toString().split("");
    temporaryNum.push(char);
    previousNumber = temporaryNum.join("");
    previous.textContent = `${previousNumber}`;
  } else if (currentNumber.length === 1 && lastChar === "0" && char === "0") {
    return;
  } else {
    currentNumber.push(char);
    updateCurrentScreen();
  }
}

function manageFloats() {
  if (currentNumber.includes(".")) {
    return;
  } else if (
    (currentNumber.length === 0 && previousNumber === undefined) ||
    (previousNumber !== undefined &&
      firstOperator !== undefined &&
      currentNumber.length === 0)
  ) {
    currentNumber.push("0", ".");
    updateCurrentScreen();
  } else if (
    currentNumber.length === 0 &&
    (firstOperator === undefined) & (previousNumber !== undefined)
  ) {
    let temporaryNum = previousNumber.toString().split("");
    if (temporaryNum.includes(".")) {
      return;
    } else {
      temporaryNum.push(".");
      previousNumber = temporaryNum.join("");
      previous.textContent = `${previousNumber}`;
    }
  } else {
    currentNumber.push(".");
    updateCurrentScreen();
  }
}
function updateCurrentScreen() {
  current.textContent = currentNumber.join("");
}
//when user clicks on operator:
operators.forEach((operator) => {
  operator.addEventListener("click", veryFirstRound);
});

function veryFirstRound(e) {
  let operator = e.target.textContent;
  if (previousNumber === undefined) {
    if (currentNumber.length === 0) {
      return;
    } else {
      previousNumber = parseFloat(currentNumber.join(""));
      firstOperator = operator;
      currentNumber = [];
      previous.textContent = `${previousNumber} ${operator}`;
      current.textContent = "";
      return;
    }
  } else if (currentNumber.length === 0 && firstOperator !== undefined) {
    return;
  } else if (firstOperator === undefined) {
    firstOperator = operator;
    previousNumber = parseFloat(previousNumber);
    previous.textContent = `${previousNumber} ${operator}`;
    return;
  } else {
    whichOperator(operator);
  }
}

function whichOperator(operator) {
  secondOperator = operator;
  operate(previousNumber, firstOperator, parseFloat(currentNumber.join("")));
}

function operate(a, op, b) {
  switch (op) {
    case "+":
      updateDisplay(a + b);
      break;

    case "-":
      updateDisplay(a - b);
      break;

    case "*":
      updateDisplay(a * b);
      break;

    case "/":
      updateDisplay(a / b);
      break;
  }
}

function updateDisplay(result) {
  currentNumber = [];
  current.textContent = "";
  previousNumber = result;
  previous.textContent = `${result} ${secondOperator}`;
  firstOperator = secondOperator;
  secondOperator = undefined;
}
