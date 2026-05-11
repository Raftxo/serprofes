// 1. Creamos nuestra "Caja grande" (Array)
const carrito = ["🍏 Manzana", "🍌 Plátano"];
// 2. Imprimimos el carrito nada más al cargar la página
document.getElementById('pantalla-cesta').textContent = carrito.join(" - ");
// 3. La función para agregar cosas nuevas a la lista (array)
function añadirAlCarrito(){
    // atrapamos lo que escribe el usuario
    let item = document.getElementById('nuevo-item').value;
    // magia de array .push() - mete el nuevo elemento al final de la lista
    carrito.push(item);
    // y volvemos a pintar la cesta para que se vea
    document.getElementById('pantalla-cesta').textContent = carrito.join(" - ");
    // limpiamos el input
    document.getElementById('nuevo-item').value = "";

}