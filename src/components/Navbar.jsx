import { NavLink } from 'react-router-dom';

export default function Navbar({ totalCanciones, totalFavoritas }) {
  return (
    <header className="navbar">
      <nav className="container navbar-inner" aria-label="Navegación principal">
        <NavLink to="/" className="brand">
          <span aria-hidden="true">🎵</span>
          <span>Kodigo Music</span>
        </NavLink>

        <ul className="nav-links">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => `btn ${isActive ? 'btn-primary' : 'btn-outline'}`}
            >
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/biblioteca"
              className={({ isActive }) => `btn ${isActive ? 'btn-primary' : 'btn-outline'}`}
            >
              Biblioteca <span className="badge">{totalFavoritas}</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/agregar"
              className={({ isActive }) => `btn ${isActive ? 'btn-primary' : 'btn-outline'}`}
            >
              + Agregar ({totalCanciones})
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
