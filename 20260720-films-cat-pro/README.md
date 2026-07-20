BEGIN_PATH
/home/raftxo/webdev/serprofes/20260720-films-cat-pro/README.md
END_PATH
# 🎬 Films Cat Pro

Catálogo de películas mejorado con protecciones. Backend en Express + Frontend en React.

## 🚀 Inicio rápido

```bash
# 1. Configurar la API key de TMDb
cp .env.example backend/.env
# Edita backend/.env y pon tu clave de https://www.themoviedb.org/settings/api

# 2. Instalar dependencias (backend + frontend de una vez)
npm run install:all

# 3. Arrancar todo (backend + frontend en paralelo)
npm run dev
```

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000

## 🛡️ Protecciones del backend

| Protección | Descripción |
|---|---|
| **Antiduplicados** | No permite crear/editar películas con el mismo título (case-insensitive) |
| **Persistencia** | Los datos se guardan en `backend/data/peliculas.json` |
| **Rate limiting** | Máximo 20 peticiones/minuto por IP |
| **Sanitización** | Limpia inputs de caracteres peligrosos y limita longitud |
| **Validación** | Rechaza campos vacíos o inválidos |
| **Manejo de errores** | Respuestas JSON limpias, sin stack traces |

## 📁 Estructura

```
films-cat-pro/
├── backend/
│   ├── server.js              ← Servidor Express
│   ├── middleware/
│   │   ├── validate.js        ← Validación y sanitización
│   │   └── rateLimiter.js     ← Límite de peticiones
│   └── data/
│       └── peliculas.json     ← Persistencia de datos
├── frontend/
│   └── src/
│       ├── App.jsx            ← Componente principal
│       ├── components/
│       │   ├── ErrorBanner.jsx
│       │   ├── MovieCard.jsx
│       │   ├── MovieForm.jsx
│       │   └── MovieList.jsx
│       └── services/
│           └── movieService.js
├── package.json               ← Scripts unificados
└── README.md
```

## 🧪 Probar las protecciones

1. **Duplicados**: Intenta añadir "Matrix" dos veces → error 409
2. **Rate limiting**: Haz más de 20 peticiones rápidas → error 429
3. **Campos vacíos**: Envía el formulario sin datos → error 400
4. **Persistencia**: Añade películas, reinicia el servidor → siguen ahí
```

---

## ✅ Resumen: cómo ejecutar todo

```bash
# 1. Ir al directorio del proyecto
cd /home/raftxo/webdev/serprofes/20260720-films-cat-pro

# 2. Configurar la API key de TMDb
cp .env.example backend/.env
# Editar backend/.env con tu clave real

# 3. Instalar TODO (backend + frontend + concurrently)
npm run install:all

# 4. Arrancar ambos servidores a la vez
npm run dev