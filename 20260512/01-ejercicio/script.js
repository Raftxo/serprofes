// la primera tarjeta
// 1. el objeto - usamos llaves para crear la ficha técnica
const producto = {
    nombre: "🍎 Manzanas",
    precio: 2.5,
    categoría: "Fruta",
};

// 2. cómo leemos un dato de la web?
document.getElementById("prod-nombre").textContent=producto.nombre;
document.getElementById("prod-precio").textContent=producto.precio;
document.getElementById("prod-cat").textContent=producto.categoría;

function mostrarMiFicha(){
    const alumno = {
        nombre: "Rafaelito 🧑‍🏫",
        edad: 55,
        ciudad: "Fuenlabrada",
    };
    // Mostrar los datos en html
    document.getElementById("alum-nombre").textContent=alumno.nombre;
    document.getElementById("alum-edad").textContent=alumno.edad;
    document.getElementById("alum-ciudad").textContent=alumno.ciudad;
}