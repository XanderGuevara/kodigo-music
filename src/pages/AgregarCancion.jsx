import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AgregarCancion({ onAgregar }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    titulo: '',
    artista: '',
    album: '',
    genero: '',
    duracion: '',
  });
  const [errores, setErrores] = useState({});

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validar = () => {
    const nuevosErrores = {};
    if (!form.titulo.trim()) nuevosErrores.titulo = 'El título es obligatorio.';
    if (!form.artista.trim()) nuevosErrores.artista = 'El artista es obligatorio.';
    if (!form.album.trim()) nuevosErrores.album = 'El álbum es obligatorio.';
    if (!form.genero.trim()) nuevosErrores.genero = 'Selecciona un género.';
    if (!/^\d{1,2}:\d{2}$/.test(form.duracion.trim())) {
      nuevosErrores.duracion = 'Usa el formato mm:ss (ejemplo: 3:45).';
    }
    return nuevosErrores;
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    const validacion = validar();

    if (Object.keys(validacion).length > 0) {
      setErrores(validacion);
      return;
    }

    onAgregar({
      id: crypto.randomUUID(),
      titulo: form.titulo.trim(),
      artista: form.artista.trim(),
      album: form.album.trim(),
      genero: form.genero.trim(),
      duracion: form.duracion.trim(),
      portada: `https://picsum.photos/seed/${Date.now()}/300/300`,
      favorita: false,
    });

    navigate('/');
  };

  return (
    <section className="container page-section">
      <article className="form-card">
        <header className="form-header">
          <h1 className="page-title">Agregar nueva canción</h1>
          <p className="page-subtitle">
            Completa todos los campos para añadirla al catálogo de Kodigo Music.
          </p>
        </header>

        <form onSubmit={manejarEnvio} noValidate>
          <p className="form-group">
            <label htmlFor="titulo" className="form-label">
              Título de la canción
            </label>
            <input
              id="titulo"
              name="titulo"
              type="text"
              className={`input-control ${errores.titulo ? 'is-invalid' : ''}`}
              placeholder="Ej. Hotel California"
              value={form.titulo}
              onChange={manejarCambio}
            />
            {errores.titulo && (
              <span className="error-text" role="alert">
                {errores.titulo}
              </span>
            )}
          </p>

          <p className="form-group">
            <label htmlFor="artista" className="form-label">
              Artista o banda
            </label>
            <input
              id="artista"
              name="artista"
              type="text"
              className={`input-control ${errores.artista ? 'is-invalid' : ''}`}
              placeholder="Ej. Eagles"
              value={form.artista}
              onChange={manejarCambio}
            />
            {errores.artista && (
              <span className="error-text" role="alert">
                {errores.artista}
              </span>
            )}
          </p>

          <fieldset className="form-row">
            <p className="form-group">
              <label htmlFor="album" className="form-label">
                Álbum
              </label>
              <input
                id="album"
                name="album"
                type="text"
                className={`input-control ${errores.album ? 'is-invalid' : ''}`}
                placeholder="Ej. Hotel California"
                value={form.album}
                onChange={manejarCambio}
              />
              {errores.album && (
                <span className="error-text" role="alert">
                  {errores.album}
                </span>
              )}
            </p>

            <p className="form-group">
              <label htmlFor="duracion" className="form-label">
                Duración (mm:ss)
              </label>
              <input
                id="duracion"
                name="duracion"
                type="text"
                className={`input-control ${errores.duracion ? 'is-invalid' : ''}`}
                placeholder="Ej. 4:15"
                value={form.duracion}
                onChange={manejarCambio}
              />
              {errores.duracion && (
                <span className="error-text" role="alert">
                  {errores.duracion}
                </span>
              )}
            </p>
          </fieldset>

          <p className="form-group">
            <label htmlFor="genero" className="form-label">
              Género musical
            </label>
            <select
              id="genero"
              name="genero"
              className={`input-control ${errores.genero ? 'is-invalid' : ''}`}
              value={form.genero}
              onChange={manejarCambio}
            >
              <option value="">Selecciona un género...</option>
              <option value="Rock">Rock</option>
              <option value="Pop">Pop</option>
              <option value="Electrónica">Electrónica</option>
              <option value="Country">Country</option>
              <option value="Jazz">Jazz</option>
              <option value="Indie">Indie</option>
            </select>
            {errores.genero && (
              <span className="error-text" role="alert">
                {errores.genero}
              </span>
            )}
          </p>

          <footer className="form-actions">
            <button type="submit" className="btn btn-primary">
              Guardar canción
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => navigate('/')}
            >
              Cancelar
            </button>
          </footer>
        </form>
      </article>
    </section>
  );
}
