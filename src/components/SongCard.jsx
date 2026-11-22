export default function SongCard({
  cancion,
  esActual,
  estaReproduciendo,
  onReproducir,
  onToggleFavorita,
  onEliminar,
}) {
  return (
    <article className="song-card">
      <figure>
        <img
          src={cancion.portada}
          alt={`Portada de ${cancion.titulo}`}
          className="song-cover"
        />
      </figure>

      <section className="song-body">
        <header className="song-top">
          <h3 className="song-title" title={cancion.titulo}>
            {cancion.titulo}
          </h3>
          <time className="song-duration">{cancion.duracion}</time>
        </header>

        <p className="song-artist">{cancion.artista}</p>
        <p className="song-meta">
          {cancion.album} · {cancion.genero}
        </p>

        <footer className="song-actions">
          <button
            type="button"
            className={`btn btn-play ${
              esActual && estaReproduciendo ? 'btn-warning' : 'btn-primary'
            }`}
            onClick={() => onReproducir(cancion)}
          >
            {esActual && estaReproduciendo ? '⏸ Pausar' : '▶ Reproducir'}
          </button>

          <button
            type="button"
            className={`btn ${cancion.favorita ? 'btn-danger' : 'btn-outline'}`}
            onClick={() => onToggleFavorita(cancion.id)}
            aria-label="Marcar como favorita"
          >
            {cancion.favorita ? '♥' : '♡'}
          </button>

          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => onEliminar(cancion.id)}
            aria-label="Eliminar canción"
          >
            🗑
          </button>
        </footer>
      </section>
    </article>
  );
}
