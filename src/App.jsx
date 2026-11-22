import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CANCIONES_INICIALES } from './data/cancionesIniciales.js';
import Navbar from './components/Navbar.jsx';
import PlayerBar from './components/PlayerBar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Biblioteca from './pages/Biblioteca.jsx';
import AgregarCancion from './pages/AgregarCancion.jsx';

export default function App() {
  const [canciones, setCanciones] = useState(() => {
    try {
      const guardadas = localStorage.getItem('kodigo_music_canciones_v2');
      return guardadas ? JSON.parse(guardadas) : CANCIONES_INICIALES;
    } catch {
      return CANCIONES_INICIALES;
    }
  });

  const [cancionActual, setCancionActual] = useState(null);
  const [estaReproduciendo, setEstaReproduciendo] = useState(false);

  useEffect(() => {
    localStorage.setItem('kodigo_music_canciones_v2', JSON.stringify(canciones));
  }, [canciones]);

  useEffect(() => {
    document.title =
      cancionActual && estaReproduciendo
        ? `▶ ${cancionActual.titulo} | Kodigo Music`
        : 'Kodigo Music';
  }, [cancionActual, estaReproduciendo]);

  const manejarReproducir = (cancion) => {
    if (cancionActual?.id === cancion.id) {
      setEstaReproduciendo((prev) => !prev);
    } else {
      setCancionActual(cancion);
      setEstaReproduciendo(true);
    }
  };

  const manejarToggleFavorita = (id) => {
    setCanciones((prev) =>
      prev.map((c) => (c.id === id ? { ...c, favorita: !c.favorita } : c))
    );
  };

  const manejarEliminar = (id) => {
    setCanciones((prev) => prev.filter((c) => c.id !== id));
    if (cancionActual?.id === id) {
      setCancionActual(null);
      setEstaReproduciendo(false);
    }
  };

  const manejarAgregar = (nuevaCancion) => {
    setCanciones((prev) => [nuevaCancion, ...prev]);
  };

  const totalFavoritas = canciones.filter((c) => c.favorita).length;

  return (
    <>
      <Navbar
        totalCanciones={canciones.length}
        totalFavoritas={totalFavoritas}
      />

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                canciones={canciones}
                cancionActual={cancionActual}
                estaReproduciendo={estaReproduciendo}
                onReproducir={manejarReproducir}
                onToggleFavorita={manejarToggleFavorita}
                onEliminar={manejarEliminar}
              />
            }
          />
          <Route
            path="/biblioteca"
            element={
              <Biblioteca
                canciones={canciones}
                cancionActual={cancionActual}
                estaReproduciendo={estaReproduciendo}
                onReproducir={manejarReproducir}
                onToggleFavorita={manejarToggleFavorita}
                onEliminar={manejarEliminar}
              />
            }
          />
          <Route
            path="/agregar"
            element={<AgregarCancion onAgregar={manejarAgregar} />}
          />
        </Routes>
      </main>

      <Footer />

      <PlayerBar
        key={cancionActual?.id ?? 'sin-cancion'}
        cancionActual={cancionActual}
        estaReproduciendo={estaReproduciendo}
        onTogglePlay={() => setEstaReproduciendo((prev) => !prev)}
      />
    </>
  );
}
