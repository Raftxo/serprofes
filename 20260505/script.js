console.log("Hola, estoy vivo!!!");

function calcularPrecioFinal(){
    // 1. Atrapamos los valores de los inputs
    let precio = Number(document.getElementById('precio').value);
    let porcentaje = Number(document.getElementById('descuento').value);

    // 2. Lógica matemática
    const descuentoEnEuros = precio * (porcentaje / 100);
    const precioFinal = precio - descuentoEnEuros;

    // 3. Capturamos el elemento del DOM y lo guardamos en una constante
    const elementoResultado = document.getElementById('texto-resultado');

    // 4. Inyectamos el texto
    elementoResultado.textContent = precioFinal.toFixed(2) + " €";

    // 5. Animación (Quitamos, forzamos lectura y ponemos)
    elementoResultado.classList.remove('animacion-pulso');
    void elementoResultado.offsetWidth; // Truco para reiniciar la animación
    elementoResultado.classList.add('animacion-pulso');
}