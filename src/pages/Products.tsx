import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const Products: React.FC = () => {
  const { products, addToCart, currentUser } = useApp();

  return (
    <div style={styles.page}>
      <h2>Catálogo de Libros</h2>
      <div style={styles.grid}>
        {products.map((product) => (
          <div key={product.id} style={styles.card}>
            <Link to={`/producto/${product.id}`}>
              <img src={product.image} alt={product.name} style={styles.image} />
            </Link>
            <h3>{product.name}</h3>
            <p style={{ color: '#5b21b6' }}><strong>Categoría:</strong> {product.category}</p>
            <p style={{ fontSize: '0.9rem', color: product.stock > 0 ? '#7dd3fc' : '#c084fc' }}>
              Stock: {product.stock} unidades
            </p>
            <p>
              {product.offerPrice ? (
                <>
                  <span style={{ textDecoration: 'line-through', color: '#c4b5fd', marginRight: '0.5rem' }}>
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
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: { padding: '2rem', maxWidth: '1200px', margin: '0 auto', width: 'min(100%, 1200px)', boxSizing: 'border-box' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginTop: '1.5rem' },
  card: { border: '1px solid #d8b4fe', borderRadius: '8px', padding: '1rem', textAlign: 'center', backgroundColor: '#faf5ff' },
  image: { width: '100%', height: '220px', objectFit: 'cover', borderRadius: '4px', cursor: 'pointer' },
  btnCart: { backgroundColor: '#7c3aed', color: '#fff', border: 'none', padding: '0.6rem 1rem', borderRadius: '4px', cursor: 'pointer', width: '100%', marginTop: '0.5rem' },
  btnDisabled: { backgroundColor: '#c7d2fe', color: '#4c1d95', border: 'none', padding: '0.6rem 1rem', borderRadius: '4px', width: '100%', marginTop: '0.5rem', cursor: 'not-allowed' }
};