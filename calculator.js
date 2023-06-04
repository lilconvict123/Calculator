class Calculator {
    
    firstOperand;
    secondOperand;
    previousOutput;
    currentOutput;
    currentAnswer;
    operation;

    constructor(currentOutput,previousOutput) {
        this.firstOperand = "";
        this.secondOperand = "";
        this.operation = "";
        this.currentAnswer = null;
        this.previousOutput = previousOutput;
        this.currentOutput = currentOutput;
    }

    clear() {
        this.firstOperand = "";
        this.secondOperand = "";
        this.currentAnswer = null;
        this.previousOutput.innerHTML = "";
        this.currentOutput.innerHTML = "";
    }

    appendDigit(digit) {
        //if just calculated and no operation has been entered yet, means user wants to start a new calculation
        if (this.currentAnswer != null && this.operation == "") {
            this.clear();
        }
        //should not allow . to be entered if operand is currently empty or if already contains a dot
        if (this.operation == "") {
            if (digit == ".") {
                if (this.firstOperand == "" || this.firstOperand.includes(".")) {
                    return;
                }
            }
            this.firstOperand += digit;
            this.currentOutput.innerHTML += digit;
        } else {
            if (digit == ".") {
                if (this.secondOperand == "" || this.secondOperand.includes(".")) {
                    return;
                }
            }
            this.secondOperand += digit;
            this.currentOutput.innerHTML += digit;
            }
        }

    setOperation(operation) {
        if (this.operation == "") {
            this.currentOutput.innerHTML += " " + operation + " ";
            this.operation = operation;
        }
    }

    calculate() {
        if (this.firstOperand == "" || this.secondOperand == "" || this.operation == "") {
            return;
        }
        switch (this.operation) {
            case "+":
                this.currentAnswer = parseFloat(this.firstOperand) + parseFloat(this.secondOperand);
                break;
            case "-":
                this.currentAnswer = parseFloat(this.firstOperand) - parseFloat(this.secondOperand);
                break;
            case "x":
                this.currentAnswer = parseFloat(this.firstOperand) * parseFloat(this.secondOperand);
                break;
            case "/":
                this.currentAnswer = parseFloat(this.firstOperand) / parseFloat(this.secondOperand);
                break;
            default:
                break;
        }
        this.previousOutput.innerHTML = this.currentOutput.innerHTML;
        this.currentOutput.innerHTML = this.currentAnswer;
        this.firstOperand = this.currentAnswer;
        this.operation = "";
        this.secondOperand = "";
        
    }
}


let currentOutput = document.querySelector('[data-current-output]');
let previousOutput = document.querySelector('[data-previous-output]');


const calculator = new Calculator(currentOutput,previousOutput);

let numbers = document.querySelectorAll('[data-number]');
for (let number of numbers) {
    number.addEventListener('click', () => {
        calculator.appendDigit(number.innerHTML);
    });
}

let operations = document.querySelectorAll('[data-operation]');
for (let operation of operations) {
    operation.addEventListener('click', () => {
        calculator.setOperation(operation.innerHTML);
    });
}

let clear = document.querySelector('[data-clear]');
clear.addEventListener('click',() => {
    calculator.clear();
});

let equals = document.querySelector('[data-equals]');
equals.addEventListener('click',() => {
    calculator.calculate();
});


//after calculated, if next input is a digit, should reset firstOperand