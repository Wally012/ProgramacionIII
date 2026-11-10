/* Scripts: Lógica de JavaScript */

// ===== Sección 1: Calculadora de promedio =====
const btnPromedio = document.getElementById("btnPromedio");
const resultadoPromedio = document.getElementById("resultadoPromedio");

btnPromedio.addEventListener("click", () => {
    const n1 = parseFloat(document.getElementById("nota1").value);
    const n2 = parseFloat(document.getElementById("nota2").value);
    const n3 = parseFloat(document.getElementById("nota3").value);

    // Validar que las 3 notas sean números
    if (isNaN(n1) || isNaN(n2) || isNaN(n3)) {
        resultadoPromedio.textContent = "Debes ingresar las 3 notas";
        return;
    }

    const promedio = (n1 + n2 + n3) / 3;
    let mensaje = `Promedio: ${promedio.toFixed(2)} - `;

    // Condicional para clasificar el resultado
    if (promedio >= 4.5)      mensaje += "¡Excelente!";
    else if (promedio >= 3.5) mensaje += "Buen trabajo.";
    else if (promedio >= 3.0) mensaje += "Aprobaste justo.";
    else                      mensaje += "Perdiste :/";

    resultadoPromedio.textContent = mensaje;
});

// ===== Sección 2: DOM - funciones demo =====
const textoDemo = document.getElementById("textoDemo");

function cambiarTexto() {
    textoDemo.textContent = "¡El texto cambió dinámicamente!";
}

function cambiarColor() {
    textoDemo.style.color = "#f72585";
}

function cambiarEstilo() {
    textoDemo.classList.add("destacado");
    textoDemo.style.background = "#4895ef";
    textoDemo.style.color = "white";
}

function resetearDemo() {
    textoDemo.textContent = "Este texto cambiará cuando lo presiones.";
    textoDemo.style.color = "";
    textoDemo.style.background = "#eef2f7";
    textoDemo.classList.remove("destacado");
}

// ===== Sección 3: Eventos =====
let contador = 0;
const displayContador = document.getElementById("contador");

document.getElementById("btnMas").addEventListener("click", () => {
    contador++;
    displayContador.textContent = contador;
});

document.getElementById("btnMenos").addEventListener("click", () => {
    contador--;
    displayContador.textContent = contador;
});

document.getElementById("btnReset").addEventListener("click", () => {
    contador = 0;
    displayContador.textContent = contador;
});

const inputNombre = document.getElementById("inputNombre");
const salidaNombre = document.getElementById("salidaNombre");

inputNombre.addEventListener("input", (evento) => {
    const valor = evento.target.value;
    salidaNombre.textContent = valor === ""
        ? "Aquí verás lo que escribas ..."
        : `Hola, ${valor}! Tienes ${valor.length} caracteres.`;
});

// Lista dinámica
const inputTarea = document.getElementById("inputTarea");
const btnAgregar = document.getElementById("btnAgregar");
const listaTarea = document.getElementById("listaTarea");

btnAgregar.addEventListener("click", () => {
    const texto = inputTarea.value.trim();

    if (texto === "") {
        alert("Escribe una tarea primero");
        return;
    }

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = texto;

    const btnCompletar = document.createElement("button");
    btnCompletar.textContent = "Completar";
    btnCompletar.addEventListener("click", () => {
        span.classList.toggle("completada");
    });

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.addEventListener("click", () => {
        li.remove();
    });

    li.appendChild(span);
    li.appendChild(btnCompletar);
    li.appendChild(btnEliminar);
    listaTarea.appendChild(li);
    inputTarea.value = "";
    inputTarea.focus();
});

inputTarea.addEventListener("keydown", (e) => {
    if (e.key === "Enter") btnAgregar.click();
});

// ===== Sección 4: Consola espejo =====
const consolaEspejo = document.getElementById("consolaEspejo");

// Guardamos los métodos originales
const _log   = console.log;
const _warn  = console.warn;
const _error = console.error;
const _info  = console.info;
const _table = console.table;

function agregarLineaEspejo(tipo, mensaje) {
    // Quitar el texto inicial de ayuda la primera vez
    const inicial = consolaEspejo.querySelector(".line-log");
    if (inicial) inicial.remove();

    const linea = document.createElement("div");
    linea.className = `line ${tipo}`;
    linea.textContent = `[${tipo.toUpperCase()}] ${mensaje}`;

    consolaEspejo.appendChild(linea);
    consolaEspejo.scrollTop = consolaEspejo.scrollHeight;
}

// Sobrescribimos console.* (sin const) y llamamos a cada original
console.log   = (...args) => { _log(...args);   agregarLineaEspejo("log",   args.join(" ")); };
console.warn  = (...args) => { _warn(...args);  agregarLineaEspejo("warn",  args.join(" ")); };
console.error = (...args) => { _error(...args); agregarLineaEspejo("error", args.join(" ")); };
console.info  = (...args) => { _info(...args);  agregarLineaEspejo("info",  args.join(" ")); };
console.table = (data) => {
    _table(data);
    agregarLineaEspejo("log", "Tabla mostrada en consola real (F12)");
};

// ===== Sección 5: JavaScript puro vs jQuery =====
const cajaDemoJQ = document.getElementById("cajaDemoJQ");

// JavaScript puro
document.getElementById("btnJS").addEventListener("click", () => {
    cajaDemoJQ.textContent = "Modificación con JavaScript puro.";
    cajaDemoJQ.style.background = "#cfe2ff";
    cajaDemoJQ.style.color = "#084298";
});

// jQuery
$("#btnJQ").on("click", function () {
    $("#cajaDemoJQ")
        .text("Modificación con jQuery")
        .css({
            "background": "#d1f7e8",
            "color": "#0a5c43"
        });
});

// Reset de la demo (id distinto al del contador)
document.getElementById("btnResetJQ").addEventListener("click", () => {
    cajaDemoJQ.textContent = "Haz clic en un botón";
    cajaDemoJQ.style.background = "#eef2f7";
    cajaDemoJQ.style.color = "#1e1e2e";
});

// ===== Navegación suave =====
document.querySelectorAll("nav.main-nav a").forEach(enlace => {
    enlace.addEventListener("click", (e) => {
        e.preventDefault();
        const destino = document.querySelector(enlace.getAttribute("href"));
        if (destino) {
            window.scrollTo({
                top: destino.offsetTop - 100,
                behavior: "smooth"
            });
        }
    });
});

// ===== Reto 1: Termómetro =====
const inputTemp = document.getElementById("inputTemp");
const btnTemp = document.getElementById("btnTemp");
const resultadoTemp = document.getElementById("resultadoTemp");

btnTemp.addEventListener("click", () => {
    const temp = parseFloat(inputTemp.value);

    if (isNaN(temp)) {
        resultadoTemp.textContent = "Debes ingresar una temperatura válida";
        return;
    }

    let mensaje;
    if (temp < 10) {
        mensaje = "Frío";
    } else if (temp <= 25) {
        mensaje = "Templado";
    } else {
        mensaje = "Caluroso";
    }

    resultadoTemp.textContent = `${temp}°C → ${mensaje}`;
});

// ===== Reto 3: Conversor de moneda =====
const TASA_USD = 3216; // COP por 1 USD (TRM aprox. 7 oct 2026; cámbiala si hace falta)

const inputPesos = document.getElementById("inputPesos");
const btnConvertir = document.getElementById("btnConvertir");
const resultadoMoneda = document.getElementById("resultadoMoneda");

btnConvertir.addEventListener("click", () => {
    const pesos = parseFloat(inputPesos.value);

    if (isNaN(pesos) || pesos <= 0) {
        resultadoMoneda.textContent = "Ingresa un valor válido mayor a 0";
        return;
    }

    const dolares = pesos / TASA_USD;
    resultadoMoneda.textContent = `$${pesos.toLocaleString()} COP = US$ ${dolares.toFixed(2)}`;
});

// ===== Reto 4: Calculadora =====
const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2");
const resultadoCalc = document.getElementById("resultadoCalc");

document.querySelectorAll(".btn-op").forEach(btn => {
    btn.addEventListener("click", () => {
        const a = parseFloat(num1.value);
        const b = parseFloat(num2.value);
        const op = btn.dataset.op;

        if (isNaN(a) || isNaN(b)) {
            resultadoCalc.textContent = "Ingresa los dos números";
            return;
        }

        let resultado;
        switch (op) {
            case "+":
                resultado = a + b;
                break;
            case "-":
                resultado = a - b;
                break;
            case "*":
                resultado = a * b;
                break;
            case "/":
                if (b === 0) {
                    resultadoCalc.textContent = "No se puede dividir entre 0";
                    return;
                }
                resultado = a / b;
                break;
        }

        resultadoCalc.textContent = `${a} ${op} ${b} = ${resultado}`;
    });
});

// ===== Reto 5: Termómetro con jQuery =====
$("#btnTempJQ").on("click", function () {
    const temp = parseFloat($("#tempJQ").val());

    if (isNaN(temp)) {
        $("#resultadoTempJQ").text("Debes ingresar una temperatura válida");
        return;
    }

    let mensaje;
    if (temp < 10) {
        mensaje = "Frío";
    } else if (temp <= 25) {
        mensaje = "Templado";
    } else {
        mensaje = "Caluroso";
    }

    $("#resultadoTempJQ").text(`${temp}°C → ${mensaje}`);
});

// ===== Mensaje de bienvenida =====
console.log("Guía de JavaScript cargada correctamente");
console.info("Abre la consola con (F12) para ver los mensajes de los demás");
