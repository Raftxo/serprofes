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
}