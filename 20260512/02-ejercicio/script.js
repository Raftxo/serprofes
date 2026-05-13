// nuestro súper array lleno de objetos
const carrito = [
    {nombre: "🥖 Pan de Masa Madre", precio:1.20},
    {nombre: "🧃 Leche Entera", precio:0.90},
    {nombre: "🥚 Huevos Camperos", precio:2.50},
    {nombre: "🥑 Aguacate",precio:1.00},
    {nombre: "🧄 Ajo",precio:0.55},
    {nombre: "🍾 Agua con Gas",precio:0.75}
];
// Javascript DOM
let listaHTML = document.getElementById('lista-producto');
for(let i = 0; i<carrito.length;i++){
    // usamos carrito[i].nombre para sacar el dato
    listaHTML.innerHTML += `
    <li><span>${carrito[i].nombre}</span>
    <span>${carrito[i].precio.toFixed(2)} €</span></li>
    `
}

function cobrar(){
    // 1. Calculamos el subtotal
    let subtotal = 0; // <--- Cambiado de sumaTotal a subtotal
    for (let i = 0; i < carrito.length; i++){
        subtotal = subtotal + carrito[i].precio;
    }

    // 2. Calculamos el IVA (21%) y el Total
    const tasaIVA = 0.21;
    let totalIVA = subtotal * tasaIVA; // <--- Ahora sí encuentra "subtotal"
    let totalFinal = subtotal + totalIVA;

    // 3. Mostramos los resultados en el HTML
    document.getElementById('resultado-total').innerHTML = `
    <span class="detalle">Subtotal: ${subtotal.toFixed(2)} €</span>
    <span class="detalle">IVA (21%): ${totalIVA.toFixed(2)} €</span>
    <span class="monto-final">Total: ${totalFinal.toFixed(2)} €</span>
    `;
}