// Lista de imágenes (ajusta rutas según tu carpeta)
const locomotoras = ["loc1.png", "loc2.png"];
const vagones = ["v1.png", "v2.png", "v3.png", "v4.png"];

// Crea un tren aleatorio en una vía aleatoria
function crearTren() {
  const numVias = 3;
  const via = Math.ceil(Math.random() * numVias);
  const track = document.querySelector(`#track-${via}`);

  const tren = document.createElement("div");
  tren.classList.add("train");

  // Locomotora
  const loco = document.createElement("img");
  loco.src = "img/" + locomotoras[Math.floor(Math.random() * locomotoras.length)];
  loco.classList.add("car");
  tren.appendChild(loco);

  // Vagones aleatorios
  const numVagones = Math.floor(Math.random() * 4) + 1; // 1–4 vagones
  for (let i = 0; i < numVagones; i++) {
    const v = document.createElement("img");
    v.src = "img/" + vagones[Math.floor(Math.random() * vagones.length)];
    v.classList.add("car");
    tren.appendChild(v);
  }

  track.appendChild(tren);

  // Eliminar tren al terminar animación
  tren.addEventListener("animationend", () => tren.remove());
}

// Crear un tren cada 5 segundos
setInterval(crearTren, 5000);

// Crear uno al cargar la página
crearTren();
