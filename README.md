# Gestor de Cursos React - Proyecto Final Front End

¡Hola! Este es mi proyecto final para la asignatura de Front End. Es una Single Page Application (SPA) desarrollada en React que funciona como un gestor de cursos. El objetivo principal fue construir una aplicación rápida, segura y que cumpla con buenas prácticas de desarrollo.

## 🚀 ¿Qué hace esta aplicación?

La aplicación se conecta a una API externa para simular un catálogo de cursos. Permite buscar, filtrar y guardar tus cursos favoritos para que no los pierdas aunque recargues la página.

**Características principales:**

- **Consumo de API REST:** Trae los datos de los cursos de forma asíncrona. Además de `axios`, implementé una versión con `fetch` nativo como desafío extra.
- **Buscador en tiempo real:** Filtra los cursos por nombre mientras escribes.
- **Filtro por docente:** Agregué un `<select>` para ver los cursos que imparte un profesor en específico.
- **Sistema de Favoritos persistente:** Puedes marcar o desmarcar cursos, y estos se guardan en el `localStorage` del navegador.
- **Contador dinámico:** Muestra el total de cursos, el total de favoritos, y un conteo específico de cuántos favoritos tiene cada docente.
- **Modo Oscuro (Dark Mode):** Implementé un botón para alternar el tema visual, cuya preferencia también queda guardada en el `localStorage`.

## 🛠️ Tecnologías y Herramientas utilizadas

- **React + Vite:** Para levantar el proyecto de forma rápida y optimizada.
- **JavaScript (ES6+):** Uso de `async/await`, `reduce()`, `.map()`, `.filter()`, etc.
- **CSS3:** Estilos completamente personalizados, incluyendo el soporte para el modo oscuro.
- **Axios & Fetch:** Para las peticiones HTTP.
- **Docker & SonarQube:** Para el análisis estático de calidad de código y seguridad (cero bugs, cero vulnerabilidades).

## 🛡️ Seguridad aplicada

El proyecto sigue estándares básicos de OWASP para SPAs:

- No se guarda información sensible en `localStorage`.
- Las entradas del buscador están validadas y limitadas (`maxLength`).
- No se utiliza `dangerouslySetInnerHTML`. Todo texto que viene de la API pasa por una función propia de sanitización para prevenir ataques XSS.

## 💻 ¿Cómo ejecutar este proyecto localmente?

Si quieres clonar este repositorio y probarlo en tu máquina, sigue estos pasos:

1. **Clona el repositorio y entra a la carpeta:**
   ```bash
   git clone https://github.com/AnglerPosada-30/gestor_cursos_react.git
   cd gestor-cursos-react
   ```
