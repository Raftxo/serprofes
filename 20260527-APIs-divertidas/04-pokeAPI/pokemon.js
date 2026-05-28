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

// Función para actualizar el fondo plasma según el tipo de Pokémon
function actualizarFondoPlasma(tipos) {
    const coloresPorTipo = {
        'grass': ['#4CAF50', '#8BC34A', '#CDDC39'],
        'fire': ['#FF5722', '#FF9800', '#F44336'],
        'water': ['#2196F3', '#03A9F4', '#00BCD4'],
        'bug': ['#8BC34A', '#CDDC39', '#FFEB3B'],
        'normal': ['#9E9E9E', '#BDBDBD', '#E0E0E0'],
        'poison': ['#9C27B0', '#BA68C8', '#CE93D8'],
        'electric': ['#FFEB3B', '#FFC107', '#FF9800'],
        'ground': ['#795548', '#8D6E63', '#A1887F'],
        'fairy': ['#E91E63', '#F48FB1', '#F8BBD0'],
        'fighting': ['#F44336', '#FF5722', '#FF9800'],
        'psychic': ['#9C27B0', '#673AB7', '#3F51B5'],
        'rock': ['#795548', '#9E9E9E', '#607D8B'],
        'ghost': ['#673AB7', '#512DA8', '#311B92'],
        'ice': ['#03A9F4', '#E1F5FE', '#B3E5FC'],
        'dragon': ['#3F51B5', '#673AB7', '#9C27B0'],
        'flying': ['#2196F3', '#64B5F6', '#90CAF9'],
        'steel': ['#9E9E9E', '#78909C', '#607D8B'],
        'dark': ['#424242', '#616161', '#757575']
    };
    
    // Obtener colores para los tipos del Pokémon
    let colores = [];
    tipos.forEach(tipo => {
        if (coloresPorTipo[tipo]) {
            colores = colores.concat(coloresPorTipo[tipo]);
        }
    });
    
    // Si no hay colores específicos, usar colores por defecto
    if (colores.length === 0) {
        colores = ['#667eea', '#764ba2', '#f093fb'];
    }
    
    // Actualizar variables CSS para la animación plasma
    document.documentElement.style.setProperty('--plasma-color-1', colores[0] || '#667eea');
    document.documentElement.style.setProperty('--plasma-color-2', colores[1] || '#764ba2');
    document.documentElement.style.setProperty('--plasma-color-3', colores[2] || '#f093fb');
    document.documentElement.style.setProperty('--plasma-color-4', colores[3] || colores[0] || '#667eea');
}

// Evento click en el botón
btn.addEventListener("click", buscarPokemon);

// Evento tecla Enter en el input
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        buscarPokemon();
    }
});
