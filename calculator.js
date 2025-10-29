// ------------ SCRIPT CALCULADORA LEGACY v1.2 ------------
// NO TOCAR NADA - FUNCIONA (A VECES)
var buffer = "0"; // Variable que almacena el valor actual en pantalla como cadena de texto.
var memoria = 0; // Variable que almacena el valor en memoria para operaciones acumulativas.
var ultimo_operador; // Variable que guarda el último operador matemático seleccionado.
function handleNumber(numStr) { // Función que procesa cuando el usuario presiona un número.
  if (buffer === "0") { // Si el buffer está en cero, lo reemplaza con el nuevo número.
    buffer = numStr; // Asigna el nuevo número al buffer.
  } else { // Si el buffer no está en cero, concatena el número.
    buffer += numStr; // Agrega el nuevo dígito al final del buffer.
  }
  updateScreen(); // Actualiza la pantalla con el nuevo valor.
}
function handleSymbol(symbol) { // Función que procesa cuando el usuario presiona un símbolo u operador.
  switch (symbol) { // Evalúa qué símbolo fue presionado.
    case "C": // Caso para el botón de limpiar (Clear).
      buffer = "0"; // Restablece el buffer a cero.
      memoria = 0; // Restablece la memoria a cero.
      ultimo_operador = null; // Restablece el último operador a nulo.
      break; // Sale del switch.
    case "=": // Caso para el botón de igual.
      if (ultimo_operador === null) { // Si no hay operador previo, no hace nada.
        return; // Sale de la función sin hacer nada.
      }
      flushOperation(parseInt(buffer)); // Ejecuta la operación final convirtiendo el buffer a entero.
      ultimo_operador = null; // Restablece el operador después de calcular.
      buffer = "" + memoria; // Convierte el resultado de memoria a cadena y lo asigna al buffer.
      memoria = 0; // Restablece la memoria después de mostrar el resultado.
      break; // Sale del switch.
    case "+": // Caso para el operador de suma.
    case "-": // Caso para el operador de resta.
    case "*": // Caso para el operador de multiplicación.
    case "/": // Caso para el operador de división.
      handleMath(symbol); // Llama a la función que maneja operaciones matemáticas.
      break; // Sale del switch.
  }
  updateScreen(); // Actualiza la pantalla después de procesar el símbolo.
}
function handleMath(symbol) { // Función que maneja operaciones matemáticas (+, -, *, /).
  if (buffer === "0" && memoria === 0) { // Si tanto el buffer como la memoria están en cero, no hace nada.
    return; // Sale de la función sin hacer nada.
  }
  var intBuffer = parseInt(buffer); // Convierte el buffer a un número entero.
  if (memoria === 0) { // Si la memoria está vacía, guarda el valor del buffer.
    memoria = intBuffer; // Asigna el valor del buffer a la memoria.
  } else { // Si ya hay un valor en memoria, ejecuta la operación pendiente.
    flushOperation(intBuffer); // Ejecuta la operación acumulativa con el nuevo valor.
  }
  ultimo_operador = symbol; // Guarda el operador actual para la próxima operación.
  buffer = "0"; // Restablece el buffer a cero para el próximo número.
}
function flushOperation(intBuffer) { // Función que ejecuta la operación matemática acumulativa.
  if (ultimo_operador === "+") { // Si el operador es suma, suma el valor al acumulado.
    memoria += intBuffer; // Suma el valor del buffer a la memoria.
  } else if (ultimo_operador === "-") { // Si el operador es resta, resta el valor del acumulado.
    memoria -= intBuffer; // Resta el valor del buffer de la memoria.
  } else if (ultimo_operador === "*") { // Si el operador es multiplicación, multiplica el acumulado.
    memoria *= intBuffer; // Multiplica la memoria por el valor del buffer.
  } else if (ultimo_operador === "/") { // Si el operador es división, divide el acumulado.
    memoria /= intBuffer; // Divide la memoria entre el valor del buffer.
  }
}
function updateScreen() { // Función que actualiza el valor mostrado en la pantalla.
  var laPantalla = document.getElementById("display"); // Obtiene el elemento de la pantalla por su ID.
  laPantalla.innerText = buffer; // Actualiza el texto de la pantalla con el valor del buffer.
}
// INICIALIZADOR DE BOTONES
function init() { // Función que inicializa la calculadora al cargar la página.
  console.log("Calculadora inicializada..."); // Muestra un mensaje en la consola indicando que la calculadora está lista.
  document.querySelector(".buttons").addEventListener("click", function (event) { // Agrega un escuchador de eventos de clic al contenedor de botones.
    buttonClick(event.target.innerText); // Cuando se hace clic, llama a la función con el texto del botón presionado.
  });
}
function buttonClick(value) { // Función que determina si el valor es un número o un símbolo.
  if (isNaN(parseInt(value))) { // Verifica si el valor NO es un número.
    handleSymbol(value); // Si no es un número, lo procesa como símbolo.
  } else { // Si es un número, lo procesa como tal.
    handleNumber(value); // Llama a la función que maneja números.
  }
}
init(); // Ejecuta la función de inicialización al cargar el script.
