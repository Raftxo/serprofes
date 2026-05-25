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
