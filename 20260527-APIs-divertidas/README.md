# 🐾 APIs Divertidas de Animales

Proyecto educativo que muestra diferentes implementaciones de APIs de animales, desde una versión básica hasta versiones profesionales con información detallada.

## 📁 Estructura del Proyecto

```
20260527-APIs-divertidas/
├── 01-TheDogAPI/           # Versión básica (Dog CEO API)
├── 02-TheDogAPI-Pro/       # Versión mejorada (TheDogAPI)
├── 03-TheCatAPI-Pro/       # Versión felina (TheCatAPI)
├── 04-pokeAPI/             # Otra API divertida con imágenes y sonidos de pokémon.
└── README.md               # Este archivo
```

## 🐕 01-TheDogAPI (Versión Básica)

**API utilizada:** [Dog CEO](https://dog.ceo/dog-api/)

### Características:
- ✅ Muestra imágenes aleatorias de perros
- ✅ Extrae el nombre de la raza de la URL
- ✅ No requiere API Key
- ❌ Información limitada (solo imagen y raza)

### Cómo usar:
1. Abre `01-TheDogAPI/index.html` en tu navegador
2. Haz clic en "📸 Obtener otra foto 📸"
3. Desde aquí puedes navegar a la versión Pro

---

## 🦴 02-TheDogAPI-Pro (Versión Mejorada)

**API utilizada:** [TheDogAPI](https://api.thedogapi.com/)

### Características:
- ✅ Imágenes de alta calidad
- ✅ Información completa de la raza:
  - Nombre y grupo de raza
  - Origen
  - Esperanza de vida
  - Peso y altura
  - Temperamento (con tags)
  - Descripción detallada
- ✅ Manejo elegante de perros mestizos
- ✅ Diseño moderno y responsive
- ⚠️ Requiere API Key (gratuita)

### Cómo usar:
1. Abre `02-TheDogAPI-Pro/index.html`
2. Haz clic en "🦴 Nueva Raza 🦴"
3. Explora la información detallada de cada raza

---

## 🐱 03-TheCatAPI-Pro (Versión Felina)

**API utilizada:** [TheCatAPI](https://api.thecatapi.com/)

### Características:
- ✅ Similar a TheDogAPI pero para gatos
- ✅ Información adicional:
  - Niveles de inteligencia (1-5)
  - Niveles de energía (1-5)
  - Niveles de afecto (1-5)
- ✅ Manejo elegante de gatos domésticos
- ✅ Diseño con temática felina (colores rosados/naranjas)
- ⚠️ Requiere API Key (gratuita)

### Cómo usar:
1. Abre `03-TheCatAPI-Pro/index.html`
2. Haz clic en "🐟 Nueva Raza 🐟"
3. Descubre diferentes razas de gatos

---

## 🔑 API Keys

**Nota importante:** Las API Keys incluidas en el código son de ejemplo. Para producción, deberías:

1. Registrarte en [TheDogAPI](https://api.thedogapi.com/) y [TheCatAPI](https://api.thecatapi.com/)
2. Obtener tus propias API Keys gratuitas
3. Reemplazar las keys en los archivos JavaScript

### Variables a modificar:
- `02-TheDogAPI-Pro/perro.js`: `const API_KEY = "tu-key-aqui";`
- `03-TheCatAPI-Pro/gato.js`: `const API_KEY = "tu-key-aqui";`

---

## 🎨 Diseño y Características Técnicas

### Responsive Design
- ✅ Totalmente adaptable a móviles y tablets
- ✅ Menús de navegación entre versiones
- ✅ Animaciones suaves y loading spinners

### Mejoras de UX
- ✅ Indicadores de carga (spinners)
- ✅ Manejo de errores con opción de reintentar
- ✅ Transiciones y hover effects
- ✅ Imágenes con lazy loading

### Paleta de Colores
- **TheDogAPI-Pro:** Gradiente púrpura (`#667eea` → `#764ba2`)
- **TheCatAPI-Pro:** Gradiente rosa/naranja (`#f093fb` → `#f5576c`)
- **Dog CEO:** Fondo gris simple (`rgb(190, 179, 164)`)

---

## 🚀 Cómo Ejecutar el Proyecto

### Opción 1: Abrir directamente
Simplemente abre cualquier archivo `index.html` en tu navegador.

### Opción 2: Usar un servidor local (recomendado)
```bash
# Si tienes Python instalado
python -m http.server 8000

# Si tienes Node.js
npx serve .

# Si tienes PHP
php -S localhost:8000
```

Luego visita `http://localhost:8000` en tu navegador.

---

## 📊 Comparativa de APIs

| Característica | Dog CEO | TheDogAPI | TheCatAPI |
|---|---|---|---|
| **Gratis** | ✅ Sí | ✅ Sí (con límites) | ✅ Sí (con límites) |
| **API Key** | ❌ No | ✅ Sí | ✅ Sí |
| **Imágenes** | ✅ Sí | ✅ Sí | ✅ Sí |
| **Información raza** | ❌ Básica | ✅ Completa | ✅ Completa |
| **Temperamento** | ❌ No | ✅ Sí | ✅ Sí |
| **Esperanza de vida** | ❌ No | ✅ Sí | ✅ Sí |
| **Peso/Altura** | ❌ No | ✅ Sí | ✅ Parcial |
| **Descripción** | ❌ No | ✅ Sí | ✅ Sí |
| **Niveles (1-5)** | ❌ No | ❌ No | ✅ Sí |

---

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con gradients, flexbox, grid
- **JavaScript (ES6+)** - Async/await, fetch API, módulos
- **APIs externas** - Dog CEO, TheDogAPI, TheCatAPI

---

## 📝 Notas Importantes

1. **API Keys:** Las keys incluidas son de demostración. Para uso prolongado, obtén las tuyas propias.
2. **Rate Limits:** Ambas APIs profesionales tienen límites de peticiones por minuto/hora.
3. **Imágenes:** Las imágenes se cargan desde los servidores de las APIs, asegúrate de tener conexión a internet.
4. **Mestizos:** Cuando las APIs devuelven perros/gatos sin raza definida, se muestra información especial para animales mestizos.

---

## 🎯 Próximas Mejoras (Ideas)

- [ ] Añadir filtro por raza específica
- [ ] Implementar búsqueda por nombre
- [ ] Añadir más animales (pájaros, conejos, etc.)
- [ ] Guardar favoritos en localStorage
- [ ] Modo oscuro/claro
- [ ] Compartir en redes sociales
- [ ] Galería de imágenes por raza

---

## 🤝 Contribuciones

Este es un proyecto educativo. Si encuentras errores o tienes sugerencias, ¡eres bienvenido de mejorar el código!

---

## 📄 Licencia

Proyecto creado con fines educativos. Las APIs utilizadas tienen sus propios términos de servicio.

---

**¡Disfruta explorando el mundo de las APIs de animales! 🐾**