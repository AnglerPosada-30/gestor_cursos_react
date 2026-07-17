
import {useState, useEffect} from "react";

//Este hook personalizado nos permite guardar y sincronizar un estado de React con localStorage, de manera automática y segura.

export const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        try {

            //Se inicia el estado leyendo desde localStorage.
            //1.Busca un valor guardado bajo la clave "key".
            //2. Si existe, lo convierte desde JSON a su valor original.
            //3. Si no existe, usa "initialValue".

            //Esto nos permite que el estado sobreviva a recargas de páginas.
            const storedValue = localStorage.getItem(key);
            return storedValue ? JSON.parse(storedValue) : initialValue;

          //Si localStorage está bloqueado, corrupto o inaccesible (algo que pasa en modo incógnito), el hook no explota y devuelve el valor inicial.  
        } catch (error) {
            console.error("Error leyendo localStorage", error);
            return initialValue;
        }
    });

    //Guardamos automáticamente el estado cada vez que cambia.
    //Cada vez que el "value" cambia, el hook:
    //1.Convierte el valor a JSON.
    //2.lo guarda en localStorage bajo la clave "key"

    //Esto nos permite mantener sincronizado el estado de React con localStorage, asegurando que los cambios se persistan entre recargas de página y sesiones del navegador.

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("Error guardando en localStorage", error);
        }
    }, [key, value]);

    //Devolvemos el estado y su setter
    //Funciona igual que "useState", pero con persistencia.
    return [value, setValue];
};


/**
 * 
 *  Hook personalizado: useLocalStorage
 * 
 *
 * Este hook permite sincronizar un estado de React con
 * localStorage de forma automática. Su objetivo es mantener
 * valores persistentes incluso después de recargar la página,
 * proporcionando una experiencia más consistente para el usuario.
 *
 * Funcionamiento:
 *   - Al inicializar el estado, intenta leer el valor asociado
 *     a la clave proporcionada. Si existe, lo parsea desde JSON;
 *     si no, utiliza el valor inicial definido por el componente.
 *
 *   - Cada vez que el estado cambia, el hook actualiza
 *     localStorage serializando el valor mediante JSON.stringify.
 *     Esto asegura que el estado y el almacenamiento permanezcan
 *     sincronizados.
 *
 * Manejo de errores:
 *   - Si localStorage no está disponible (por ejemplo, en modo
 *     incógnito o por restricciones del navegador), el hook
 *     captura la excepción y evita que la aplicación falle,
 *     devolviendo siempre un valor seguro.
 *
 * Buenas prácticas:
 *   - Los valores almacenados deben ser serializables.
 *   - Evitar guardar información sensible en localStorage.
 *   - Usar este hook para preferencias, configuraciones o datos
 *     simples que necesiten persistencia entre sesiones.
 *
 * En resumen, useLocalStorage es una solución ligera y segura
 * para manejar persistencia de estado en aplicaciones React,
 * manteniendo una API idéntica a useState y añadiendo
 * almacenamiento automático.
 */
