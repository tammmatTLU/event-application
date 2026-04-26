import { useEffect, useState } from 'react';
import { getEvents } from '../api/events';

export function useEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const fetchEvents = async () => {
      setLoading(true);
      try {
        const res = await getEvents(controller.signal);
        setEvents(res.data);
      } catch (err) {
        if (err.code !== 'ERR_CANCELED') {
          setError('Failed to load events.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
    return () => controller.abort();
  }, []);

  return { events, loading, error, refetch: () => getEvents().then(res => setEvents(res.data)) };
}