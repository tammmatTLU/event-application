import { useState } from 'react';
import RegisterForm from './RegisterForm';
import { deleteEvent } from '../api/events';
import ParticipantsModal from './ParticipantsModal';
import '../styles/EventList.css';

export default function EventList({ events, onRefresh, isAdmin }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [managingEvent, setManagingEvent] = useState(null);

  const handleDelete = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      await deleteEvent(eventId);
      onRefresh();
    } catch {
      alert('Failed to delete event.');
    }
  };

  if (events.length === 0) {
    return <div className="event-empty"><p>No events have been created yet.</p></div>;
  }

  return (
    <>
      <div className="event-grid">
        {events.map(event => (
          <div key={event.id} className="event-card">
            <h3>{event.name}</h3>
            <p className="event-detail">🗓 {new Date(event.time).toLocaleString()}</p>
            <p className="event-detail">👥 {event.participantCount} / {event.maxAttendees} registered</p>
            <button
              className={`btn btn-block ${event.participantCount >= event.maxAttendees ? 'btn-disabled' : 'btn-primary'}`}
              onClick={() => setSelectedEvent(event)}
              disabled={event.participantCount >= event.maxAttendees}
            >
              {event.participantCount >= event.maxAttendees ? 'Full' : 'Register'}
            </button>
            {isAdmin && (
              <>
                <button
                  className="btn btn-secondary btn-block"
                  onClick={() => setManagingEvent(event)}
                >
                  👥 Edit participants
                </button>
                <button
                  className="btn btn-danger btn-block"
                  onClick={() => handleDelete(event.id)}
                >
                  🗑 Delete event
                </button>
              </>
            )}
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

      {managingEvent && (
        <ParticipantsModal
          event={managingEvent}
          onClose={() => setManagingEvent(null)}
          onChanged={onRefresh}
        />
      )}
    </>
  );
}