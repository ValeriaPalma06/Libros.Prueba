import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { loginUser } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = loginUser(email, password);

    if (result.success) {
      alert('Inicio de sesión exitoso.');
      navigate('/catalogo');
    } else {
      setError(result.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Iniciar Sesión</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Correo Electrónico:</label>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} />

        <label style={styles.label}>Contraseña:</label>
        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} />

        <button type="submit" style={styles.btn}>Entrar</button>
      </form>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: '400px',
    margin: '3rem auto',
    padding: '2rem',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    width: 'min(90vw, 400px)',
  },
  title: { marginBottom: '1rem', fontSize: '1.5rem' },
  form: { display: 'flex', flexDirection: 'column', gap: '0.8rem' },
  label: { fontWeight: 600 },
  input: { padding: '0.7rem', borderRadius: '4px', border: '1px solid #cbd5e1', width: '100%', boxSizing: 'border-box' },
  error: { color: '#7c3aed', backgroundColor: '#eef2ff', padding: '0.5rem', borderRadius: '4px', marginBottom: '1rem' },
  btn: { backgroundColor: '#7c3aed', color: '#1e293b', border: 'none', padding: '0.75rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginTop: '1rem', width: '100%' }
};