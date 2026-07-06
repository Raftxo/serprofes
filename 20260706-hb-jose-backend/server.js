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