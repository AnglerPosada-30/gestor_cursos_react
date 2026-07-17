// Creación de la función sanitizeText que recibe un texto y lo sanitiza para evitar inyecciones de código malicioso.

export const sanitizeText = (text) => {

    // Verificación de que el texto sea una cadena de caracteres, si no lo es, se retorna una cadena vacía.
    if (typeof text !== 'string') return "";

    return text
        // Reemplazo de los caracteres "<" y ">" por sus entidades HTML correspondientes para evitar la ejecución de código malicioso.
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        // Eliminación de espacios en blanco al inicio y al final del texto.
        .trim();

};


// Con esta función:
//1. Nos aseguramos que el valor recibido sea texto.
//2. Convertimos los caracteres especiales "<" y ">" en versiones seguras.
//3. Eliminamos los espacios en blanco al inicio y al final del texto.
//4. Retornamos el texto sanitizado, listo para ser usado en la aplicación sin riesgo de inyecciones de código malicioso.


/**
 * 
 *  Buenas prácticas sobre sanitización y uso de HTML en React
 * 
 *
 * La sanitización de texto es una medida esencial para evitar
 * vulnerabilidades de seguridad, especialmente ataques XSS
 * (Cross-Site Scripting). Cualquier contenido que provenga de
 * usuarios, formularios, APIs externas o fuentes no confiables
 * debe ser limpiado antes de insertarse en la interfaz.
 *
 * React, por defecto, protege el DOM escapando caracteres
 * peligrosos y evitando la ejecución de scripts. Sin embargo,
 * estas protecciones se desactivan cuando se utiliza
 * `dangerouslySetInnerHTML`, ya que este método inserta HTML
 * crudo directamente en el DOM sin validación. Por este motivo,
 * su uso debe considerarse una excepción y no una práctica
 * habitual.
 *
 * Buena práctica:
 *   - Evitar `dangerouslySetInnerHTML` salvo que sea estrictamente
 *     necesario y no exista una alternativa basada en JSX.
 *   - En caso de usarlo, sanitizar siempre el contenido antes de
 *     insertarlo, utilizando funciones que escapen caracteres,
 *     eliminen etiquetas peligrosas y reduzcan el riesgo de
 *     ejecución de código malicioso.
 *
 * En resumen, la sanitización es una capa de seguridad que
 * complementa las protecciones de React y ayuda a mantener la
 * aplicación estable, segura y resistente frente a entradas
 * inesperadas o maliciosas.
 */
