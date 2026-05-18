// Ejercicio 1. Contador de clics (Gestion de Datos)
// - identificamos las etiquetas exactas que vamos a manipular
const btnContar = document.querySelector('#countBtn');
const spanCount = document.querySelector('#count');

// - variable global para recordar el número de clicks
let contador = 0;

// - escuchamos el evento click en el botón
btnContar.addEventListener('click',()=>{
    contador++; // incrementa en 1 el valor matemático
    spanCount.textContent = contador; // inyectamos el numerito en el html
});

// Ejercicio 2. La manipulación de las clases (Toggle Menú)
// - la conexión (identificamos etiquetas)
const btnToggle = document.querySelector('#toggleMenu');
const nav = document.querySelector('#mainNav');

btnToggle.addEventListener('click',()=>{
    // classList.toggle() es mágico: si la clase 'oculto' está, la quita
    // y si no está, la pone.
    nav.classList.toggle('oculto');
    // cambiamos el texto del botón dependiendo de si el menú está visible o no
    const estaOculto = nav.classList.contains('oculto');
    if (estaOculto==false) {
        btnToggle.textContent = 'Mostrar Menú';
    }else{
        btnToggle.textContent = 'Ocultar Menú';
    }
});