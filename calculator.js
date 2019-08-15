/**
 * Calculator.js
`* @Author: Tiffany Silva
 * @Date: 14/08/2019
`* @Description: This represents a simple calculator that can be used to perform simple arithmetic
 *               calculations such as add, subtract, multiply, divide.
 */
class Calculator {
 
  /**
   * 'displayVal' represents the value displayed on the calculator
   *   'firstOperand' represents the first operand of the expression
   *     'waitingForSecondOperand' represents the state of the expression as to 
   *            whether the calculator is waiting for the second operand to be inputed by the user
   *    'operator' represents the operator of the expression
   */

    //constructor
  //initializes all default values
  constructor() {
    this.displayVal = "0";
    this.firstOperand = null;
    this.waitingForSecondOperand = false;
    this.operator = null;
  }

   //called right after object instantiation to
  //set the display value and bind click events
  run() {
    this.setDisplayValue();
    this.bindClickHandlers();
  }

  //detects the operands of the expression entered by the user
  inputValue(digit) {
    if (this.waitingForSecondOperand === true) {
      this.displayVal = digit;
      this.waitingForSecondOperand = false;
    } else {
      if (this.displayVal === "0") {
        this.displayVal = digit;
        return;
      } else {
        this.displayVal = this.displayVal + digit;
        return;
      }
    }
  }

  //detects the decimal notation and appends if necessary
  inputDec(decimal) {
    if (this.waitingForSecondOperand === true) return;

    if (!this.displayVal.includes(decimal)) {
      this.displayVal += decimal;
    }
  }

  //handles the operator of the expression
  handleOperator(nOperator) {
    const inputVal = parseFloat(this.displayVal);

    if (this.operator && this.waitingForSecondOperand) {
      this.operator = nOperator;
      return;
    }

    if (this.firstOperand == null) {
      this.firstOperand = inputVal;
    } else if (this.operator) {
      const currentVal = this.firstOperand || 0;

      const result = this.performCal[this.operator](currentVal, inputVal);
      this.displayVal = String(result);
      this.firstOperand = result;
    }

    this.waitingForSecondOperand = true;
    this.operator = nOperator;
  }
  //performs the appropriate calculation
  performCal = {
    "+": (firstOperand, secondOperand) => firstOperand + secondOperand, //performs addition on two numbers

    "*": (firstOperand, secondOperand) => firstOperand * secondOperand, //performs multiplication on two numbers

    "/": (firstOperand, secondOperand) => firstOperand / secondOperand, //performs division on two numbers

    "-": (firstOperand, secondOperand) => firstOperand - secondOperand, //performs subtraction on two numbers

    "=": (firstOperand, secondOperand) => secondOperand
  };

  //clears the display to the original state
  clearScreen() {
    this.displayVal = "0";
    this.firstOperand = null;
    this.waitingForSecondOperand = false;
    this.operator = null;
  }

  //Sets the display value of the calculator
  setDisplayValue() {
    let displayValue = document.getElementById("calculation");
    displayValue.textContent = this.displayVal;
  }

  //click event that will be triggered upon oncick event
  onClick(event) {
    const { target } = event;

    if (target.classList.contains("operator")) {
      this.handleOperator(target.innerHTML); //calls the handleOperator method to update the operator
    }
    if (target.classList.contains("numpad")) {
      this.inputValue(target.innerHTML); //calls the inputValue method to input the operands
    }
    if (target.classList.contains("decimal")) {
      this.inputDec(target.innerHTML); //calls the inputDec method to input the decimal
    }
    if (target.classList.contains("clear-all")) {
      this.clearScreen(); //calls the clearScreen method to clear the display
    }
    this.setDisplayValue(); //calls the setDisplayValue method to update the display value
    return;
  }

  //binds click events to each table cells
  bindClickHandlers() {
    const keys = document.querySelectorAll(".tg td");
    if (keys) {
      keys.forEach(e => e.addEventListener("click", this.onClick.bind(this)));
    }
  }
}

//creating the object of calculator
const calculator = new Calculator();
calculator.run();
