function enviarPrompt(event){
    // evitamos que el form recargue la página cada vez que pulsamos el botón Enviar
    event.preventDefault();

    // capturamos el texto (sin espacios gracias a .trim())
    let mensaje = document.getElementById("mensaje-input").value.trim();

    // condicional
    if (mensaje === ""){
        alert("⚠️ Escribe algo antes de enviar ⚠️");
    } else {
        alert("🤖 Mensaje recibido 🤖 \n" + mensaje);
        // limpiar el input
        document.getElementById("mensaje-input").value = "";
    
    };



}