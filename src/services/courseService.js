// Importamos la librería Axios, para poder hacer las peticiones HTTP necesarias, como GET, POST, entre otras, a APIs.
import axios from "axios";

// Creamos la variable constante que contendrá la URL de la API. Esta es la dirección desde donde vamos a obtener los datos. 
// jsonplaceholder.typicode.com -> Es una API falsa para practicar en esta APP.
const API_URL = "https://jsonplaceholder.typicode.com/posts"


//Declaramos la función asíncrona y le damos el nombre de getCourses.
//Al ser una función asíncrona, significa que puede esperar respuestas de internet sin bloquear el programa.
export const getCourses = async () => {
    try {

        // Hacemos una petición GET a la API.
        // Aquí Axios, la librería que se importó, accede a la URL y trae los datos.
        // "await" significa -> Espera a que la API responda.
        // Luego los datos se guardan en la variable constante que creamos con el nombre "response".
        const response = await axios.get(API_URL);


        //Tranformación de los datos recibidos.
        // "response.data" -> contiene un arreglo de objetos(posts).
        // "map()" Recorre cada objeto y crea uno nuevo con las pripiedades que se definieron.
        return response.data.map((item) => ({
            id: item.id,
            title: item.title,
            description: item.body,
            teacheId: item.userId,
        }));

      // Manejo de errores.
      //Si Axios lanza un error, nuestra función "getCourses" entra al "catch" y:
      // 1. Muestra el error en la consola del navegador.
      // 2. Lanza un nuevo error con un mensaje más amigable para el usuario.  
    } catch (error) {
        console.error("Error al obtener los cursos:", error);
        throw new Error("No fue posible cargar los cursos.");
    }
};

