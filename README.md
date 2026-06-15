# 💻 Ejercicios Bootcamp Serprofes – Full Stack Web Development

Repositorio de ejercicios realizados durante el bootcamp **Serprofes** enfocado en **FRONT-END & BACK-END WEB DEVELOPMENT**.

## 🚀 Tecnologías trabajadas
- HTML5
- CSS3 (Flexbox & Grid)
- JavaScript
- Node.js (en progreso)

Este repositorio contiene prácticas, retos y pequeños proyectos diseñados para reforzar conceptos clave del desarrollo web moderno, tanto en cliente como en servidor.

---

## 📂 Contenido
Aquí encontrarás:
- Ejercicios básicos y avanzados de maquetación
- Prácticas interactivas con JavaScript
- Retos de lógica de programación
- Próximamente: proyectos y ejercicios con Node.js 🚀

---

## 📌 Recursos útiles
- https://thumbnail.ws/ → Captura la portada de tu web  
- https://flexboxfroggy.com/#es → Practica Flexbox jugando  
- https://cssgridgarden.com/#es → Practica CSS Grid jugando  
- https://excalidraw.com/ → Pizarra online para esquemas  
- https://miro.com → Diagramas de flujo  

---

<details>
<summary>📜 Contenido anterior del README</summary>

Proyectos del curso de desarrollador web full stack...  

- https://the-silent-pulse.com/serprofes/20260427/reto/index.html

- https://thumbnail.ws/ Captura la portada de tu web...  
- https://flexboxfroggy.com/#es  Practica flexbox css jugando
- https://cssgridgarden.com/#es  Practica grid css jugando

--- 

<details>
<summary>Recursos gráficos trenes...</summary>  

- https://www.freepik.com/vectors/train-side-view  
- https://www.vecteezy.com/free-vector/train-side-view

</details>

<details>
<summary>Finite State Machine of a Cat:</summary>

```mermaid
flowchart TD
    Sleep[Sleep]
    Wake{Awake?}

    Sleep --> Wake

    Wake -->|NO| Sleep
    Wake -->|Hungry| Snack[Get treat]
    Wake -->|Human is typing| ...
    ... --> Keyboard[Sleep on keyboard]
    Wake -->|Not in sun?| Move[Move to sun]

    Snack --> Sleep
    Move --> Sleep
    Keyboard --> Sleep

Proyectos del curso de desarrollador web full stack...  

- https://the-silent-pulse.com/serprofes/20260427/reto/index.html



- https://thumbnail.ws/ Captura la portada de tu web...  
- https://flexboxfroggy.com/#es  Practica flexbox css jugando
- https://cssgridgarden.com/#es  Practica grid css jugando

--- 

<details>
<summary>Recursos gráficos trenes...  </summary>  

- https://www.freepik.com/vectors/train-side-view  

- https://www.vecteezy.com/free-vector/train-side-view
</details>

---  

<details>
<summary>Spoiler ahead...</summary>
- Arrancas desde el USB de Windows y eliges "Reparar el equipo" > "Símbolo del sistema".

- Sustituyes el ejecutable del gestor de utilidades por la consola:
copy c:\windows\system32\sethc.exe c:\
copy /y c:\windows\system32\cmd.exe c:\windows\system32\sethc.exe

- Reinicias Windows normalmente. En la pantalla de login, presionas Shift 5 veces.

- Se abrirá una consola con privilegios de SYSTEM. Solo tienes que teclear:
net user [nombre_usuario] [nueva_contraseña]
</details>  

---  
https://excalidraw.com/ - pizarra online, muy útil para explicar cosas en clase  
https://miro.com - diagramas de flujo online  

---  

Finite State Machine of a Cat:
```mermaid
flowchart TD
    Sleep[Sleep]
    Wake{Awake?}

    Sleep --> Wake

    Wake -->|NO| Sleep
    Wake -->|Hungry| Snack[Get treat]
    Wake -->|Human is typing| ...
    ... --> Keyboard[Sleep on keyboard]
    Wake -->|Not in sun?| Move[Move to sun]
    

    Snack --> Sleep
    Move --> Sleep
    Keyboard --> Sleep
