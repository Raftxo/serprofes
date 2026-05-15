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

    // Atrapamos la cajita de texto donde el usuario escribe:
    let input = document.getElementById('mensaje-input');

    // capturamos el texto (sin espacios gracias a .trim())
    // sacamos el texto escrito por el usuario y le quitamos los espacios en blanco
    let mensaje = input.value.trim();

    // condicional
    if (mensaje === ""){
        alert("⚠️ Escribe algo antes de enviar ⚠️");
        // return expulsa al JS de la función para que no siga leyendo
        return;
    }
    // a) Guardamos el mensaje real del usuario
    let nuevoMensaje = {
        rol:"user",texto:mensaje
    };
    // b) y lo metemos al final del Array
    historialChat.push(nuevoMensaje);

    // c) el truco: simulamos que la IA nos responde al instante
    //    creando otro objeto:

    let respuestaIA = {
        rol:"ia", texto:"Los tokens de su plan actual se han acabado... '" + mensaje + "' no puede ser procesado en estos momentos. Compre la suscripción ULTRA."
    };
    historialChat.push(respuestaIA);

    // d) como el array ha cambiado, repintamos
    pintarChat(historialChat);

    input.value = "";
    input.focus();
}

function mostrarTodo(){
    pintarChat(historialChat);
}

function borrarChat(){
    historialChat.length = 0;
    pintarChat(historialChat);
}

function buscarMensaje(){
    // Atrapar lo que ha escrito el usuario en el input del buscador:
    let input = document.getElementById('buscar-input');

    if (input === null){
        alert("No encuentro el input de búsqueda");
        return;
    }
    // transformo lo que ha escrito el usuario a minúsculas
    let palabra = input.value.trim().toLowerCase();

    if (palabra === ""){
        alert("Escribe una palabra para buscar");
        return;
    }
    // resultados:
    let mensajesEncontrados = historialChat.filter(msj => {
        return msj.texto.toLowerCase().includes(palabra);
    });

    pintarChat(mensajesEncontrados);
}

function verMisMensajes(){
    // revisa todo el historial. A cada mensaje lo llama "msj"
    // devuelve una lista nueva solo con los que cumplan la regla
    // rol === "user"
    let soloUsuario = historialChat.filter(msj => msj.rol === "user");
    pintarChat(soloUsuario);
}

function modoGritar(){
    // por cada msj construye un objeto nuevo
    let chatGritando = historialChat.map(msj => {
        return{
            rol: msj.rol,
            // aquí está la transformación - convertir a mayúsculas
            texto: msj.texto.toUpperCase()
        };
            });
    pintarChat(chatGritando);
}
