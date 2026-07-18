//Importamos la función de sanitización creada.
//Esto significa que antes de mostrar el título o la descripción, el componente limpia el texto para evitar: carácteres raros, HTML no deseado o posibles intentos de inyección.
import { sanitizeText } from "../utils/sanitize";

// Creamos la función que recibe tres props
//1.course → objeto con los datos del curso (título, descripción, teacherId, etc.).
//2.isFavorite → booleano que indica si el curso está marcado como favorito.
//3.onToggleFavorite → función que se ejecuta cuando el usuario hace clic en el botón.
const CourseCard = ({ course, isFavorite, onToggleFavorite }) => {


    // Sanitizamos el titulo y la descripción.
    //Esto genera versiones seguras del texto antes de rederizarlo.
    const safeTitle = sanitizeText(course.title);
    const safeDescription = sanitizeText(course.description);

    return (

        // Renderizamos la tarjeta del cruso, permitiendo darle estilo con CSS.
        <article className="course-card">

            {/* Mostramos el título */}
            <h2>{safeTitle}</h2>

            {/* Mostramos la descripçión */}
            <p>{safeDescription}</p>

            {/* Mostramos el ID del Docente  */}
            <small>Docente ID: {course.teacherId}  </small>

            {/* Botón para agregar y quitar favoritos */}
            {/* onClick ejecuta onToggleFavorite(course) y envía el curso completo al componente padre. */}
            {/*className cambia dinámicamente:
                -"btn favorite" si el curso ya es favorito.
                -"btn" si no lo es 
            */}
            {/* El texto del botón también cambia según isFavorite */}
            <button
                type="button"
                onClick={() => onToggleFavorite(course)}
                className={isFavorite ? "btn favorite" : "btn"}
            >
                {isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
            </button>    
        </article>
    );
};

export default CourseCard;