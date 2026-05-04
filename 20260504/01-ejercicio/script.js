console.log("¡El cerebro de la web está funcionando!");

function cerrarVentana(){
    self.close();
}

// Función saludar
function saludar(){
    console.log("¡No me toques!");
    let nombre = prompt("¿Cómo te llamas?");
    alert("¡Hola " + nombre + "! Ya eres programador/a.");
}

function verificarAcceso(){
    console.log("¡Tú no entras!")
    let edad = prompt("Introduce tu edad: ");

    if (edad >=18){
        alert("Acceso permitido");
    } else {
        alert("Acceso denegado por falta de mayoría de edad...");
        console.log("Estado: Menor de edad detectado.");
    }
}