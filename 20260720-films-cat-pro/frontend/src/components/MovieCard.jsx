// ==========================================================
// MovieCard.jsx
// Tarjeta individual de una película.
// ==========================================================
function MovieCard({ movie, onEdit, onDelete }) {
  return (
    <div className="movie-card">
      {movie.portada && (
        <img
          src={movie.portada}
          alt={movie.titulo}
          className="movie-poster"
          onError={(e) => {
            e.target.src = "/img/sin-portada.svg";
          }}
        />
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
    </div>
  );
}

export default MovieCard;