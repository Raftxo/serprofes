// generar número aletario
// Math.random() genera un número entre 0 y 1
// al multiplicarse por 10 el resultado sería entre 0 y 9
// le sumamos un uno para que sea entre 1 y 10
// let numeroSecreto = Math.floor(Math.random())*10+1;
let numeroSecreto = Math.floor(Math.random() * 10) + 1;
// las variables del juego:
let vidas = 3;
// función principal
function comprobarNumero(){
    // Captura el número escrito por el usuario
    let intento = Number(
        document.getElementById('input-numero').value
    );
    // Captura el párrafo donde mostramos mensajes
    let etiqueta = document.getElementById('mensaje-salida');
    // capturar el texto de vida
    let textoVidas = document.getElementById('texto-vidas')

    // si el usuario gana
    if (intento === numeroSecreto){
        etiqueta.textContent = 
        " ¡Acertaste! 🎉 (El número era " + numeroSecreto + " )";
        etiqueta.style.color = "green";
    } else {
        // Restamos vidas
        vidas--;
        // Actualizar el texto de vidas:
        textoVidas.textContent = "Vidas: " + vidas + " ❤️";
    };

    // pistas
    if (intento < numeroSecreto){
        etiqueta.textContent = " ¡Fallaste! El número es mayor... ⬆️ ";
    } else {
        etiqueta.textContent = " ¡Fallaste! El número es menor... ⬇️ ";
    }

    etiqueta.style.color = "orange";

    // game over
    if (vidas === 0){
        etiqueta.textContent = " 😵☠️ Game Over 😵☠️ (El número era " + numeroSecreto + " )";
        etiqueta.style.color = "red";
        // desactivamos el botón
        document.getElementById('btn-jugar').disabled = true;
    }
}
