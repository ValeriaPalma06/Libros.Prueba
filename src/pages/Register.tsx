import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { registerUser } = useApp();

  const [form, setForm] = useState({
    name: '',
    birthDate: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  const [error, setError] = useState('');

  // Validaciones
  const validateAge = (dateStr: string): boolean => {
    const today = new Date();
    const birthDate = new Date(dateStr);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 18;
  };

  const validatePassword = (pass: string): boolean => {
    // Mínimo 8 caracteres, 1 número, 1 mayúscula, 1 minúscula, 1 carácter especial
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._\-#])[A-Za-z\d@$!%*?&._\-#]{8,}$/;
    return regex.test(pass);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validar Dominios
    const emailLower = form.email.toLowerCase();
    if (!emailLower.endsWith('@gmail.com') && !emailLower.endsWith('@inacap.cl')) {
      setError('Solo se permiten correos con dominio @gmail.com o @inacap.cl');
      return;
    }

    // Validar Edad
    if (!validateAge(form.birthDate)) {
      setError('Debes ser mayor de 18 años para registrarte.');
      return;
    }

    // Validar Contraseñas
    if (form.password !== form.repeatPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    if (!validatePassword(form.password)) {
      setError(
        'La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.'
      );
      return;
    }

    const result = registerUser({
      name: form.name,
      email: form.email,
      birthDate: form.birthDate,
      password: form.password,
    });

    if (result.success) {
      alert('¡Registro exitoso! Ahora puedes iniciar sesión con tu cuenta.');
      navigate('/login');
    } else {
      setError(result.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Registro de Usuario</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Nombre:</label>
        <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={styles.input} />

        <label style={styles.label}>Fecha de Nacimiento:</label>
        <input type="date" required value={form.birthDate} onChange={(e) => setForm({ ...form, birthDate: e.target.value })} style={styles.input} />

        <label style={styles.label}>Correo Electrónico (@gmail.com o @inacap.cl):</label>
        <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={styles.input} />

        <label style={styles.label}>Contraseña:</label>
        <input type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} style={styles.input} />

        <label style={styles.label}>Repetir Contraseña:</label>
        <input type="password" required value={form.repeatPassword} onChange={(e) => setForm({ ...form, repeatPassword: e.target.value })} style={styles.input} />

        <button type="submit" style={styles.btn}>Registrarse</button>
      </form>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: '450px',
    margin: '3rem auto',
    padding: '2rem',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    width: 'min(90vw, 450px)',
  },
  title: { marginBottom: '1rem', fontSize: '1.5rem' },
  form: { display: 'flex', flexDirection: 'column', gap: '0.8rem' },
  label: { fontWeight: 600 },
  input: { padding: '0.7rem', borderRadius: '4px', border: '1px solid #cbd5e1', width: '100%', boxSizing: 'border-box' },
  error: { color: '#7c3aed', backgroundColor: '#eef2ff', padding: '0.5rem', borderRadius: '4px', marginBottom: '1rem' },
  btn: { backgroundColor: '#7c3aed', color: '#1e293b', border: 'none', padding: '0.75rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginTop: '1rem', width: '100%' }
};