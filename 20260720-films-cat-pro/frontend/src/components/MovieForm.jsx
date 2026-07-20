// ==========================================================
// MovieForm.jsx
// Formulario unico que sirve tanto para CREAR como para EDITAR.
// Incluye validacion de duplicados en el cliente.
// ==========================================================
import { useState, useEffect } from "react";

function MovieForm({ editingMovie, onSubmit, onCancelEdit, existingMovies }) {
  const [titulo, setTitulo] = useState("");
  const [director, setDirector] = useState("");
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (editingMovie) {
      setTitulo(editingMovie.titulo);
      setDirector(editingMovie.director);
      setLocalError("");
    } else {
      setTitulo("");
      setDirector("");
      setLocalError("");
    }
  }, [editingMovie]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLocalError("");

    const tituloLimpio = titulo.trim();
    const directorLimpio = director.trim();

    if (!tituloLimpio || !directorLimpio) {
      setLocalError("Por favor, rellena el titulo y el director.");
      return;
    }

    const duplicada = (existingMovies || []).find(
      (p) =>
        p.titulo.toLowerCase() === tituloLimpio.toLowerCase() &&
        (!editingMovie || p.id !== editingMovie.id)
    );

    if (duplicada) {
      setLocalError(`Ya existe una pelicula llamada "${tituloLimpio}".`);
      return;
    }

    onSubmit({ titulo: tituloLimpio, director: directorLimpio });
    setTitulo("");
    setDirector("");
  };

  const isEditing = editingMovie !== null;

  return (
    <form className="movie-form" onSubmit={handleSubmit}>
      <h2 className="form-title">
        {isEditing ? "Editar pelicula" : "Agregar pelicula"}
      </h2>

      {localError && (
        <div className="form-error">
          <span>!</span> {localError}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="titulo">Titulo</label>
        <input
          id="titulo"
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Ej: Matrix"
          maxLength={200}
        />
      </div>

      <div className="form-group">
        <label htmlFor="director">Director</label>
        <input
          id="director"
          type="text"
          value={director}
          onChange={(e) => setDirector(e.target.value)}
          placeholder="Ej: Lana Wachowski"
          maxLength={200}
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {isEditing ? "Actualizar pelicula" : "Agregar pelicula"}
        </button>
        {isEditing && (
          <button type="button" className="btn btn-cancel" onClick={onCancelEdit}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default MovieForm;
