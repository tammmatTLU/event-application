import { useState } from 'react';
import RegisterForm from './RegisterForm';

export default function EventList({ events, onRefresh }) {
  const [selectedEvent, setSelectedEvent] = useState(null);

  if (events.length === 0) {
    return (
      <div style={styles.empty}>
        <p>No events have been created yet.</p>
      </div>
    );
  }

  return (
    <>
      <div style={styles.grid}>
        {events.map(event => (
          <div key={event.id} style={styles.card}>
            <h3 style={{ marginBottom: '0.5rem' }}>{event.name}</h3>
            <p style={styles.detail}>
              🗓 {new Date(event.time).toLocaleString()}
            </p>
            <p style={styles.detail}>
              👥 {event.participantCount} / {event.maxAttendees} registered
            </p>
            <button
              style={event.participantCount >= event.maxAttendees ? styles.buttonDisabled : styles.button}
              onClick={() => setSelectedEvent(event)}
              disabled={event.participantCount >= event.maxAttendees}
            >
              {event.participantCount >= event.maxAttendees ? 'Full' : 'Register'}
            </button>
          </div>
        ))}
      </div>

      {selectedEvent && (
        <RegisterForm
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onRegistered={() => {
            onRefresh();
            setSelectedEvent(null);
          }}
        />
      )}
    </>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1rem',
  },
  card: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
  },
  detail: { color: '#555', marginBottom: '0.5rem' },
  button: {
    marginTop: '1rem',
    background: '#3498db',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1.2rem',
    borderRadius: '4px',
    fontSize: '0.95rem',
  },
  buttonDisabled: {
    marginTop: '1rem',
    background: '#bdc3c7',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1.2rem',
    borderRadius: '4px',
    fontSize: '0.95rem',
    cursor: 'not-allowed',
  },
  empty: {
    textAlign: 'center',
    padding: '3rem',
    color: '#888',
    background: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
  },
};