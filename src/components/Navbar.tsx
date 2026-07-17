import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const { currentUser, logoutUser, cart } = useApp();
  const navigate = useNavigate();

  const totalItemsInCart = currentUser ? cart.reduce((acc, item) => acc + item.quantity, 0) : 0;

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>
        <Link to="/" style={styles.logo}>📚 Librería Central</Link>
      </div>
      <ul style={styles.menu}>
        <li><Link to="/" style={styles.link}>Inicio</Link></li>
        <li><Link to="/catalogo" style={styles.link}>Catálogo</Link></li>
        <li><Link to="/contacto" style={styles.link}>Contacto</Link></li>
        <li>
          <Link to="/carrito" style={styles.cartLink}>
            🛒 Carrito <span style={styles.badge}>{totalItemsInCart}</span>
          </Link>
        </li>
      </ul>
      <div style={styles.auth}>
        {currentUser ? (
          <>
            <span style={styles.welcome}>Hola, <strong>{currentUser.name}</strong></span>
            <button onClick={handleLogout} style={styles.btnDanger}>Cerrar Sesión</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.btnPrimary}>Iniciar Sesión</Link>
            <Link to="/registro" style={styles.btnSecondary}>Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles: Record<string, React.CSSProperties> = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 1.25rem',
    backgroundColor: '#5b21b6',
    color: '#fff',
    flexWrap: 'wrap',
    gap: '0.75rem',
  },
  brand: { fontSize: '1.2rem', fontWeight: 'bold' },
  logo: { color: '#ede9fe', textDecoration: 'none' },
  menu: {
    display: 'flex',
    listStyle: 'none',
    gap: '1rem',
    margin: 0,
    padding: 0,
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  link: { color: '#d8b4fe', textDecoration: 'none', fontSize: '0.95rem' },
  cartLink: { color: '#7dd3fc', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.95rem' },
  badge: { backgroundColor: '#8b5cf6', color: '#fff', borderRadius: '50%', padding: '0.2rem 0.6rem', fontSize: '0.8rem', marginLeft: '0.3rem' },
  auth: { display: 'flex', gap: '0.6rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' },
  welcome: { fontSize: '0.9rem', color: '#e0e7ff' },
  btnPrimary: { backgroundColor: '#8b5cf6', color: '#fff', padding: '0.5rem 0.9rem', borderRadius: '4px', textDecoration: 'none', fontSize: '0.95rem' },
  btnSecondary: { backgroundColor: '#22d3ee', color: '#1e293b', padding: '0.5rem 0.9rem', borderRadius: '4px', textDecoration: 'none', fontSize: '0.95rem' },
  btnDanger: { backgroundColor: '#c084fc', color: '#1e293b', border: 'none', padding: '0.5rem 0.9rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.95rem' },
};