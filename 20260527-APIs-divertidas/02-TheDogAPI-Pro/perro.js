const btn = document.getElementById("btn-nueva");
const container = document.getElementById("foto-container");

// API Key de TheDogAPI (gratuita)
const API_KEY = "live_5jFtMCDXKxyBppbAABbSbSbSbSbSbSbSbSbSbSbSbS";

async function cargaFoto() {
    container.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>⌛ Buscando información del perro...</p>
        </div>
    `;
    
    try {
        // Petición a TheDogAPI con attach_breeds=true para obtener información de la raza
        const respuesta = await fetch(
            "https://api.thedogapi.com/v1/images/search?attach_breeds=true",
            {
                headers: {
                    "x-api-key": API_KEY
                }
            }
        );
        
        if (!respuesta.ok) {
            throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
        }
        
        const datos = await respuesta.json();
        
        if (!datos || datos.length === 0) {
            throw new Error("No se encontraron datos");
        }
        
        const data = datos[0];
        const urlImagen = data.url;
        const raza = data.breeds?.[0];
        
        if (raza && raza.name) {
            // Si hay información de raza
            const nombreRaza = raza.name;
            const temperamento = raza.temperament || "No disponible";
            const esperanzaVida = raza.life_span || "No disponible";
            const peso = raza.weight?.metric || "No disponible";
            const altura = raza.height?.metric || "No disponible";
            const grupo = raza.breed_group || "No disponible";
            const origen = raza.origin || "No disponible";
            const descripcion = raza.description || "No hay descripción disponible.";
            
            // Convertir temperamento en tags
            const temperamentos = temperamento.split(', ').map(t => t.trim());
            
            container.innerHTML = `
                <article class="raza-card">
                    <div class="imagen-container">
                        <img src="${urlImagen}" alt="Perro raza ${nombreRaza}" loading="lazy" />
                        <div class="imagen-badge">${nombreRaza}</div>
                    </div>
                    
                    <div class="info-container">
                        <h2>🐕 ${nombreRaza}</h2>
                        
                        <div class="info-basica">
                            <div class="info-item">
                                <span class="icon">🧬</span>
                                <div class="info-content">
                                    <strong>Grupo</strong>
                                    <span>${grupo}</span>
                                </div>
                            </div>
                            <div class="info-item">
                                <span class="icon">🌍</span>
                                <div class="info-content">
                                    <strong>Origen</strong>
                                    <span>${origen}</span>
                                </div>
                            </div>
                            <div class="info-item">
                                <span class="icon">⏱️</span>
                                <div class="info-content">
                                    <strong>Esperanza de vida</strong>
                                    <span>${esperanzaVida} años</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="info-fisica">
                            <div class="info-item doble">
                                <span class="icon">⚖️</span>
                                <div class="info-content">
                                    <strong>Peso</strong>
                                    <span>${peso} kg</span>
                                </div>
                            </div>
                            <div class="info-item doble">
                                <span class="icon">📏</span>
                                <div class="info-content">
                                    <strong>Altura</strong>
                                    <span>${altura} cm</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="temperamento-section">
                            <h3>🎭 Temperamento</h3>
                            <div class="tags">
                                ${temperamentos.map(t => `<span class="tag">${t}</span>`).join('')}
                            </div>
                        </div>
                        
                        <div class="descripcion-section">
                            <h3>📝 Descripción</h3>
                            <p>${descripcion}</p>
                        </div>
                    </div>
                </article>
            `;
        } else {
            // Si no hay información de raza (perro mestizo)
            container.innerHTML = `
                <article class="raza-card mestizo">
                    <div class="imagen-container">
                        <img src="${urlImagen}" alt="Perro mestizo" loading="lazy" />
                        <div class="imagen-badge">Mestizo</div>
                    </div>
                    
                    <div class="info-container">
                        <h2>🐕 Perro Mestizo</h2>
                        
                        <div class="info-mestizo">
                            <p>✨ ¡Cada perro mestizo es único y especial!</p>
                            <p>Los perros mestizos suelen ser más saludables que los de raza pura 
                            debido a su mayor diversidad genética. Son compañeros leales y amorosos 
                            que merecen tanto amor como cualquier otro perro.</p>
                            
                            <div class="ventajas-mestizo">
                                <h4>Ventajas de adoptar un mestizo:</h4>
                                <ul>
                                    <li>✅ Mayor diversidad genética</li>
                                    <li>✅ Menos problemas de salud hereditarios</li>
                                    <li>✅ Personalidad única e irrepetible</li>
                                    <li>✅ Estás salvando una vida</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </article>
            `;
        }
    } catch (error) {
        container.innerHTML = `
            <div class="error">
                <div class="error-icon">❌</div>
                <h3>Error al cargar</h3>
                <p>${error.message}</p>
                <button onclick="cargaFoto()" class="btn-reintentar">
                    🔄 Reintentar
                </button>
            </div>
        `;
        console.error("Error en TheDogAPI:", error);
    }
}

// Evento del botón
btn.addEventListener("click", cargaFoto);

// Cargar una foto al iniciar
cargaFoto();