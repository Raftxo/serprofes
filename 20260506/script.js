function comprobarNumero() {
  // atrapamos el número usando let y getElementById
  let numero = Number(document.getElementById("numero-input").value);
  let etiqueta = document.getElementById("mensaje-salida");

  // tomamos la decisión con IF / ELSE
  if (numero === "" || numero < 0 || numero > 10) {
    etiqueta.textContent = "Introduce un número válido entre 0 y 10.";
    etiqueta.style.color = "blue";
  } else if (numero >= 0 && numero <= 4) {
    etiqueta.textContent = "Tu nota: " + numero + ". Has suspendido.";
    etiqueta.style.color = "red";
  } else {
    etiqueta.textContent = "Tu nota: " + numero + ". Has aprobado.";
    etiqueta.style.color = "green";
  }
}