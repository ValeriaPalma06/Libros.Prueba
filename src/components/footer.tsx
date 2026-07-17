import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer style={styles.footer}>
      <p><strong>Estudiante:</strong> Valeria Palma Escobar</p>
      <p><strong>Correo Institucional:</strong> valeria.palma06@inacapmail.cl</p>
      <p style={{ fontSize: '0.8rem', color: '#9019be' }}>© 2026 Librería Central - Todos los derechos reservados.</p>
    </footer>
  );
};

const styles: Record<string, React.CSSProperties> = {
  footer: { backgroundColor: '#3b0764', color: '#ede9fe', textAlign: 'center', padding: '1.5rem', marginTop: 'auto' }
};