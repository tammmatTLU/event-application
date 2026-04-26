import { useParticipants } from '../hooks/useParticipants';
import '../styles/ParticipantsModal.css';

export default function ParticipantsModal({ event, onClose, onChanged }) {
  const { participants, loading, error, removeParticipant } = useParticipants(event.id);

  const handleDelete = async (participantId) => {
    const success = await removeParticipant(participantId);
    if (success) onChanged();
  };

  return (
    <div className="overlay">
      <div className="participants-modal">
        <div className="participants-modal-header">
          <h2>Participants — {event.name}</h2>
          <button className="participants-close-btn" onClick={onClose}>✕</button>
        </div>

        {loading && <p className="participants-message">Loading...</p>}
        {error && <p className="participants-error">{error}</p>}

        {!loading && !error && participants.length === 0 && (
          <p className="participants-message">No participants registered yet.</p>
        )}

        {!loading && participants.length > 0 && (
          <table className="participants-table">
            <thead>
              <tr>
                <th>First name</th>
                <th>Last name</th>
                <th>National ID</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {participants.map(p => (
                <tr key={p.id}>
                  <td>{p.firstName}</td>
                  <td>{p.lastName}</td>
                  <td>{p.nationalId}</td>
                  <td>
                    <button className="btn-danger-sm" onClick={() => handleDelete(p.id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="participants-modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}