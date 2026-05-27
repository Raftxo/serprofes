async function cargaFoto() {
    container.innerHTML = "buscando perrito ...";
    try {
        // 1. Llamamos al endpoint de razas (cada objeto aquí es una raza garantizada)
        const respuesta = await fetch(
            "https://api.thedogapi.com/v1/breeds", 
            {
                headers: {
                    "x-api-key": "live_IPrNTHqFGz9016zWDtyameHVz7VkXgU2OPEWWT2lUGFv9QpzdblJEkUg5CxsKFAw" 
                }
            }
        );
        
        if (!respuesta.ok) {
            throw new Error(`Error en el servidor: ${respuesta.status}`);
        }
        
        const razas = await respuesta.json();
        
        // 2. Elegimos una raza al azar de todo el catálogo que nos devuelve
        const razaAleatoria = razas[Math.floor(Math.random() * razas.length)];
        
        // 3. Extraemos el nombre y la URL de la imagen asociada a esa raza
        const nombreRaza = razaAleatoria.name;
        const urlImagen = razaAleatoria.image?.url;

        // Si por algún motivo esa raza no tuviera foto asignada, disparamos un plan B
        if (!urlImagen) {
            throw new Error("La raza seleccionada no tenía foto, reintentando...");
        }
        
        // 4. Pintamos en el HTML
        container.innerHTML = `
        <img src="${urlImagen}" alt="${nombreRaza}" style="max-width: 100%; height: auto;" />
        <p><strong>Raza:</strong> ${nombreRaza}</p>
        `;
    } catch (error) {
        container.innerHTML = `
        <p style="color:red"> ❌ Error: ${error.message}</p>
        `;
        // Si falló porque justo tocó una raza sin foto, volvemos a intentar automáticamente
        if (error.message.includes("La raza seleccionada")) {
            cargaFoto();
        }
    }
}