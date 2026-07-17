import React, { useState } from "react";

export default function BookForm({ onSubmit }) {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [año, setAño] = useState("");
  const [categoria, setCategoria] = useState("Ficción");
  const [estado, setEstado] = useState("Disponible");

  const handleSubmit = (e) => {
    e.preventDefault();
    const libro = {
      titulo,
      autor,
      año,
      categoria,
      estado,
    };
    onSubmit(libro);
    setTitulo("");
    setAutor("");
    setAño("");
    setCategoria("Ficción");
    setEstado("Disponible");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Autor"
        value={autor}
        onChange={(e) => setAutor(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Año"
        value={año}
        onChange={(e) => setAño(e.target.value)}
        required
      />
      <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
        <option value="Ficción">Ficción</option>
        <option value="Clásico">Clásico</option>
        <option value="Autoayuda">Autoayuda</option>
        <option value="Poemas">Poemas</option>
        <option value="Científico">Científico</option>
      </select>
      <select value={estado} onChange={(e) => setEstado(e.target.value)}>
        <option value="Disponible">Disponible</option>
        <option value="Prestado">Prestado</option>
        <option value="En reparación">En reparación</option>
      </select>
      <button type="submit">Crear</button>
    </form>
  );
}