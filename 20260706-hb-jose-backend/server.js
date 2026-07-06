// 1. Importar las herramientas
const express = require('express');
const app = express();

// 2. Nuestra base de datos falsa - el catálogo:
//    Esto es un array de objetos JSON
const inventario = [
    {id: 1, articulo: "Portátil HP", stock: 15},
    {id: 2, articulo: "Monitor Dell", stock: 5},
    {id: 3, articulo: "Teclado Mecánico", stock: 22}
];
// 3. LA RUTA (Camarero)
//    Cuando alguien pida 'api/productos', le entregamos el inventario

app.get('/api/productos', (req, res) => {
    // res.json convierte los datos para que el internet entienda
    res.json(inventario);
});

// 4. Encender el servidor
//    Le decimos que escuche en el puerto 3000
app.listen(3000, () => {
    console.log('🏃‍♀️ Servidor encendido y escuchando en el puerto 3000');
});