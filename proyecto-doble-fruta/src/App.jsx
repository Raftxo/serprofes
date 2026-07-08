import { useState } from "react";

function App() {
  const [listaA, setListaA] = useState([]);
  const [listaB, setListaB] = useState([]);
  const [nuevoItem, setNuevoItem] = useState("");
  const [listaSeleccionada, setListaSeleccionada] = useState("A");
  const [idBorrar, setIdBorrar] = useState("");

  // Mostrar Lista A
  const mostrarListaA = async () => {
    const res = await fetch("http://localhost:3000/api/primera");
    const data = await res.json();
    setListaA(data);
  };

  // Mostrar Lista B
  const mostrarListaB = async () => {
    const res = await fetch("http://localhost:3000/api/segunda");
    const data = await res.json();
    setListaB(data);
  };

  // Añadir elemento
  const añadirElemento = async () => {
    await fetch("http://localhost:3000/api/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lista: listaSeleccionada,
        item: nuevoItem
      })
    });

    // refrescar listas
    mostrarListaA();
    mostrarListaB();
    setNuevoItem("");
  };

  // Borrar elemento por ID
  const borrarElemento = async () => {
    await fetch("http://localhost:3000/api/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lista: listaSeleccionada,
        id: Number(idBorrar)
      })
    });

    // refrescar listas
    mostrarListaA();
    mostrarListaB();
    setIdBorrar("");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Comprobador CRUD</h1>

      <h2>Mostrar Listas</h2>
      <button onClick={mostrarListaA}>Mostrar Lista A</button>
      <button onClick={mostrarListaB}>Mostrar Lista B</button>

      <h3>Lista A</h3>
      <ul>
        {listaA.map(e => (
          <li key={e.id}>
            {e.id} - {e.item}
          </li>
        ))}
      </ul>

      <h3>Lista B</h3>
      <ul>
        {listaB.map(e => (
          <li key={e.id}>
            {e.id} - {e.item}
          </li>
        ))}
      </ul>

      <hr />

      <h2>Añadir elemento</h2>
      <label>
        Lista:
        <select
          value={listaSeleccionada}
          onChange={e => setListaSeleccionada(e.target.value)}
        >
          <option value="A">Lista A</option>
          <option value="B">Lista B</option>
        </select>
      </label>

      <br /><br />

      <input
        type="text"
        placeholder="Nuevo elemento"
        value={nuevoItem}
        onChange={e => setNuevoItem(e.target.value)}
      />

      <button onClick={añadirElemento}>Añadir</button>

      <hr />

      <h2>Borrar elemento</h2>

      <label>
        Lista:
        <select
          value={listaSeleccionada}
          onChange={e => setListaSeleccionada(e.target.value)}
        >
          <option value="A">Lista A</option>
          <option value="B">Lista B</option>
        </select>
      </label>

      <br /><br />

      <input
        type="number"
        placeholder="ID a borrar"
        value={idBorrar}
        onChange={e => setIdBorrar(e.target.value)}
      />

      <button onClick={borrarElemento}>Borrar</button>
    </div>
  );
}

export default App;
