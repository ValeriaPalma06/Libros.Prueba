import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, addToCart, currentUser } = useApp();

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Producto no encontrado</h2>
        <button onClick={() => navigate('/catalogo')} style={{ padding: '0.5rem 1rem', marginTop: '1rem' }}>
          Volver al catálogo
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      <img src={product.image} alt={product.name} style={{ width: '300px', height: '400px', objectFit: 'cover', borderRadius: '8px' }} />
      <div style={{ flex: 1, minWidth: '280px' }}>
        <h2>{product.name}</h2>
        <p style={{ color: '#64748b' }}><strong>Categoría:</strong> {product.category}</p>
        <p style={{ lineHeight: '1.6' }}>{product.description}</p>
        <p style={{ fontSize: '1.2rem', margin: '1rem 0' }}>
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
        <p style={{ color: product.stock > 0 ? '#7dd3fc' : '#c084fc', fontWeight: 'bold' }}>
          Stock disponible: {product.stock}
        </p>
        <button
          onClick={() => addToCart(product)}
          disabled={!currentUser || product.stock <= 0}
          style={{
            backgroundColor: !currentUser || product.stock <= 0 ? '#c7d2fe' : '#8b5cf6',
            color: !currentUser || product.stock <= 0 ? '#4c1d95' : '#fff',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '4px',
            cursor: !currentUser || product.stock <= 0 ? 'not-allowed' : 'pointer',
            marginTop: '1rem'
          }}
        >
          {!currentUser ? 'Inicia sesión' : product.stock > 0 ? 'Agregar al Carrito' : 'Sin Stock'}
        </button>
      </div>
    </div>
  );
};