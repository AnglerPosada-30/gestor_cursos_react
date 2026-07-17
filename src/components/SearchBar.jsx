// Componente funcional que representa una barra de búsqueda. Recibe dos props: 
// 1. SearchTerm el término de búsqueda actual 
// 2. OnSearchChange una función que se llama cuando el valor del input cambia. 
// Renderiza un input de texto con un label y un placeholder, y limita la longitud máxima del texto a 50 caracteres.
const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (

    //Lo preparamos para que se pueda estilizar con CSS, agregando una clase "search-container" al div que contiene el label y el input.
    <div className="search-container">

        // Agregamos un label para el input, lo que muestra "buscar curso:" sobre el campo de búsqueda.
        <label htmlFor="search-input">Buscar curso:</label>
        <input
          id="search"
          type="text"

          //Se muestra el valor que viene desde el estado del componente padre.
          value={searchTerm}

          //Cada vez que el usuario escribe, se ejecuta onSearchChange y se envía el nuevo texto.
          //Esto permite actualizar el estado en el componente padre.
          onChange={ (event) => onSearchChange(event.target.value) }
          
          //Muestra un texto guía cuando el input está vacío.
          placeholder="Ejemplo: React, programación, seguridad..."

          //Limitamos la longitud máxima del texto que se puede ingresar a 50 caracteres.
          maxLength={50}
        />
    </div>
  );
};

export default SearchBar;