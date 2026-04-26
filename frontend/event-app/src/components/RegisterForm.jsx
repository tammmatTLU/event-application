import { useState } from 'react';
import { registerParticipant } from '../api/participants';
import '../styles/RegisterForm.css';

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
      await registerParticipant(firstName, lastName, nationalId, event.id);
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
    <div className="overlay">
      <div className="modal register-modal">
        <h2>Register for event</h2>
        <p className="register-modal-subtitle">{event.name}</p>
        <form onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
          />
          <input
            className="input"
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
          />
          <input
            className="input"
            type="text"
            placeholder="National ID (isikukood)"
            value={nationalId}
            onChange={e => setNationalId(e.target.value)}
            required
          />
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <div className="register-modal-actions">
            <button className="btn btn-primary" type="submit">Register</button>
            <button className="btn btn-secondary" type="button" onClick={onClose}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
}