# Películas Backend (20260714-backend-peliculas)

Bienvenido al proyecto backend para la gestión de películas. Este proyecto está diseñado para ser clonado y ejecutado en tu máquina local. A continuación, encontrarás instrucciones para configurar y ejecutar el proyecto.

## Contenido del Proyecto

- `node_modules/`: Carpeta que contiene las dependencias de Node.js. **No se incluye al clonar el repositorio**, por lo que deberás instalarlas manualmente.
- `package-lock.json`: Archivo que asegura que las dependencias se instalen exactamente como se especifican.
- `package.json`: Archivo que define las dependencias y scripts del proyecto.
- `server.js`: Archivo principal del servidor backend.

## Requisitos del Sistema

- [Node.js](https://nodejs.org/) (Versión 18 o superior)
- [npm](https://www.npmjs.com/) (Incluido con Node.js)

## Pasos para Ejecutar el Proyecto

### 1. Clona el Repositorio

Para clonar el repositorio, ejecuta el siguiente comando en tu terminal:

```bash
git clone https://github.com/raftxo/20260714-backend-peliculas.git
```

### 2. Accede al Directorio del Proyecto

Una vez clonado, entra en la carpeta del proyecto:

```bash
cd 20260714-backend-peliculas
```

### 3. Instala las Dependencias

Ejecuta el siguiente comando para instalar todas las dependencias necesarias:

```bash
npm install
```

### 4. Ejecuta el Servidor

Una vez instaladas las dependencias, puedes iniciar el servidor con el siguiente comando:

```bash
npm start
```

Esto iniciará el servidor en el puerto predeterminado (generalmente el 3000). Puedes verificar la ejecución del servidor en el navegador accediendo a:

```
http://localhost:3000
```

## Notas Adicionales

- Por el momento el proyecto no usa ninguna base de datos.
- En la carpeta del proyecto tienes que crear archivo `.env` y configurarlo con tu propia API key.

¡Esperamos que disfrutes trabajando en este proyecto! Si tienes alguna pregunta o necesitas ayuda adicional, no dudes en preguntar al profesor Jorge.