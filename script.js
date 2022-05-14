
// built with guidance from: 
// https://www.section.io/engineering-education/building-a-calculator-a-javascript-project-for-beginners/
// https://www.youtube.com/watch?v=j59qQ7YWLxw

// create variables to represent the different kinds of buttons
const numberButtons = document.querySelectorAll('[number-button]');
const operationButtons = document.querySelectorAll('[op-button]');
const equalsButton = document.querySelector('[equals-button]');
// const deleteButton = document.querySelector('[delete-button]');
const clearButton = document.querySelector('[clear-button]')
const previousOperandTextElement = document.querySelector('[previous-operand]');
const currentOperandTextElement = document.querySelector('[current-operand]');

// create calculator class with constructor that will take all 
//     inputs and calculator functions
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

  // clear function deletes displayed values
  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
    this.currentOperandTextElement.innerText = ''
  }

  // delete function
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  // append number function
  appendNumber(number) {
    if (this.currentOperandTextElement.classList.contains('computation')) {
      this.currentOperand = number.toString()
      this.currentOperandTextElement.classList.remove('computation')
      if (number === '.' && this.currentOperand.includes('.')) return
    } else {
      if (number === '.' && this.currentOperand.includes('.')) return
      this.currentOperand = this.currentOperand.toString() + number.toString()
    }
  }

  // choose operation function
  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  // compute function
  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
    this.currentOperandTextElement.classList.add('computation')
  }

  // get display number function
  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  // update display function
  updateDisplay() {
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }

}

// create calculator constant; hook all variables,  
//    make them operate on the calculator object
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

// number button event listener
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

// operation button event listener
operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

// equals button event listener
equalsButton.addEventListener('click', () => {
  calculator.compute()
  calculator.updateDisplay()
})

// clear button event listener
clearButton.addEventListener('click', () => {
  calculator.clear()
  calculator.updateDisplay()
})


// keydown event listener
document.addEventListener('keydown', function (event) {
  let patternForNumbers = /[0-9]/g;
  let patternForOperations = /[+\-*\/]/g
  if (event.key.match(patternForNumbers)) {
    event.preventDefault();
    calculator.appendNumber(event.key)
    calculator.updateDisplay()
  }
  if (event.key === '.') {
    event.preventDefault();
    calculator.appendNumber(event.key)
    calculator.updateDisplay()
  }
  if (event.key.match(patternForOperations)) {
    event.preventDefault();
    calculator.chooseOperation(event.key)
    calculator.updateDisplay()
  }
  if (event.key === 'Enter' || event.key === '=') {
    event.preventDefault();
    calculator.compute()
    calculator.updateDisplay()
  }
  if (event.key === 'Backspace') {
    event.preventDefault();
    calculator.delete()
    calculator.updateDisplay()
  }
  if (event.key === 'Delete') {
    event.preventDefault();
    calculator.clear()
    calculator.updateDisplay()
  }

})