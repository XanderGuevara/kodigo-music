import { useState, useEffect, useRef } from 'react';

export default function PlayerBar({
  cancionActual,
  estaReproduciendo,
  onTogglePlay,
}) {
  const audioRef = useRef(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [cargando, setCargando] = useState(Boolean(cancionActual));
  const [sinPreview, setSinPreview] = useState(false);
  const [progreso, setProgreso] = useState(0);

  useEffect(() => {
    if (!cancionActual) return;

    let cancelado = false;
    const buscarPreview = async () => {
      try {
        const consulta = encodeURIComponent(
          `${cancionActual.titulo} ${cancionActual.artista}`
        );
        const respuesta = await fetch(
          `https://itunes.apple.com/search?term=${consulta}&media=music&entity=song&limit=1`
        );
        const datos = await respuesta.json();
        const url = datos.results?.[0]?.previewUrl || null;

        if (!cancelado) {
          if (url) {
            setAudioUrl(url);
          } else {
            setSinPreview(true);
          }
          setCargando(false);
        }
      } catch {
        if (!cancelado) {
          setSinPreview(true);
          setCargando(false);
        }
      }
    };

    buscarPreview();

    return () => {
      cancelado = true;
    };
  }, [cancionActual]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioUrl) return;

    if (estaReproduciendo) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [audioUrl, estaReproduciendo]);

  const manejarProgreso = () => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    setProgreso((audio.currentTime / audio.duration) * 100);
  };

  if (!cancionActual) return null;

  return (
    <aside className="player-bar" aria-label="Reproductor actual">
      <section className="container player-inner">
        <figure className="player-info">
          <img
            src={cancionActual.portada}
            alt={cancionActual.titulo}
            className="player-thumb"
          />
          <figcaption className="player-text">
            <p className="player-title">{cancionActual.titulo}</p>
            <p className="player-artist">
              {cancionActual.artista} ·{' '}
              {cargando ? (
                <span>Cargando audio...</span>
              ) : sinPreview ? (
                <span>Sin vista previa disponible</span>
              ) : (
                <time>Vista previa 30s</time>
              )}
            </p>
            <progress
              className="player-progress"
              value={progreso}
              max="100"
              aria-label="Progreso de reproducción"
            />
          </figcaption>
        </figure>

        <button
          type="button"
          className="btn btn-primary"
          onClick={onTogglePlay}
          disabled={cargando || sinPreview}
        >
          {cargando
            ? '⏳ Cargando'
            : estaReproduciendo
            ? '⏸ Pausar'
            : '▶ Reanudar'}
        </button>

        <audio
          ref={audioRef}
          src={audioUrl || undefined}
          onTimeUpdate={manejarProgreso}
          onEnded={() => {
            if (estaReproduciendo) onTogglePlay();
          }}
        />
      </section>
    </aside>
  );
}
