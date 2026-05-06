function comprobarNumero(){
    // atrapamos el número usando let y getElementById
    let numero=Number(document.getElementById('numero-input').value);
    let etiqueta=document.getElementById('mensaje-salida');

    // tomamos la decisión con IF / ELSE
    if (numero >= 0 && numero <= 4) {
        // ...
        etiqueta.textContent = "Tu nota: " + numero + ". Has suspendido.";
        etiqueta.style.color = "red";
    } else if (numero >= 5 && numero <= 10) {
        // y si NO ...
        etiqueta.textContent = "Tu nota: " + numero + ". Has aprobado.";
        etiqueta.style.color = "green";
    } else {
        etiqueta.textContent = "Tu nota: " + numero + " no es número válido.";
        etiqueta.style.color = "blue";
    }
}