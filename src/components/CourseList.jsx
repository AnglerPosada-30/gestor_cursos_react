//Importamos el componente hijo.
//CourseList usa CourseCard para renderizar cada curso.
import CourseCard from "./CourseCard";

// Esta función también recibe tres props.
//-courses → array de cursos que se van a mostrar.
//-favorites → array con los cursos marcados como favoritos.
//-onToggleFavorite → función que se ejecuta cuando el usuario marca o desmarca un curso.
const CourseList = ({ courses, favorites, onToggleFavorite}) => {
    
    // Evitamos renderizar listas vacías y se le da un feedback al ususario
    if (courses.length === 0) {
        return <p className="message">No se encontraron cursos.</p>

    }

    return (
        // Contenedor estilizado con CSS 
        <section className="course-list">

            {/* Se itera sobre los cursos */}
            {/* Por cada curso se crea un CourseCard */}
            {courses.map((course) => {
                
                // Determinamos si el cruso es favorito
                //-favorites.some(...) revisa si el curso actual está dentro de la lista de favoritos.
                //-Si lo encuentra, isFavorite será true.
                //-Si no, será false.
                //Esto permite que el botón del CourseCard cambie dinámicamente.
                const isFavorite = favorites.some((fav) => fav.id === course.id);

                return (

                    // Renderizamos el componente hijo
                    //Se envían: El curso completo, si es favorito, la función para agregar/quitar favorito.
                    <CourseCard
                        key={course.id}
                        course={course}
                        isFavorite={isFavorite}
                        onToggleFavorite={onToggleFavorite}
                    />
                );
            })}
        </section>
        
    );
};

export default CourseList;