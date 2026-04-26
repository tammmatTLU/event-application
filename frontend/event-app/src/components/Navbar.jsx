import { useState } from 'react';
import client from '../api/client';

export default function Navbar({ isAdmin, onLoginSuccess, onLogout }) {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await client.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      onLoginSuccess();
      setShowModal(false);
      setEmail('');
      setPassword('');
    } catch {
      setError('Invalid email or password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
  };

  return (
    <>
      <nav style={styles.nav}>
        <span style={styles.brand}>Event Registration</span>
        {isAdmin ? (
          <button style={styles.button} onClick={handleLogout}>Log out</button>
        ) : (
          <button style={styles.button} onClick={() => setShowModal(true)}>Admin login</button>
        )}
      </nav>

      {showModal && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h2 style={{ marginBottom: '1rem' }}>Admin Login</h2>
            <form onSubmit={handleLogin}>
              <input
                style={styles.input}
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <input
                style={styles.input}
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              {error && <p style={styles.error}>{error}</p>}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button style={styles.button} type="submit">Login</button>
                <button style={styles.buttonSecondary} type="button" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#2c3e50',
    color: 'white',
    padding: '1rem 2rem',
  },
  brand: { fontSize: '1.2rem', fontWeight: 'bold' },
  button: {
    background: '#3498db',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    fontSize: '0.95rem',
  },
  buttonSecondary: {
    background: '#95a5a6',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    fontSize: '0.95rem',
  },
  overlay: {
    position: 'fixed', inset: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    background: 'white',
    padding: '2rem',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '400px',
  },
  input: {
    display: 'block',
    width: '100%',
    padding: '0.5rem',
    marginBottom: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '0.95rem',
  },
  error: { color: 'red', marginBottom: '1rem' },
};