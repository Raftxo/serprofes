function comprobarNumero(){
    // atrapamos el número usando let y getElementById
    let numero=Number(document.getElementById('numero-input').value);
    let etiqueta=document.getElementById('mensaje-salida');

    // tomamos la decisión con IF / ELSE
    if (numero % 2 === 0) {
        // Si el resto de la división entre 2 es 0 ...
        etiqueta.textContent = "El número " + numero + " es PAR.";
        etiqueta.style.color = "green";
    } else {
        // y si NO ...
        etiqueta.textContent = "El número " + numero + " es IMPAR.";
        etiqueta.style.color = "red";
    }
}