import React from "react";

export default function BookList({ libros, onEdit, onDelete }) {
  return (
    <div>
      {libros.map((libro) => (
        <div key={libro.id} className="book">
          <h2>{libro.titulo}</h2>
          <p><strong>Autor:</strong> {libro.autor}</p>
          <p><strong>Año:</strong> {libro.año}</p>
          <p><strong>Categoría:</strong> {libro.categoria}</p>
          <p><strong>Estado:</strong> {libro.estado}</p>
          <button onClick={() => onEdit(libro.id, libro)}>Editar</button>
          <button onClick={() => onDelete(libro.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}