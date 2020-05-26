let runningTotal = 0;
let buffer = '0';
let previousOperator = null;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        // this is not a number
        handleSymbol(value);
    } else {
        // this is a number
        handleNumber(value);
    }
    screen.innerText = buffer; // rerenders the screen
}

function handleSymbol(symbol) { // OR function handleSymbol(value)
    // if (symbol === 'C') {
    //     buffer = '0';
    //     runningTotal = 0;
    // }  
    //  etc.
    //     INSTEAD USE:

    switch (symbol) { // OR switch (value) 
        case 'C':
            buffer = '0';
            runningTotal = 0;
            break;
        case '=': 
            if (previousOperator === null) {
                // need two numbers to do math
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1); // substring says "Stop one short of going all the way to the end."
            }
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol); // OR handleMath(value);
            break;
    }
}

function handleMath(symbol) { // OR function handleMath(value)
    if (buffer === '0') {
        // do nothing
        return;
    }

    const intBuffer = parseInt(buffer);

    if(runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOperator = symbol; // OR previousOperator = value;

    buffer = '0';
}

function flushOperation(intBuffer) {
    // switch (previousOperator) {
    //     case '+':
    //         runningTotal += intBuffer;
    //         break;
    //     case '-':
    //         runningTotal -= intBuffer;
    //     etc.
    // }  

    if (previousOperator === '+') {
        runningTotal += intBuffer;
    } else if (previousOperator === '−') {
        runningTotal -= intBuffer;
    } else if (previousOperator === '×') {
        runningTotal *= intBuffer;
    } else {
        runningTotal /= intBuffer;
    }
}

function handleNumber(numberString) { // OR function handleNumber(value)
    if (buffer === "0") {
        buffer = numberString;  // buffer = value;
    } else {
        buffer += numberString;  // buffer += value;
    }
}

function init() {
    document
        .querySelector('.calc-buttons')
        .addEventListener('click', function(event) {
            buttonClick(event.target.innerText);
        });
}

init();