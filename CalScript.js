const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

// Add event listeners to all buttons
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;
    handleInput(value);
  });
});

// Handle button input
function handleInput(value) {
  if (value === "AC") {
    display.value = "";
  } else if (value === "=") {
    try {
      display.value = calculate(display.value);
    } catch {
      display.value = "Error";
    }
  } else {
    display.value += value;
  }
}

// Calculate with BODMAS
function calculate(expression) {
  let numbers = [];
  let operators = [];
  let current = "";

  // Step 1: Separate numbers and operators
  for (let i = 0; i < expression.length; i++) {
    let char = expression[i];

    if ("0123456789.".includes(char)) {
      current += char;
    } else {
      numbers.push(parseFloat(current));
      operators.push(char);
      current = "";
    }
  }
  numbers.push(parseFloat(current));

  // Step 2: Handle * and /
  for (let i = 0; i < operators.length; i++) {
    if (operators[i] === "*" || operators[i] === "/") {
      let result;

      if (operators[i] === "*") {
        result = numbers[i] * numbers[i + 1];
      } else {
        result = numbers[i] / numbers[i + 1];
      }

      numbers.splice(i, 2, result);
      operators.splice(i, 1);
      i--;
    }
  }

  // Step 3: Handle + and -
  let result = numbers[0];

  for (let i = 0; i < operators.length; i++) {
    if (operators[i] === "+") {
      result += numbers[i + 1];
    } else if (operators[i] === "-") {
      result -= numbers[i + 1];
    }
  }

  return result;
}
