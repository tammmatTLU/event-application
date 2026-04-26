import { useState } from 'react';
import client from '../api/client';
import '../styles/CreateEventForm.css'

export default function CreateEventForm({ onEventCreated }) {
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [maxAttendees, setMaxAttendees] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleReset = async () => {
    if (!window.confirm('Are you sure? This will delete all events and participants.')) return;
    try {
      await client.delete('/admin/reset');
      setSuccess('Database cleared.');
      onEventCreated();
    } catch {
      setError('Failed to reset database.');
    }
  };

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
    } catch(err) {
      setError(err.response?.data?.message || 'Failed to create event.');
    }
  };

  return (
    <div className="create-event-card">
      <h2>Create New Event</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          placeholder="Event name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          className="input"
          type="datetime-local"
          value={time}
          onChange={e => setTime(e.target.value)}
          required
        />
        <input
          className="input"
          type="number"
          placeholder="Max attendees"
          value={maxAttendees}
          onChange={e => setMaxAttendees(e.target.value)}
          min="1"
          required
        />
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <button className="btn btn-success" type="submit">Create event</button>
      </form>
      <hr className="create-event-divider" />
      <button className="btn btn-danger" onClick={handleReset}>🗑 Clear all data</button>
    </div>
  );
}
