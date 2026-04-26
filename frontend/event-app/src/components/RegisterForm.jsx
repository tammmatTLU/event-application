import { useState } from 'react';
import client from '../api/client';

export default function RegisterForm({ event, onClose, onRegistered }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await client.post('/participants', {
        firstName,
        lastName,
        nationalId,
        eventId: event.id,
      });
      setSuccess('Successfully registered!');
      onRegistered();
      setFirstName('');
      setLastName('');
      setNationalId('');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={{ marginBottom: '0.5rem' }}>Register for event</h2>
        <p style={{ marginBottom: '1rem', color: '#555' }}>{event.name}</p>
        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
          />
          <input
            style={styles.input}
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
          />
          <input
            style={styles.input}
            type="text"
            placeholder="National ID (isikukood)"
            value={nationalId}
            onChange={e => setNationalId(e.target.value)}
            required
          />
          {error && <p style={styles.error}>{error}</p>}
          {success && <p style={styles.success}>{success}</p>}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button style={styles.button} type="submit">Register</button>
            <button style={styles.buttonSecondary} type="button" onClick={onClose}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
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
  button: {
    background: '#3498db',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1.2rem',
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
  error: { color: 'red', marginBottom: '1rem' },
  success: { color: 'green', marginBottom: '1rem' },
};