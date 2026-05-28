const input = document.getElementById("poke-input");
const btn = document.getElementById("btn-buscar");
const out = document.getElementById("resultado");

// Función asíncrona para buscar Pokémon
async function buscarPokemon() {
    // Limpiamos el texto del input y lo pasamos a minúsculas (la API falla si le envías mayúsculas)
    const termino = input.value.trim().toLowerCase();
    if (termino===""){
        out.textContent="⚠️ Por favor, escribe un nombre o ID. ⚠️";
        return;
    }
    out.textContent = "⌛️ Cargando datos desde la PokéAPI... ⌛️";

    try{
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${termino}`);
    
    if (!respuesta.ok) throw new Error("Mal");
    const pokemon = await respuesta.json();

    // Dividir estadísticas en dos columnas (primeras 3 a la izquierda, últimas 3 a la derecha)
    const estadisticasIzquierda = pokemon.stats.slice(0, 3).map(stat => {
        return `
            <li><strong>${stat.stat.name.toUpperCase()}:</strong>
            ${stat.base_stat}</li>
        `;
    }).join("");
    
    const estadisticasDerecha = pokemon.stats.slice(3).map(stat => {
        return `
            <li><strong>${stat.stat.name.toUpperCase()}:</strong>
            ${stat.base_stat}</li>
        `;
    }).join("");
    
    const tipos = pokemon.types.map(t => t.type.name).join(", ");
    
    // Obtener URL del sonido (cries.latest)
    const sonidoUrl = pokemon.cries && pokemon.cries.latest ? pokemon.cries.latest : null;
    
    // Añadir atributo de sonido a la imagen si está disponible
    const sonidoAttr = sonidoUrl ? `data-sonido="${sonidoUrl}" title="Haz clic para reproducir sonido 🔊"` : '';
    
    out.innerHTML = `
        <h2>${pokemon.name.toUpperCase()} (#${pokemon.id})</h2>
        <p><strong>Tipos:</strong> ${tipos}</p>
        <div class="pokemon-container">
            <div class="stats-column">
                <ul>
                    ${estadisticasIzquierda}
                </ul>
            </div>
            <div class="image-column">
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" width="150" ${sonidoAttr} />
            </div>
            <div class="stats-column">
                <ul>
                    ${estadisticasDerecha}
                </ul>
            </div>
        </div>
    `;
    
    // Añadir evento para reproducir sonido al hacer clic en la imagen
    if (sonidoUrl) {
        const img = out.querySelector('img');
        img.style.cursor = 'pointer';
        
        // Reproducir sonido automáticamente la primera vez
        const audio = new Audio(sonidoUrl);
        audio.play().catch(e => console.log('Error al reproducir sonido:', e));
        
        // Reproducir sonido al hacer clic en la imagen
        img.addEventListener('click', () => {
            const clickAudio = new Audio(sonidoUrl);
            clickAudio.play();
        });
    }
    }catch{
        out.textContent = "❌ Error garrafal ❌";
    }
    
    // Actualizar fondo con animación plasma según tipo de Pokémon
    if (pokemon.types && pokemon.types.length > 0) {
        actualizarFondoPlasma(pokemon.types.map(t => t.type.name));
    }
}

// Función para actualizar el color de la franja según el tipo de Pokémon
function actualizarFondoPlasma(tipos) {
    const coloresPorTipo = {
        'normal': '#9fa19f',
        'fire': '#e62829',
        'fighting': '#ff8000',
        'water': '#2980ef',
        'flying': '#81b9ef',
        'grass': '#3fa129',
        'poison': '#9141cb',
        'electric': '#fac000',
        'ground': '#915121',
        'psychic': '#ef4179',
        'rock': '#afa981',
        'ice': '#3dcef3',
        'bug': '#91a119',
        'dragon': '#5060e1',
        'ghost': '#704170',
        'dark': '#624d4e',
        'steel': '#60a1b8',
        'fairy': '#ef70ef',
        'stellar': '#40b5a5',
    };
    
    // Obtener color para el primer tipo del Pokémon
    let colorTipo = null;
    if (tipos.length > 0) {
        const primerTipo = tipos[0];
    colorTipo = coloresPorTipo[primerTipo] || coloresPorTipo['unknown'];
    }
    
    // Si no hay color específico, usar color por defecto (#68a090)
    if (!colorTipo) {
        colorTipo = '#FF0000';
    }
    
    // Actualizar variable CSS para el color de la franja
    document.documentElement.style.setProperty('--tipo-color', colorTipo);
    
    // Reiniciar la animación de la franja
    const franja = document.getElementById('franja-fondo');
    if (franja) {
        franja.style.animation = 'none';
        franja.offsetHeight; // Forzar reflow
        franja.style.animation = '';
    }
}

// Evento click en el botón
btn.addEventListener("click", buscarPokemon);

// Evento tecla Enter en el input
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        buscarPokemon();
    }
});
