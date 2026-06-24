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
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6">

        <h1 className="text-3xl font-bold mb-4">🎓 Panel de Gestión</h1>

        {/* Buscador */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="🔍 Buscar alumnos o profesores..."
            className="flex-1 px-4 py-2 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 bg-white/80"
          />
        </div>

        {/* Formulario */}
        <form id="form" onSubmit={manejarEnvio} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8 bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-2xl">
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="👤 Nombre"
            required
            className="px-3 py-2 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="text"
            value={curso}
            onChange={(e) => setCurso(e.target.value)}
            placeholder={editando?.tipo === "profesor" ? "📚 Asignatura" : "📖 Curso"}
            required
            className="px-3 py-2 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            disabled={!!editando}
            className="px-3 py-2 border-2 border-purple-200 rounded-xl disabled:bg-gray-200 disabled:cursor-not-allowed"
          >
            <option value="alumno">🎒 Alumno</option>
            <option value="profesor">👨‍🏫 Profesor</option>
          </select>
          <div className="flex gap-2">
            <button type="submit" className="btn-save flex-1 bg-green-500 text-white rounded-xl hover:bg-green-600 text-xl cursor-pointer shadow-md hover:shadow-lg transition-shadow">
              {editando ? "✓" : "💾"}
            </button>
            {editando && (
              <button
                type="button"
                onClick={cancelarEdicion}
                className="btn-cancel bg-gray-400 text-white px-3 py-2 rounded-xl hover:bg-gray-500 text-xl cursor-pointer shadow-md"
              >
                ✕
              </button>
            )}
          </div>
        </form>

        {/* Mensaje de modo edición */}
        {editando && (
          <div className="bg-yellow-100 border-2 border-yellow-400 text-yellow-800 px-4 py-2 rounded-xl mb-4 animate-pulse">
            ✏️ Editando: <strong>{editando.nombre}</strong> — Modifica los campos y pulsa "✓"
          </div>
        )}

        {/* TABLAS */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Alumnos */}
          <div>
            <h2 className="font-semibold mb-2 text-purple-700">🎒 Alumnos ({alumnos.length})</h2>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-3 space-y-2">
              {alumnos.length === 0 && <p className="text-gray-400 text-center py-4">No hay alumnos</p>}
              {alumnos.map(a => (
                <div key={a.id} className={`card-item flex justify-between items-center bg-white p-3 rounded-xl shadow-sm ${editando?.id === a.id && editando?.tipo === "alumno" ? "ring-2 ring-yellow-400" : ""}`}>
                  <span>{a.nombre} - {a.curso}</span>
                  <div className="flex gap-2">
                    <button onClick={() => iniciarEdicion(a)} className="btn-edit bg-yellow-400 px-3 py-1 rounded-lg hover:bg-yellow-500 text-lg cursor-pointer shadow-sm">✏️</button>
                    <button onClick={() => manejarBorrado(a.id, a.tipo)} className="btn-delete bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 text-lg cursor-pointer shadow-sm">🗑️</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Profesores */}
          <div>
            <h2 className="font-semibold mb-2 text-pink-700">👨‍🏫 Profesores ({profesores.length})</h2>
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-3 space-y-2">
              {profesores.length === 0 && <p className="text-gray-400 text-center py-4">No hay profesores</p>}
              {profesores.map(p => (
                <div key={p.id} className={`card-item flex justify-between items-center bg-white p-3 rounded-xl shadow-sm ${editando?.id === p.id && editando?.tipo === "profesor" ? "ring-2 ring-yellow-400" : ""}`}>
                  <span>{p.nombre} - {p.curso}</span>
                  <div className="flex gap-2">
                    <button onClick={() => iniciarEdicion(p)} className="btn-edit bg-yellow-400 px-3 py-1 rounded-lg hover:bg-yellow-500 text-lg cursor-pointer shadow-sm">✏️</button>
                    <button onClick={() => manejarBorrado(p.id, p.tipo)} className="btn-delete bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 text-lg cursor-pointer shadow-sm">🗑️</button>
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