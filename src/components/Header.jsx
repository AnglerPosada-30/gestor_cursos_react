const Header = () => {
  return (
    <header className="header">
      <h1>Gestor de Cursos React</h1>
      <p>SPA con API, LocalStorage, componentes y buenas prácticas de
seguridad.</p>
    </header>
  );
};

export default Header;

/**
 * 
 *  Componente Header
 * 
 *
 * Este componente representa la cabecera principal de la
 * aplicación. Su función es únicamente presentacional: muestra
 * el título del proyecto y una breve descripción de las
 * tecnologías y buenas prácticas utilizadas.
 *
 * Características:
 *   - No utiliza estado ni efectos; es un componente estático.
 *   - Se limita a renderizar contenido semántico dentro de un
 *     elemento <header>, lo que mejora la estructura del DOM.
 *   - La clase "header" permite aplicar estilos desde CSS o
 *     frameworks como Tailwind.
 *
 * Buenas prácticas:
 *   - Mantener los componentes presentacionales simples y
 *     separados de la lógica de negocio.
 *   - Utilizar etiquetas semánticas (<header>, <h1>, <p>) para
 *     mejorar accesibilidad y SEO.
 *
 * En resumen, este componente define la identidad visual del
 * módulo y sirve como punto de entrada para la interfaz del
 * gestor de cursos.
 */
