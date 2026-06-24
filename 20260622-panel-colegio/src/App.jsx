import { useState, useEffect } from 'react'

export default function App() {
  const [registros, setRegistros] = useState([]);
  const [nombre, setNombre] = useState("");
  const [curso, setCurso] = useState("");
  const [tipo, setTipo] = useState("alumno");
  const [busqueda, setBusqueda] = useState("");
  const [editando, setEditando] = useState(null);
  const API_URL = "http://localhost:3000/api";

  const obtenerRegistros = async () => {
    try {
      const [resAlumnos, resProfes] = await Promise.all([
        fetch(`${API_URL}/estudiantes`),
        fetch(`${API_URL}/profesores`)
      ]);
      const alumnos = await resAlumnos.json();
      const profesores = await resProfes.json();

      const todos = [
        ...alumnos.map(a => ({ ...a, tipo: "alumno", curso: a.curso })),
        ...profesores.map(p => ({ ...p, tipo: "profesor", curso: p.asignatura }))
      ];
      setRegistros(todos);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    obtenerRegistros();
  }, []);

  const manejarEnvio = async (e) => {
    e.preventDefault();

    try {
      if (editando) {
        const endpoint = editando.tipo === "alumno" ? "/estudiantes" : "/profesores";
        const body = editando.tipo === "alumno"
          ? { nombre, curso }
          : { nombre, asignatura: curso };

        const res = await fetch(`${API_URL}${endpoint}/${editando.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });

        if (res.ok) {
          cancelarEdicion();
          obtenerRegistros();
        }
      } else {
        const endpoint = tipo === "alumno" ? "/estudiantes" : "/profesores";
        const body = tipo === "alumno"
          ? { nombre, curso }
          : { nombre, asignatura: curso };

        const res = await fetch(`${API_URL}${endpoint}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });

        if (res.ok) {
          setNombre("");
          setCurso("");
          obtenerRegistros();
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const manejarBorrado = async (id, tipoRegistro) => {
    const endpoint = tipoRegistro === "alumno" ? "/estudiantes" : "/profesores";
    try {
      const res = await fetch(`${API_URL}${endpoint}/${id}`, {
        method: "DELETE"
      });
      if (res.ok) obtenerRegistros();
    } catch (e) {
      console.error(e);
    }
  };

  const iniciarEdicion = (registro) => {
    setEditando(registro);
    setNombre(registro.nombre);
    setCurso(registro.curso);
    setTipo(registro.tipo);
    document.getElementById("form").scrollIntoView({ behavior: "smooth" });
  };

  const cancelarEdicion = () => {
    setEditando(null);
    setNombre("");
    setCurso("");
    setTipo("alumno");
  };

  const filtrados = registros.filter(r =>
    r.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const alumnos = filtrados.filter(r => r.tipo === "alumno");
  const profesores = filtrados.filter(r => r.tipo === "profesor");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-6">

        <h1 className="text-2xl font-bold mb-4">Panel de Gestión</h1>

        {/* Buscador */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar alumnos o profesores..."
            className="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Formulario */}
        <form id="form" onSubmit={manejarEnvio} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8">
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre"
            required
            className="px-3 py-2 border rounded-xl"
          />
          <input
            type="text"
            value={curso}
            onChange={(e) => setCurso(e.target.value)}
            placeholder={editando?.tipo === "profesor" ? "Asignatura" : "Curso"}
            required
            className="px-3 py-2 border rounded-xl"
          />
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            disabled={!!editando}
            className="px-3 py-2 border rounded-xl disabled:bg-gray-200 disabled:cursor-not-allowed"
          >
            <option value="alumno">Alumno</option>
            <option value="profesor">Profesor</option>
          </select>
          <div className="flex gap-2">
            <button className="flex-1 bg-green-600 text-white rounded-xl hover:bg-green-700 text-xl">
              {editando ? "✓" : "💾"}
            </button>
            {editando && (
              <button
                type="button"
                onClick={cancelarEdicion}
                className="bg-gray-400 text-white px-3 py-2 rounded-xl hover:bg-gray-500 text-xl"
              >
                ✕
              </button>
            )}
          </div>
        </form>

        {/* Mensaje de modo edición */}
        {editando && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-2 rounded-xl mb-4">
            ✏️ Editando: <strong>{editando.nombre}</strong> — Modifica los campos y pulsa "✓"
          </div>
        )}

        {/* TABLAS */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Alumnos */}
          <div>
            <h2 className="font-semibold mb-2">Alumnos ({alumnos.length})</h2>
            <div className="bg-gray-50 rounded-xl p-3 space-y-2">
              {alumnos.length === 0 && <p className="text-gray-400 text-center py-4">No hay alumnos</p>}
              {alumnos.map(a => (
                <div key={a.id} className={`flex justify-between items-center bg-white p-3 rounded-xl shadow-sm ${editando?.id === a.id && editando?.tipo === "alumno" ? "ring-2 ring-yellow-400" : ""}`}>
                  <span>{a.nombre} - {a.curso}</span>
                  <div className="flex gap-2">
                    <button onClick={() => iniciarEdicion(a)} className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500 text-lg">✏️</button>
                    <button onClick={() => manejarBorrado(a.id, a.tipo)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-lg">🗑️</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Profesores */}
          <div>
            <h2 className="font-semibold mb-2">Profesores ({profesores.length})</h2>
            <div className="bg-gray-50 rounded-xl p-3 space-y-2">
              {profesores.length === 0 && <p className="text-gray-400 text-center py-4">No hay profesores</p>}
              {profesores.map(p => (
                <div key={p.id} className={`flex justify-between items-center bg-white p-3 rounded-xl shadow-sm ${editando?.id === p.id && editando?.tipo === "profesor" ? "ring-2 ring-yellow-400" : ""}`}>
                  <span>{p.nombre} - {p.curso}</span>
                  <div className="flex gap-2">
                    <button onClick={() => iniciarEdicion(p)} className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500 text-lg">✏️</button>
                    <button onClick={() => manejarBorrado(p.id, p.tipo)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-lg">🗑️</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}