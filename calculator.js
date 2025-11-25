// ------------ SCRIPT CALCULADORA LEGACY v1.2 ------------
// NO TOCAR NADA - FUNCIONA (A VECES)
var buffer = "0";
var memoria = 0;
var ultimo_operador;
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
case 'C':
buffer = "0";
memoria = 0;
ultimo_operador = null;
break;
case '=':
if (ultimo_operador === null) {
return;
}
flushOperation(parseInt(buffer));
ultimo_operador = null;
buffer = "" + memoria;
memoria = 0;
break;
case '+':
case '-':
case '*':
case '/':
handleMath(symbol);
break;
}
updateScreen();
}
function handleMath(symbol) {
if (buffer === '0' && memoria === 0) {
return;
}
var intBuffer = parseInt(buffer);
if (memoria === 0) {
memoria = intBuffer;
} else {
flushOperation(intBuffer);
}
ultimo_operador = symbol;
buffer = "0";
}
function flushOperation(intBuffer) {
if (ultimo_operador === '+') {
memoria += intBuffer;
} else if (ultimo_operador === '-') {
memoria -= intBuffer;
} else if (ultimo_operador === '*') {
memoria *= intBuffer;
} else if (ultimo_operador === '/') {
memoria /= intBuffer;
}
}
function updateScreen(){
var laPantalla = document.getElementById("display");
laPantalla.innerText = buffer;
}
// INICIALIZADOR DE BOTONES
function init(){
console.log("Calculadora inicializada...");
document.querySelector('.buttons').addEventListener('click', function(event) {
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