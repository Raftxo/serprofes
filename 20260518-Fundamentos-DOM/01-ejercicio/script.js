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
    if (estaOculto) {
        btnToggle.textContent = 'Mostrar Menú';
    }else{
        btnToggle.textContent = 'Ocultar Menú';
    }
});

// Ejercicio 3. Modo Oscuro
const toggleOscuro = document.querySelector('#themeToggle');
const textoSwitch = document.querySelector('.switch-text');
const cuerpoWeb = document.body;
// paso A: Comprobar si el usuario ya tenía el modo oscuro guardado al cargar la página
const temaGuardado = localStorage.getItem('temaPreferido');
if (temaGuardado === 'oscuro'){
    cuerpoWeb.classList.add('dark');
    toggleOscuro.checked = true;
    textoSwitch.textContent = 'Desactivar Modo Oscuro';

};
// paso B: Escuchar cuando el usuario marca o desmarca el checkbox
toggleOscuro.addEventListener('change', ()=>{
    if (toggleOscuro.checked) {
        // si checkbox está marcado ponemos clase oscura y lo guardamos en el localStorage
            cuerpoWeb.classList.add('dark');
            localStorage.setItem('temaPreferido','oscuro');
            textoSwitch.textContent = 'Desactivar Modo Oscuro';
    } else {
        // si se desmarca, quitamos la clase y guardamos la preferencia
        cuerpoWeb.classList.remove('dark');
        localStorage.setItem('temaPreferido','claro');
        textoSwitch.textContent = 'Activar Modo Oscuro';
    }
});