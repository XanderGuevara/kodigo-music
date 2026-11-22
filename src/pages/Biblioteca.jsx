import { Link } from 'react-router-dom';
import SongCard from '../components/SongCard.jsx';

export default function Biblioteca({
  canciones,
  cancionActual,
  estaReproduciendo,
  onReproducir,
  onToggleFavorita,
  onEliminar,
}) {
  const favoritas = canciones.filter((c) => c.favorita);

  return (
    <section className="container page-section">
      <header className="page-header">
        <hgroup>
          <h1 className="page-title">Tu Biblioteca</h1>
          <p className="page-subtitle">
            Canciones marcadas con ♥ ({favoritas.length})
          </p>
        </hgroup>
      </header>

      {favoritas.length === 0 ? (
        <article className="empty-state">
          <p>Aún no tienes canciones en tu biblioteca de favoritas.</p>
          <Link to="/" className="btn btn-primary">
            Ir a explorar canciones
          </Link>
        </article>
      ) : (
        <ul className="songs-grid">
          {favoritas.map((cancion) => (
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
  );
}
