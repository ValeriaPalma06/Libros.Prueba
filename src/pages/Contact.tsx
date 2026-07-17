import React, { useState } from 'react';

export const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSuccessMsg('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h2>Contacto</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '1.5rem' }}>
        {/* Formulario */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <h3>Envíanos un mensaje</h3>
          {successMsg && <p style={{ color: '#4f46e5', fontWeight: 'bold' }}>{successMsg}</p>}
          <label>Nombre:</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={styles.input}
          />
          <label>Correo Electrónico:</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={styles.input}
          />
          <label>Mensaje:</label>
          <textarea
            required
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            style={styles.input}
          />
          <button type="submit" style={styles.btn}>Enviar</button>
        </form>

        {/* Información de la empresa y mapa */}
        <div>
          <h3>Información de la empresa</h3>
          <p><strong>Dirección:</strong> Av. Santa Rosa 11315, La Granja, Región Metropolitana</p>
          <p><strong>Teléfono:</strong> +56 2 2123 4567</p>
          <p><strong>Correo:</strong> contacto@libreriacentral.cl</p>
          
          <h4 style={{ marginTop: '1.5rem' }}>Ubicación: INACAP Sede La Granja</h4>
          <a
            href="https://maps.google.com/?q=INACAP+Sede+La+Granja"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#7c3aed', textDecoration: 'underline', display: 'inline-block', marginBottom: '1rem' }}
          >
            Ver en Google Maps
          </a>
          <iframe
            title="Google Maps INACAP La Granja"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3326.257222838902!2d-70.6409893!3d-33.5466847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662da8bebc1ed0d%3A0x72c8a149f1db1280!2sINACAP%20Sede%20La%20Granja!5e0!3m2!1ses!2scl!4v1700000000000"
            width="100%"
            height="200"
            style={{ border: 0, borderRadius: '8px' }}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  form: { display: 'flex', flexDirection: 'column', gap: '0.8rem', backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '8px' },
  input: { padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1' },
  btn: { backgroundColor: '#7c3aed', color: '#fff', border: 'none', padding: '0.75rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }
};