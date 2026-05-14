// creamos una "base de datos" MOCK
let historialChat = [
    {rol:"ia",texto:"¡Hola! Soy IA Master. ¿En qué te ayudo?"},
    {rol:"user",texto:"Quiero aprender JavaScript"},
    {rol:"ia",texto:"¡Excelente elección! Empezaremos por los Arrays."},
];

// función para ver ese chat en mi página
function pintarChat(listaMensajes){
    let caja = document.getElementById('caja-mensajes');
    caja.innerHTML = "";
    // mantenemos el bucle FOR
    for(let i = 0;1<listaMensajes.lenght;i++){
        let claseCSS = listaMensajes[i].rol === "user" ? "msg-usuario" : "msg-ia";
        caja.innerHTML += `
            <div class="${claseCSS}"><b>
            ${listaMensajes[i].rol.toUpperCase()}:</b>
            <br>
            ${listaMensajes[i].texto}</div>
        `;
    }
}





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