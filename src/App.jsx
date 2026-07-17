import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CourseList from "./components/CourseList";
import { getCourses } from "./services/courseService";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  // Estado donde guardo todos los cursos que vienen desde la API
  const [courses, setCourses] = useState([]);

  // Estado para manejar el texto que el usuario escribe en la barra de búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  // Estado para manejar los favoritos, pero guardados en localStorage
  const [favorites, setFavorites] = useLocalStorage("favoriteCourses", []);

  // Estado para mostrar un mensaje de carga mientras llegan los cursos
  const [loading, setLoading] = useState(true);

  // Estado para mostrar errores si la API falla
  const [error, setError] = useState("");

  // Función que carga los cursos desde el servicio
  const loadCourses = async () => {
    try {
      setLoading(true);   // Activo el estado de carga
      setError("");       // Limpio errores previos

      const data = await getCourses(); // Llamo a la API
      setCourses(data);                // Guardo los cursos en el estado
    } catch (error) {
      // Si algo falla, muestro un mensaje de error
      setError(error.message || "Ocurrió un error inesperado.");
    } finally {
      // Siempre desactivo la carga, pase lo que pase
      setLoading(false);
    }
  };

  // useEffect para cargar los cursos solo una vez al iniciar la app
  useEffect(() => {
    loadCourses();
  }, []);

  // Filtro los cursos según lo que el usuario escribe en la barra de búsqueda
  const filteredCourses = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase().trim();

    // Devuelvo solo los cursos cuyo título coincide con la búsqueda
    return courses.filter((course) =>
      course.title.toLowerCase().includes(normalizedSearch)
    );
  }, [courses, searchTerm]);

  // Función para agregar o quitar un curso de favoritos
  const handleToggleFavorite = (course) => {
    // Verifico si el curso ya está en favoritos
    const exists = favorites.some((fav) => fav.id === course.id);

    if (exists) {
      // Si ya existe, lo elimino de favoritos
      const updatedFavorites = favorites.filter((fav) => fav.id !== course.id);
      setFavorites(updatedFavorites);
      return;
    }

    // Si no existe, lo agrego
    setFavorites([...favorites, course]);
  };

  return (
    <main className="app">
      {/* Encabezado principal */}
      <Header />

      {/* Resumen de cursos y favoritos */}
      <section className="summary">
        <p>Total de cursos: {courses.length}</p>
        <p>Favoritos: {favorites.length}</p>
      </section>

      {/* Barra de búsqueda */}
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {/* Mensaje mientras se cargan los cursos */}
      {loading && <p className="message">Cargando cursos...</p>}

      {/* Mensaje de error si la API falla */}
      {error && (
        <div className="error">
          <p>{error}</p>
          <button type="button" onClick={loadCourses}>
            Reintentar
          </button>
        </div>
      )}

      {/* Lista de cursos filtrados, solo si no hay error ni carga */}
      {!loading && !error && (
        <CourseList
          courses={filteredCourses}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
    </main>
  );
}

export default App;
