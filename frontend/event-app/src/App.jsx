import { useEffect, useState } from 'react';
import client from './api/client';
import Navbar from './components/Navbar';
import EventList from './components/EventList';
import CreateEventForm from './components/CreateEventForm';

export default function App() {
  const [events, setEvents] = useState([]);
  const [isAdmin, setIsAdmin] = useState(!!localStorage.getItem('token'));

  const fetchEvents = async () => {
    try {
      const res = await client.get('/events');
      setEvents(res.data);
    } catch {
      setEvents([]);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <Navbar
        isAdmin={isAdmin}
        onLoginSuccess={() => setIsAdmin(true)}
        onLogout={() => setIsAdmin(false)}
      />
      <main style={{ maxWidth: '900px', margin: '2rem auto', padding: '0 1rem' }}>
        {isAdmin && <CreateEventForm onEventCreated={fetchEvents} />}
        <h2 style={{ marginBottom: '1rem' }}>Upcoming Events</h2>
        <EventList events={events} onRefresh={fetchEvents} />
      </main>
    </>
  );
}