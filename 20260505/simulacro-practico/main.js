// Usamos const porque el botón y el precio no van a cambiar de "caja"
const btnAdd = document.getElementById('add-btn');
const productName = "Zapatillas Runner Ultra";
const productPrice = 89.99;

// Un pequeño evento para comprobar que funciona
btnAdd.addEventListener('click', () => {
    alert(`¡Gracias! Has añadido ${productName} por ${productPrice}€ al carrito.`);
    console.log("Acción registrada en el sistema.");
});