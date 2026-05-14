// creamos una "base de datos" MOCK
let historialChat = [
    {rol:"ia", texto:"¡Hola! Soy IA Master. ¿En qué te ayudo?"},
    {rol:"user", texto:"Quiero aprender JavaScript"},
    {rol:"ia", texto:"¡Excelente elección! Empezaremos por los Arrays."},
    {rol:"user", texto:"¡Pero antes me voy a comer una pizza!"},
    {rol:"ia", texto:
`Aquí tienes la forma de declarar un array de tipos de pizzas en JavaScript:

\`\`\`js
const pizzas = ["Margarita", "Pepperoni", "Cuatro Quesos", "Barbacoa"];

console.log(pizzas); // Muestra la lista de pizzas

// Acceder por índice
console.log(pizzas[1]); // "Pepperoni"
\`\`\`

Como ves, un array es simplemente una lista ordenada de elementos.`}
];


function escaparHTML(texto){
    return texto
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function formatearMensaje(texto){
    let partes = [];
    let patronCodigo = /```(\w+)?\n([\s\S]*?)```/g;
    let ultimaPosicion = 0;
    let coincidencia;

    while ((coincidencia = patronCodigo.exec(texto)) !== null){
        let textoNormal = texto.slice(ultimaPosicion, coincidencia.index);
        let codigo = coincidencia[2];

        partes.push(escaparHTML(textoNormal).replace(/\n/g, "<br>"));
        partes.push(`<pre><code>${escaparHTML(codigo)}</code></pre>`);

        ultimaPosicion = patronCodigo.lastIndex;
    }

    partes.push(escaparHTML(texto.slice(ultimaPosicion)).replace(/\n/g, "<br>"));
    return partes.join("");
}


// función para ver ese chat en mi página
function pintarChat(listaMensajes){
    let caja = document.getElementById('caja-mensajes');
    caja.innerHTML = "";
    // mantenemos el bucle FOR
    for(let i = 0; i < listaMensajes.length; i++){
        let claseCSS = listaMensajes[i].rol === "user" ? "msg-usuario" : "msg-ia";
        caja.innerHTML += `<div class="${claseCSS}"><b>
            ${listaMensajes[i].rol.toUpperCase()}:</b>
            <br>${formatearMensaje(listaMensajes[i].texto)}</div>
        `;
    }
    caja.scrollTop = caja.scrollHeight;
}
pintarChat(historialChat);




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
        historialChat.push({rol: "user", texto: mensaje});
        pintarChat(historialChat);
        // limpiar el input
        document.getElementById("mensaje-input").value = "";
    
    };
}
