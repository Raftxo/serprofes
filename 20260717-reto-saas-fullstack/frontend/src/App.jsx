import React, { useState, useEffect } from "react";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";

export default function App() {
  const [libros, setLibros] = useState([]);

  // Obtener libros al cargar la aplicación
  useEffect(() => {
    fetch("http://localhost:3000/api/libros")
      .then((response) => response.json())
      .then((data) => setLibros(data))
      .catch((error) => console.error("Error al obtener libros:", error));
  }, []);

  // Crear libro
  const crearLibro = (libro) => {
    fetch("http://localhost:3000/api/libros", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(libro),
    })
      .then((response) => response.json())
      .then((newLibro) => {
        setLibros([...libros, newLibro]);
      })
      .catch((error) => console.error("Error al crear libro:", error));
  };

  // Editar libro
  const editarLibro = (id, libro) => {
    fetch(`http://localhost:3000/api/libros/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(libro),
    })
      .then((response) => response.json())
      .then((updatedLibro) => {
        setLibros(
          libros.map((l) => (l.id === id ? updatedLibro : l))
        );
      })
      .catch((error) => console.error("Error al editar libro:", error));
  };

  // Eliminar libro
  const eliminarLibro = (id) => {
    fetch(`http://localhost:3000/api/libros/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setLibros(libros.filter((libro) => libro.id !== id));
      })
      .catch((error) => console.error("Error al eliminar libro:", error));
  };

  return (
    <div>
      <h1>Librería Virtual</h1>
      <BookForm onSubmit={crearLibro} />
      <BookList
        libros={libros}
        onEdit={editarLibro}
        onDelete={eliminarLibro}
      />
    </div>
  );
}