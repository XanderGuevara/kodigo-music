import { useState } from 'react';
import { Link } from 'react-router-dom';
import SongCard from '../components/SongCard.jsx';

export default function Home({
  canciones,
  cancionActual,
  estaReproduciendo,
  onReproducir,
  onToggleFavorita,
  onEliminar,
}) {
  const [busqueda, setBusqueda] = useState('');
  const [generoActivo, setGeneroActivo] = useState('Todos');

  const generos = ['Todos', ...new Set(canciones.map((c) => c.genero))];

  const cancionesFiltradas = canciones.filter((c) => {
    const termino = busqueda.toLowerCase().trim();
    const coincideTexto =
      c.titulo.toLowerCase().includes(termino) ||
      c.artista.toLowerCase().includes(termino) ||
      c.genero.toLowerCase().includes(termino);
    const coincideGenero =
      generoActivo === 'Todos' || c.genero === generoActivo;

    return coincideTexto && coincideGenero;
  });

  return (
    <>
      {/* Banner Hero con efecto Parallax */}
      <section className="hero-parallax" aria-label="Bienvenida a Kodigo Music">
        <article className="container hero-content">
          <span className="hero-pill">✨ Colección Destacada</span>
          <h1 className="hero-title">Siente el ritmo sin límites</h1>
          <p className="hero-text">
            Del rock clásico y el country legendario a los sonidos modernos.
            Explora, guarda tus favoritas y arma tu propio catálogo.
          </p>
          <footer className="hero-actions">
            <a href="#catalogo" className="btn btn-primary">
              Explorar catálogo ({canciones.length})
            </a>
            <Link to="/agregar" className="btn btn-glass">
              + Subir canción
            </Link>
          </footer>
        </article>
      </section>

      <section id="catalogo" className="container page-section">
        <header className="page-header">
          <hgroup>
            <h2 className="page-title">Explorar música</h2>
            <p className="page-subtitle">
              Mostrando {cancionesFiltradas.length} de {canciones.length} pistas
            </p>
          </hgroup>

          <form
            role="search"
            className="search-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="search"
              className="input-control"
              placeholder="Buscar por título, artista o género..."
              aria-label="Buscar canciones"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </form>
        </header>

        {/* Filtros rápidos por género */}
        <nav aria-label="Filtrar por género" className="genre-nav">
          <ul className="genre-list">
            {generos.map((genero) => (
              <li key={genero}>
                <button
                  type="button"
                  className={`genre-pill ${
                    generoActivo === genero ? 'is-active' : ''
                  }`}
                  onClick={() => setGeneroActivo(genero)}
                >
                  {genero}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {cancionesFiltradas.length === 0 ? (
          <article className="empty-state">
            <p>No se encontraron canciones con ese filtro.</p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setBusqueda('');
                setGeneroActivo('Todos');
              }}
            >
              Ver todas las canciones
            </button>
          </article>
        ) : (
          <ul className="songs-grid">
            {cancionesFiltradas.map((cancion) => (
              <li key={cancion.id}>
                <SongCard
                  cancion={cancion}
                  esActual={cancionActual?.id === cancion.id}
                  estaReproduciendo={estaReproduciendo}
                  onReproducir={onReproducir}
                  onToggleFavorita={onToggleFavorita}
                  onEliminar={onEliminar}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
