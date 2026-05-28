const btn = document.getElementById("btn-nueva");
const container = document.getElementById("foto-container");

// API Key de TheCatAPI (gratuita)
const API_KEY = "live_5jFtMCDXKxyBppbAABbSbSbSbSbSbSbSbSbSbSbSbS";

async function cargaFoto() {
    container.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>⌛ Buscando información del gato...</p>
        </div>
    `;
    
    try {
        // Petición a TheCatAPI con attach_breeds=true para obtener información de la raza
        const respuesta = await fetch(
            "https://api.thecatapi.com/v1/images/search?attach_breeds=true",
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
            const origen = raza.origin || "No disponible";
            const descripcion = raza.description || "No hay descripción disponible.";
            const inteligencia = raza.intelligence ? `${raza.intelligence}/5` : "No disponible";
            const energia = raza.energy ? `${raza.energy}/5` : "No disponible";
            const afectuoso = raza.affection_level ? `${raza.affection_level}/5` : "No disponible";
            
            // Convertir temperamento en tags
            const temperamentos = temperamento.split(', ').map(t => t.trim());
            
            container.innerHTML = `
                <article class="raza-card">
                    <div class="imagen-container">
                        <img src="${urlImagen}" alt="Gato raza ${nombreRaza}" loading="lazy" />
                        <div class="imagen-badge">${nombreRaza}</div>
                    </div>
                    
                    <div class="info-container">
                        <h2>🐱 ${nombreRaza}</h2>
                        
                        <div class="info-basica">
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
                            <div class="info-item">
                                <span class="icon">⚖️</span>
                                <div class="info-content">
                                    <strong>Peso</strong>
                                    <span>${peso} kg</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="info-niveles">
                            <div class="info-item nivel">
                                <span class="icon">🧠</span>
                                <div class="info-content">
                                    <strong>Inteligencia</strong>
                                    <div class="nivel-bar">
                                        <div class="nivel-fill" style="width: ${raza.intelligence * 20}%"></div>
                                    </div>
                                    <span>${inteligencia}</span>
                                </div>
                            </div>
                            <div class="info-item nivel">
                                <span class="icon">⚡</span>
                                <div class="info-content">
                                    <strong>Energía</strong>
                                    <div class="nivel-bar">
                                        <div class="nivel-fill" style="width: ${raza.energy * 20}%"></div>
                                    </div>
                                    <span>${energia}</span>
                                </div>
                            </div>
                            <div class="info-item nivel">
                                <span class="icon">❤️</span>
                                <div class="info-content">
                                    <strong>Afectuoso</strong>
                                    <div class="nivel-bar">
                                        <div class="nivel-fill" style="width: ${raza.affection_level * 20}%"></div>
                                    </div>
                                    <span>${afectuoso}</span>
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
            // Si no hay información de raza (gato mestizo/doméstico)
            container.innerHTML = `
                <article class="raza-card mestizo">
                    <div class="imagen-container">
                        <img src="${urlImagen}" alt="Gato doméstico" loading="lazy" />
                        <div class="imagen-badge">Doméstico</div>
                    </div>
                    
                    <div class="info-container">
                        <h2>🐱 Gato Doméstico</h2>
                        
                        <div class="info-mestizo">
                            <p>✨ ¡Cada gato doméstico es único y especial!</p>
                            <p>Los gatos domésticos (también llamados mestizos o comunes) son 
                            felinos maravillosos con personalidades únicas. Suelen ser más 
                            saludables que los gatos de raza pura y tienen una gran diversidad 
                            de colores y patrones.</p>
                            
                            <div class="ventajas-mestizo">
                                <h4>Ventajas de adoptar un gato doméstico:</h4>
                                <ul>
                                    <li>✅ Mayor diversidad genética y salud</li>
                                    <li>✅ Personalidad única e impredecible</li>
                                    <li>✅ Gran variedad de colores y patrones</li>
                                    <li>✅ Estás salvando una vida 🐱</li>
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
        console.error("Error en TheCatAPI:", error);
    }
}

// Evento del botón
btn.addEventListener("click", cargaFoto);

// Cargar una foto al iniciar
cargaFoto();