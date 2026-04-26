import { useEffect, useState } from 'react';
import client from '../api/client';

export default function ParticipantsModal({ event, onClose, onChanged }) {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchParticipants = async () => {
    setLoading(true);
    try {
      const res = await client.get(`/participants/event/${event.id}`);
      setParticipants(res.data);
    } catch {
      setError('Failed to load participants.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, []);

  const handleDelete = async (participantId) => {
    if (!window.confirm('Remove this participant?')) return;
    try {
      await client.delete(`/participants/delete/${participantId}`);
      onChanged();
      fetchParticipants();
    } catch {
      alert('Failed to remove participant.');
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2>Participants — {event.name}</h2>
          <button style={styles.closeButton} onClick={onClose}>✕</button>
        </div>

        {loading && <p style={styles.message}>Loading...</p>}
        {error && <p style={styles.error}>{error}</p>}

        {!loading && !error && participants.length === 0 && (
          <p style={styles.message}>No participants registered yet.</p>
        )}

        {!loading && participants.length > 0 && (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>First name</th>
                <th style={styles.th}>Last name</th>
                <th style={styles.th}>National ID</th>
                <th style={styles.th}></th>
              </tr>
            </thead>
            <tbody>
              {participants.map(p => (
                <tr key={p.id} style={styles.tr}>
                  <td style={styles.td}>{p.firstName}</td>
                  <td style={styles.td}>{p.lastName}</td>
                  <td style={styles.td}>{p.nationalId}</td>
                  <td style={styles.td}>
                    <button
                      style={styles.buttonDanger}
                      onClick={() => handleDelete(p.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div style={styles.footer}>
          <button style={styles.buttonSecondary} onClick={onClose}>Close</button>
        </div>
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
    borderRadius: '8px',
    width: '100%',
    maxWidth: '600px',
    maxHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem',
    borderBottom: '1px solid #eee',
  },
  footer: {
    padding: '1rem 1.5rem',
    borderTop: '1px solid #eee',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    overflowY: 'auto',
    flex: 1,
  },
  th: {
    textAlign: 'left',
    padding: '0.75rem 1.5rem',
    background: '#f8f8f8',
    borderBottom: '2px solid #eee',
    fontWeight: '600',
    fontSize: '0.9rem',
  },
  tr: {
    borderBottom: '1px solid #f0f0f0',
  },
  td: {
    padding: '0.75rem 1.5rem',
    fontSize: '0.95rem',
  },
  message: {
    padding: '2rem',
    textAlign: 'center',
    color: '#888',
  },
  error: {
    padding: '1rem 1.5rem',
    color: 'red',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '1.2rem',
    color: '#888',
    cursor: 'pointer',
    padding: '0.25rem',
  },
  buttonDanger: {
    background: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '0.3rem 0.8rem',
    borderRadius: '4px',
    fontSize: '0.85rem',
  },
  buttonSecondary: {
    background: '#95a5a6',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    fontSize: '0.95rem',
  },
};