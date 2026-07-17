import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const Home: React.FC = () => {
  const { products, addToCart, currentUser } = useApp();
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 3);

  return (
    <div style={styles.page}>
      {/* Hero Banner */}
      <section style={styles.hero}>
        <h1>Descubre tu próxima lectura favorita</h1>
        <p>Aprovecha las mejores ofertas en libros clásicos, contemporáneos y educativos.</p>
        <Link to="/catalogo" style={styles.heroBtn}>Ver Catálogo Completo</Link>
      </section>

      {/* ¿Quiénes Somos? */}
      <section style={{ margin: '3rem 0' }}>
        <h2>¿Quiénes Somos?</h2>
        <p style={{ color: '#4c1d95', lineHeight: '1.6' }}>
          En Librería Central nos apasiona conectar a los lectores con las mejores historias y conocimientos. Nos especializamos en la distribución de material literario y educativo, entregando un servicio rápido, transparente y adaptado a tus necesidades.
        </p>
      </section>

      {/* Productos Destacados */}
      <section>
        <h2>Productos Destacados</h2>
        <div style={styles.grid}>
          {featuredProducts.map((product) => (
            <div key={product.id} style={styles.card}>
              <img src={product.image} alt={product.name} style={styles.image} />
              <h3>{product.name}</h3>
              <p style={{ color: '#64748b' }}>{product.category}</p>
              <p>
                {product.offerPrice ? (
                  <>
                    <span style={{ textDecoration: 'line-through', color: '#94a3b8', marginRight: '0.5rem' }}>
                      ${product.price.toLocaleString()}
                    </span>
                    <strong style={{ color: '#7c3aed' }}>${product.offerPrice.toLocaleString()}</strong>
                  </>
                ) : (
                  <strong>${product.price.toLocaleString()}</strong>
                )}
              </p>
              <button 
                onClick={() => addToCart(product)} 
                disabled={!currentUser || product.stock <= 0}
                style={!currentUser || product.stock <= 0 ? styles.btnDisabled : styles.btnCart}
              >
                {!currentUser ? 'Inicia sesión' : product.stock > 0 ? 'Agregar al Carrito' : 'Agotado'}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: { padding: '2rem', maxWidth: '1200px', margin: '0 auto', width: 'min(100%, 1200px)', boxSizing: 'border-box' },
  hero: { backgroundColor: '#8b5cf6', color: '#fff', padding: '3rem 1.5rem', borderRadius: '8px', textAlign: 'center' },
  heroBtn: { display: 'inline-block', marginTop: '1rem', backgroundColor: '#ede9fe', color: '#5b21b6', padding: '0.75rem 1.5rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginTop: '1rem' },
  card: { border: '1px solid #d8b4fe', borderRadius: '8px', padding: '1rem', textAlign: 'center', backgroundColor: '#faf5ff' },
  image: { width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' },
  btnCart: { backgroundColor: '#7c3aed', color: '#fff', border: 'none', padding: '0.6rem 1rem', borderRadius: '4px', cursor: 'pointer', width: '100%', marginTop: '0.5rem' },
  btnDisabled: { backgroundColor: '#c7d2fe', color: '#4c1d95', border: 'none', padding: '0.6rem 1rem', borderRadius: '4px', width: '100%', marginTop: '0.5rem', cursor: 'not-allowed' }
};