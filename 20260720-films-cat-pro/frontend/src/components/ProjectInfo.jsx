// ==========================================================
// ProjectInfo.jsx
// Panel informativo con la explicación del proyecto y
// ejemplos de pruebas CRUD que demuestran las protecciones.
// ==========================================================
function ProjectInfo() {
  return (
    <aside className="project-info">
      <h2 className="project-info-title">🛡️ Protecciones CRUD</h2>

      <p className="project-info-text">
        Este catálogo demuestra un backend Express con protecciones en las
        operaciones de creación, lectura, actualización y borrado de películas.
      </p>

      <section className="project-info-section">
        <h3>Protecciones activas</h3>
        <ul className="project-info-list">
          <li>
            <strong>Validación de inputs:</strong> título y director son
            obligatorios, se sanitizan y se limitan a 200 caracteres.
          </li>
          <li>
            <strong>Antiduplicados:</strong> no se permite repetir un título en
            POST ni cambiar a un título existente en PUT (case-insensitive).
          </li>
          <li>
            <strong>IDs numéricos:</strong> PUT y DELETE rechazan IDs no numéricos
            con error 400.
          </li>
          <li>
            <strong>Rate limiting:</strong> máximo 20 peticiones por minuto e IP.
          </li>
          <li>
            <strong>Persistencia:</strong> los datos se guardan en un archivo JSON.
          </li>
        </ul>
      </section>

      <section className="project-info-section">
        <h3>🧪 Ejemplos de pruebas CRUD</h3>

        <div className="project-example">
          <span className="method post">POST</span>
          <code>/api/peliculas</code>
          <p>Crear una película nueva válida → devuelve 201.</p>
        </div>

        <div className="project-example">
          <span className="method post">POST</span>
          <code>/api/peliculas</code>
          <p>
            Intentar crear &quot;Matrix&quot; otra vez → devuelve 409
            (duplicado).
          </p>
        </div>

        <div className="project-example">
          <span className="method post">POST</span>
          <code>/api/peliculas</code>
          <p>Enviar título o director vacío → devuelve 400.</p>
        </div>

        <div className="project-example">
          <span className="method put">PUT</span>
          <code>/api/peliculas/:id</code>
          <p>Editar una película con datos válidos → devuelve 200.</p>
        </div>

        <div className="project-example">
          <span className="method put">PUT</span>
          <code>/api/peliculas/:id</code>
          <p>Cambiar el título a uno ya existente → devuelve 409.</p>
        </div>

        <div className="project-example">
          <span className="method del">DELETE</span>
          <code>/api/peliculas/abc</code>
          <p>Borrar con ID no numérico → devuelve 400.</p>
        </div>

        <div className="project-example">
          <span className="method get">GET</span>
          <code>/api/peliculas</code>
          <p>Listar todo el catálogo → devuelve 200.</p>
        </div>

        <div className="project-example">
          <span className="method get">GET</span>
          <code>/api/peliculas</code>
          <p>Hacer más de 20 peticiones rápidas → devuelve 429.</p>
        </div>
      </section>
    </aside>
  );
}

export default ProjectInfo;
