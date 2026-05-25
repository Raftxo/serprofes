// creamos una "base de datos" MOCK
// let historialChat = [
//     {rol:"ia", texto:"¡Hola! Soy IA Master. ¿En qué te ayudo?"},
//     {rol:"user", texto:"Quiero aprender JavaScript"},
//     {rol:"ia", texto:"¡Excelente elección! Empezaremos por los Arrays."},
//     {rol:"user", texto:"¡Pero antes me voy a comer una pizza!"},
//     {rol:"ia", texto:
// `Aquí tienes la forma de declarar un array de tipos de pizzas en JavaScript:

// \`\`\`js
// const pizzas = ["Margarita", "Pepperoni", "Cuatro Quesos", "Barbacoa"];

// console.log(pizzas); // Muestra la lista de pizzas

// // Acceder por índice
// console.log(pizzas[1]); // "Pepperoni"
// \`\`\`

// Como ves, un array es simplemente una lista ordenada de elementos.`}
// ];

// novedades 25-may-2026
let historialChat = [];
let titulosRecientes = [];

// FUNCIÓN DE ARRANQUE: busca en el disco duro del navegador (local storage)
function cargarMemoria(){
    let memoriaChat = localStorage.getItem('chatGuardado');
    let memoriaTitulos = localStorage.getItem('titulosGuardados');

    // Si el navegador tiene datos guardados, lo tranformamos a texto a array

    if(memoriaChat){
        historialChat = JSON.parse(memoriaChat);
    }else{
        // Si el usuario entra por primera vez, le dejamos solo el saludo inicial
        historialChat = [{rol:"ia", texto: "Hola. Aquí IA Master. ¿En qué te puedo ayudar?"}];
    }

    if (memoriaTitulos){
        titulosRecientes = JSON.parse(memoriaTitulos);
    }
    // Dibujamos la pantalla con lo que hemos rescatado en la memoria
    pintarChat(historialChat);
    actualizarHistorialLateral();    
}

// Ejecutamos la función automáticamente al cargar el script:
cargarMemoria();

// escaparHTML() es una función que permita mostrar código en sus respuestas
// fue añadida con la ayuda de Copilot 
function escaparHTML(texto){
    return texto
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

// formatearMensaje() tampoco está, son funciones que permiten que la IA muestre código
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

// la función PINTORA (actualizada/revisada con la versión 25-may-2026)
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
// este pintarChat(historialChat); no está en la versión 25-may-2026
// pintarChat(historialChat);

// línea 64 del código original
// línea 65 esta función también ha sido reescrita en la clase de 25-may-2026
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
    // // a) Guardamos el mensaje real del usuario
    // let nuevoMensaje = {
    //     rol:"user",texto:mensaje
    // };
    // // b) y lo metemos al final del Array
    // historialChat.push(nuevoMensaje);

    // versión 25-may línea 77: Guardamos el mensaje real en el historial
    historialChat.push({rol:"user",texto:mensaje});
    // B) Metemos el mensaje en el historial del menú lateral (MAX 5)
    titulosRecientes.push(mensaje);
    if (titulosRecientes.length > 5){
        titulosRecientes.shift(); // borra el más antiguo del final para no saturar
    }
    actualizarHistorialLateral();
    // C) Pintamos el mensaje del usuario y guardamos ambos arrays en texto plano
    pintarChat(historialChat);
    // versión 25-may línea 87: stringify convierte un objeto o array a texto
    localStorage.setItem('chatGuardado', JSON.stringify(historialChat));
    localStorage.setItem('titulosGuardados', JSON.stringify(titulosRecientes));

    input.value="";
    input.focus();

    // versión 25-may línea 94: D) El efecto "IA pensando..."
    let caja = document.getElementById('caja-mensajes');
    caja.innerHTML += `
        <div class="msg-ia" id="mensaje-pensando">
            <b>IA MASTER:</b><br>✍️ Pensando...
        </div>
    `;
    caja.scrollTop = caja.scrollHeight; // bajamos el scroll para ver el pensando

    // ver.25-may lin.104: E) Retrasamos la respuesta 1.5 segundos (1500ms)
// E) Retrasamos la respuesta real de la IA 1.5 segundos (1500ms)
    setTimeout(() => {
        //1. Elimanos de la pantalla el indicador "Pensnando..."
        document.getElementById('mensaje-pensando').remove();
        //2. Metemos la respuesta definitiva en el  Array
        historialChat.push({rol: "ia", texto: "Estoy procesando tu mensaje: '" + mensaje + "'" });
        //3. Volemos a pintar el chat completo y actualizamos la memoria del disco duro
        pintarChat(historialChat);
        localStorage.setItem('chatGuardado', JSON.stringify(historialChat));
    }, 1500);
}

//     let respuestaIA = {
//         rol:"ia", texto:"Los tokens de su plan actual se han acabado... '" + mensaje + "' no puede ser procesado en estos momentos. Compre la suscripción ULTRA."
//     };
//     historialChat.push(respuestaIA);

//     // d) como el array ha cambiado, repintamos
//     pintarChat(historialChat);

//     input.value = "";
//     input.focus();
// }
// ver.25-may lin.117 (revisado hasta aquí)
function mostrarTodo(){
    pintarChat(historialChat);
}

// function borrarChat(){
//     historialChat.length = 0;
//     pintarChat(historialChat);
// }

// nueva función de borrarChat del 25-may-2026
// no funciona porque hay más funciones que se deben añadir de la clase de ese día
// que no pude asistir casi por la visita de los Mireios.
function borrarChat(){
    historialChat = [];
    titulosRecientes = [];
    // Eliminamos por completo las llaves del local storage
    localStorage.removeItem('chatguardado');
    localStorage.removeItem('tituloGuardado');
    // Volvemos a pintar todo (Ahora quedará todo limpio)
    pintarChat(historialChat);
    actualizarHistorialLateral();
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

function actualizarHistorialLateral(){
    // busca el <ul> que está en la clase .historial
    let ulHistorial = document.querySelector('.historial ul')
    // limpia los textos fijos
    ulHistorial.innerHTML = "";
    // recorre los títulos guardados y los inyecta como elementos de la lista
    titulosRecientes.forEach(titulo => {
        let textoCorto = titulo.length > 15 ? titulo.substring(0,15) + "..." : titulo;
        ulHistorial.innerHTML += `<li>${textoCorto}</li>`;
    });
}