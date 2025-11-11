/* jshint esversion: 6 */
// MODULO DE CALCULADORA v2 - REFACTORIZADO
let buffer = "0";
let memoria = 0;
let ultimo_operador;
const historial = [];

// Extract Constant: Solución para Magic Number
const MAX_HISTORY_ITEMS = 5;

// Replace Conditional with Strategy: Objeto de operaciones
const OPERATIONS = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
};

// Extract Method: Solución para código duplicado (DRY)
function logHistory(logEntry) {
  historial.push(logEntry);
  if (historial.length > MAX_HISTORY_ITEMS) {
    historial.shift();
  }
  console.log(historial);
}

function handleNumber(numStr) {
  if (buffer === "0") {
    buffer = numStr;
  } else {
    buffer += numStr;
  }
  updateScreen();
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      buffer = "0";
      memoria = 0;
      ultimo_operador = null;
      break;
    case "=":
      if (ultimo_operador === null) {
        return;
      }
      // Separación de responsabilidades: primero calcula, luego registra
      const memoriaPrevia = memoria;
      const bufferValue = parseInt(buffer);
      flushOperation(bufferValue);
      
      // Lógica de historial movida fuera de la función de cálculo
      const entryIgual = memoriaPrevia + " " + ultimo_operador + " " + bufferValue + " = " + memoria;
      logHistory(entryIgual);
      
      ultimo_operador = null;
      buffer = "" + memoria;
      memoria = 0;
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      handleMath(symbol);
      break;
  }
  updateScreen();
}

function handleMath(symbol) {
  if (buffer === "0" && memoria === 0) {
    return;
  }
  const intBuffer = parseInt(buffer);
  if (memoria === 0) {
    memoria = intBuffer;
  } else {
    // Separación de responsabilidades: primero calcula, luego registra
    const memoriaPrevia = memoria;
    flushOperation(intBuffer);
    
    // Lógica de historial movida fuera de la función de cálculo
    const entryMath = memoriaPrevia + " " + symbol + " " + intBuffer + " = " + memoria;
    logHistory(entryMath);
  }
  ultimo_operador = symbol;
  buffer = "0";
}

// Función refactorizada: Ahora solo hace cálculo (Single Responsibility)
function flushOperation(intBuffer) {
  if (OPERATIONS[ultimo_operador]) {
    memoria = OPERATIONS[ultimo_operador](memoria, intBuffer);
  }
}

function updateScreen() {
  document.getElementById("display").innerText = buffer;
}

function init() {
  document.querySelector(".buttons").addEventListener("click", function (event) {
    buttonClick(event.target.innerText);
  });
}

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
}

init();
