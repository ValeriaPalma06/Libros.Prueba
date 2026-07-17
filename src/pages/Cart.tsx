import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const Cart: React.FC = () => {
  const { currentUser, cart, clearCartAndRestoreStock, checkoutCart } = useApp();

  // Cálculo del precio base
  const rawSubtotal = cart.reduce((acc, item) => {
    const price = item.product.offerPrice || item.product.price;
    return acc + price * item.quantity;
  }, 0);

  // Verificar cumpleaños del usuario
  const isBirthday = (): boolean => {
    if (!currentUser || !currentUser.birthDate) return false;

    const [year, month, day] = currentUser.birthDate.split('-').map(Number);
    if ([year, month, day].some((value) => Number.isNaN(value))) {
      return false;
    }

    const today = new Date();
    return today.getDate() === day && today.getMonth() === month - 1;
  };

  const hasBirthdayDiscount = isBirthday();
  const discountAmount = hasBirthdayDiscount ? rawSubtotal * 0.1 : 0;
  const total = rawSubtotal - discountAmount;

  const handleCheckout = () => {
    const res = checkoutCart();
    alert(res.message);
  };

  if (!currentUser) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center' }}>
        <h2>Carrito de Compras</h2>
        <p style={{ color: '#7c3aed' }}>Debes iniciar sesión para acceder al carrito y realizar compras.</p>
        <Link to="/login" style={{ display: 'inline-block', marginTop: '1rem', padding: '0.5rem 1rem', backgroundColor: '#7c3aed', color: '#f8fafc', borderRadius: '4px', textDecoration: 'none' }}>
          Ir a Iniciar Sesión
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Carrito de Compras</h2>

      {cart.length === 0 ? (
        <p>El carrito está vacío. <Link to="/catalogo">Ver productos</Link></p>
      ) : (
        <>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #cbd5e1', textAlign: 'left' }}>
                <th style={{ padding: '0.5rem' }}>Producto</th>
                <th style={{ padding: '0.5rem' }}>Precio Unitario</th>
                <th style={{ padding: '0.5rem' }}>Cantidad</th>
                <th style={{ padding: '0.5rem' }}>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => {
                const unitPrice = item.product.offerPrice || item.product.price;
                return (
                  <tr key={item.product.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '0.5rem' }}>{item.product.name}</td>
                    <td style={{ padding: '0.5rem' }}>${unitPrice.toLocaleString()}</td>
                    <td style={{ padding: '0.5rem' }}>{item.quantity}</td>
                    <td style={{ padding: '0.5rem' }}>${(unitPrice * item.quantity).toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {hasBirthdayDiscount && (
            <div style={{ backgroundColor: '#fef3c7', color: '#92400e', padding: '1rem', borderRadius: '4px', marginTop: '1rem' }}>
              🎉 <strong>¡Feliz Cumpleaños!</strong> Se ha aplicado un 10% de descuento automático a tu compra.
            </div>
          )}

          <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
            {hasBirthdayDiscount && (
              <p>Descuento Cumpleaños (10%): -${discountAmount.toLocaleString()}</p>
            )}
            <h3>Total: ${total.toLocaleString()}</h3>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
            <button onClick={clearCartAndRestoreStock} style={styles.btnDanger}>
              Vaciar Carrito
            </button>
            <button onClick={handleCheckout} style={styles.btnSuccess}>
              Confirmar Compra
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  btnDanger: { backgroundColor: '#c084fc', color: '#1e293b', border: 'none', padding: '0.75rem 1.2rem', borderRadius: '4px', cursor: 'pointer' },
  btnSuccess: { backgroundColor: '#7dd3fc', color: '#1e293b', border: 'none', padding: '0.75rem 1.2rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }
};