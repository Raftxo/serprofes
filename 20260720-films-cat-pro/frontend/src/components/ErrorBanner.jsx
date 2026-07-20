// ==========================================================
// ErrorBanner.jsx
// Componente reutilizable para mostrar errores de forma elegante
// en vez de usar alert(). Se puede cerrar manualmente.
// ==========================================================
import { useEffect } from "react";

function ErrorBanner({ message, details, onClose }) {
  // Auto-cerrar después de 8 segundos
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 8000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="error-banner">
      <div className="error-banner-content">
        <span className="error-icon">⚠️</span>
        <div className="error-text">
          <strong>{message}</strong>
          {details && <p className="error-details">{details}</p>}
        </div>
        <button className="error-close" onClick={onClose} aria-label="Cerrar">
          ✕
        </button>
      </div>
    </div>
  );
}

export default ErrorBanner;