// Importo los hooks de React y los componentes que voy a usar en la aplicación
import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CourseList from "./components/CourseList";


// Desafío 4: Comentamos axios y usamos nuestra versión con fetch
// import { getCourses } from "./services/courseService";
import { getCoursesWithFetch as getCourses } from "./services/courseServiceFetch";

// Hook personalizado para guardar datos en localStorage de forma persistente
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {

  // Estado con la lista completa de cursos obtenidos desde la API
  const [courses, setCourses] = useState([]);

  // Estado para manejar el texto que el usuario escribe en la barra de búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  // Estado persistente para almacenar los cursos marcados como favoritos
  const [favorites, setFavorites] = useLocalStorage("favoriteCourses", []);
  
  // Estado persistente para recordar si el usuario activó el modo oscuro
  const [isDarkMode, setIsDarkMode] = useLocalStorage("darkMode", false);
  
  // Estado para guardar el docente seleccionado en el filtro
  const [selectedTeacher, setSelectedTeacher] = useState("");

  // Estados para manejar la carga inicial y posibles errores de la API
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Función que obtiene los cursos desde la API y actualiza los estados correspondientes
  const loadCourses = async () => {
    try {
      setLoading(true);      // Activo el estado de carga
      setError("");          // Limpio errores previos
      const data = await getCourses();  // Llamo a mi servicio con fetch
      setCourses(data);      // Guardo los cursos en el estado
    } catch (error) {
      setError(error.message || "Ocurrió un error inesperado."); // Muestro error si algo falla
    } finally {
      setLoading(false);     // Desactivo el estado de carga
    }
  };

  // Cargo los cursos automáticamente cuando la app se monta por primera vez
  useEffect(() => {
    loadCourses();
  }, []);

  // Obtengo los IDs únicos de docentes para llenar el menú select del filtro
  const uniqueTeachers = useMemo(() => {
    const teachers = courses.map(course => course.teacherId);
    return [...new Set(teachers)]; // Elimino duplicados usando Set
  }, [courses]);

  // Aplico el filtro combinado: texto de búsqueda + docente seleccionado
  const filteredCourses = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase().trim();
    return courses.filter((course) => {
      const matchesText = course.title.toLowerCase().includes(normalizedSearch);
      const matchesTeacher = selectedTeacher === "" || course.teacherId.toString() === selectedTeacher;
      return matchesText && matchesTeacher; // Solo muestro cursos que cumplen ambos filtros
    });
  }, [courses, searchTerm, selectedTeacher]);

  // Agrupo los favoritos por docente y cuento cuántos tiene cada uno
  const favoritesPerTeacher = useMemo(() => {
    return favorites.reduce((acc, course) => {
      acc[course.teacherId] = (acc[course.teacherId] || 0) + 1;
      return acc;
    }, {});
  }, [favorites]);

  // Alterno el estado de favorito: si ya existe lo quito, si no existe lo agrego
  const handleToggleFavorite = (course) => {
    const exists = favorites.some((fav) => fav.id === course.id);
    if (exists) {
      const updatedFavorites = favorites.filter((fav) => fav.id !== course.id);
      setFavorites(updatedFavorites);
      return;
    }
    setFavorites([...favorites, course]);
  };

  return (
    // Aplico la clase de modo oscuro dinámicamente según el estado guardado
    <main className={`app ${isDarkMode ? "dark-mode" : ""}`}>
      <Header />
      
      {/* Botón para activar o desactivar el modo oscuro */}
      <div style={{ marginBottom: "20px" }}>
        <button 
          className="btn" 
          onClick={() => setIsDarkMode(!isDarkMode)}
          style={{ width: "auto", padding: "10px 20px" }}
        >
          {isDarkMode ? "☀️ Cambiar a Modo Claro" : "🌙 Cambiar a Modo Oscuro"}
        </button>
      </div>

      {/* Resumen general de cursos y favoritos */}
      <section className="summary">
        <p>Total de cursos: {courses.length}</p>
        <p>Favoritos totales: {favorites.length}</p>
      </section>

      {/* Muestro cuántos favoritos tiene cada docente */}
      {favorites.length > 0 && (
        <section className="summary" style={{ flexWrap: "wrap" }}>
          <span style={{ fontWeight: "bold", width: "100%", marginBottom: "8px" }}>
            Favoritos por Docente:
          </span>
          {Object.entries(favoritesPerTeacher).map(([teacherId, count]) => (
            <p key={teacherId} style={{ margin: 0, padding: "8px 12px", background: isDarkMode ? "#374151" : "#e2e8f0" }}>
              Docente {teacherId}: <strong>{count}</strong>
            </p>
          ))}
        </section>
      )}

      {/* Barra de búsqueda por texto */}
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {/* Filtro por docente usando un menú select */}
      <div className="search-container" style={{ marginTop: "-10px" }}>
        <label htmlFor="teacherFilter">Filtrar por docente:</label>
        <select 
          id="teacherFilter"
          value={selectedTeacher}
          onChange={(e) => setSelectedTeacher(e.target.value)}
          style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "16px" }}
        >
          <option value="">Todos los docentes</option>
          {uniqueTeachers.map(id => (
            <option key={id} value={id}>Docente {id}</option>
          ))}
        </select>
      </div>

      {/* Mensajes de carga y error */}
      {loading && <p className="message">Cargando cursos...</p>}
      
      {error && (
        <div className="error">
          <p>{error}</p>
          <button type="button" onClick={loadCourses}>
            Reintentar
          </button>
        </div>
      )}

      {/* Renderizo la lista de cursos filtrados */}
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
