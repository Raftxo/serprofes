// ==========================================================
// MovieCard.jsx
// Tarjeta individual de una película.
// ==========================================================
import { useState } from "react";
import { createPortal } from "react-dom";

function MovieCard({ movie, onEdit, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="movie-card">
      {movie.portada && (
        <div className="movie-poster-wrapper" onClick={openModal}>
          <img
            src={movie.portada}
            alt={movie.titulo}
            className="movie-poster"
            onError={(e) => {
              e.target.src = "/img/sin-portada.svg";
            }}
          />
        </div>
      )}

      <div className="movie-card-info">
        <h3 className="movie-title">{movie.titulo}</h3>
        <p className="movie-director">🎬 {movie.director}</p>
      </div>

      <div className="movie-card-actions">
        <button className="btn btn-edit" onClick={() => onEdit(movie)}>
          Editar
        </button>
        <button className="btn btn-delete" onClick={() => onDelete(movie.id)}>
          Eliminar
        </button>
      </div>

      {isModalOpen &&
        createPortal(
          <div className="movie-modal-overlay" onClick={closeModal}>
            <div
              className="movie-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="movie-modal-close"
                onClick={closeModal}
                aria-label="Cerrar"
              >
                ✕
              </button>
              <img
                src={movie.portada}
                alt={movie.titulo}
                className="movie-modal-image"
                onError={(e) => {
                  e.target.src = "/img/sin-portada.svg";
                }}
              />
              <h3 className="movie-modal-title">{movie.titulo}</h3>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

export default MovieCard;
