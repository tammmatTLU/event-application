import { useState } from 'react';
import client from '../api/client';

export default function CreateEventForm({ onEventCreated }) {
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [maxAttendees, setMaxAttendees] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await client.post('/events', {
        name,
        time: new Date(time).toISOString(),
        maxAttendees: parseInt(maxAttendees),
      });
      setSuccess('Event created!');
      setName('');
      setTime('');
      setMaxAttendees('');
      onEventCreated();
    } catch {
      setError('Failed to create event. Make sure you are logged in.');
    }
  };

  return (
    <div style={styles.card}>
      <h2 style={{ marginBottom: '1rem' }}>Create New Event</h2>
      <form onSubmit={handleSubmit}>
        <input
          style={styles.input}
          type="text"
          placeholder="Event name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          style={styles.input}
          type="datetime-local"
          value={time}
          onChange={e => setTime(e.target.value)}
          required
        />
        <input
          style={styles.input}
          type="number"
          placeholder="Max attendees"
          value={maxAttendees}
          onChange={e => setMaxAttendees(e.target.value)}
          min="1"
          required
        />
        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}
        <button style={styles.button} type="submit">Create event</button>
      </form>
    </div>
  );
}

const styles = {
  card: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    marginBottom: '2rem',
    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
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
    background: '#27ae60',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1.2rem',
    borderRadius: '4px',
    fontSize: '0.95rem',
  },
  error: { color: 'red', marginBottom: '1rem' },
  success: { color: 'green', marginBottom: '1rem' },
};