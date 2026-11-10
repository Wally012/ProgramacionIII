"use strict";

const formulario = document.getElementById("formularioContacto");
const botonEnviar = document.getElementById("botonEnviar");
const mensajeEstado = document.getElementById("mensajeEstado");

formulario.addEventListener("submit", function (evento){
    if(!formulario.checkVisibility()){
        evento.preventDefault();
        formulario.reportValidity();
        return;
    }

    //Validar que el nombre no contenga solo espacios
    const nombre = document.getElementById("nombre").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();
    const correo = document.getElementById("correo").value.trim();   
    
    if(nombre.length === 0){
        evento.preventDefault();
        mensajeEstado.textContent = "Escribe tu nombre Completo";

        document.getElementById("nombre").focus();
        return;
    }

    if(correo.length === 0){
        evento.preventDefault();
        mensajeEstado.textContent = "Escribe tu correo Electronico";

        document.getElementById("correo").focus();
        return;
    }

    if(nombre.length === 0){
        evento.preventDefault();
        mensajeEstado.textContent = "Escribe tu nombre Completo";

        document.getElementById("nombre").focus();
        return;
    }

    //Validar que se aceptaron los terminos y condiciones
    if(!document.getElementById("acepta_terminos").checked){
        evento.preventDefault();
        mensajeEstado.textContent = "Debes aceptar los terminos y condiciones";

        document.getElementById("acepta_terminos").focus();
        return;
    }

    //Evitar que se de click repetidamente
    mensajeEstado.textContent = "";
    botonEnviar.disabled = true;
    botonEnviar.textContent = "Enviado...";
});

formulario.addEventListener("reset", function(){
mensajeEstado.textContent= "";
botonEnviar.disabled = false;
botonEnviar.textContent = "Enviar Mensaje";
});
