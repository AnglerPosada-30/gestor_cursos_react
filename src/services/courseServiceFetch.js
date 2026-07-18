//Creamos la función que contiene la dirección de donde se obtendran los datos.
const API_URL = "https://jsonplaceholder.typicode.com/posts";

// Declaramos la función asíncrona
//Como la función es asíncrona, nos permite usar "await" para esperar la respuesta de la API sin bloquear el programa.
export const getCoursesWithFetch = async () => {
  try {

    // "fetch()" va a la URL y trae la respuesta 
    // El resultado de la búsqueda queda guardado en la variable constante "response"
    const response = await fetch(API_URL);
    

    // Verificamos que la respuesta fue exitosa. 
    // "response.ok" es TRUE si el servidor respondió con un código entre 200 y 299.
    // De lo contrario, lanza un error manualmente.

    //Cabe destacar que esto es muy importante porque "fetch" no lanza errores automáticamente cuando la API responde con 404 o 500.
    if (!response.ok) {
      throw new Error("Error al consumir la API.");
    }
    
    // Transformamos la respuesta a formato JSON  
    const data = await response.json();
    
    // Mapeamos los datos para crear los cursos 
    //La API devuelve objetos con la siguiente estructura:
    //-userId.
    //-id.
    //-title.
    //-body.

    //Se transforman en:
    //-id.
    //-title.
    //-description(usando body).
    //-teacheId(usando userId).

    //Con esto creamos un nuevo arreglo necesario para la aplicación.
    return data.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.body,
      teacherId: item.userId,
    }));

    //Captura de errores.
    //Si algo falla: se muestra en consola, se lanza un nuevo error para que el componente que llame a esta función pueda manejarlo.
  } catch (error) {
    console.error("Error al obtener los cursos con fetch:", error);
    throw new Error("No fue posible cargar los cursos.");
  }
};

/* 
 * Nota sobre el Desafío 4:
 * Se utiliza "fetch" en lugar de Axios porque es una API nativa del navegador 
 * y de Node.js moderno, lo que permite realizar peticiones HTTP sin depender 
 * de librerías externas. Esto hace el código más ligero, estándar y fácil de 
 * mantener, manteniendo la misma funcionalidad que Axios.
 */