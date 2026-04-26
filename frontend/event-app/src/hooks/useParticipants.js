import { useEffect, useState } from 'react';
import { getParticipants, deleteParticipant } from '../api/participants';

export function useParticipants(eventId) {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const fetchParticipants = async () => {
      setLoading(true);
      try {
        const res = await getParticipants(eventId, controller.signal);
        setParticipants(res.data);
      } catch (err) {
        if (err.code !== 'ERR_CANCELED') {
          setError('Failed to load participants.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
    return () => controller.abort();
  }, [eventId]);

  const removeParticipant = async (participantId) => {
    if (!window.confirm('Remove this participant?')) return;
    try {
      await deleteParticipant(participantId);
      setParticipants(prev => prev.filter(p => p.id !== participantId));
      return true;
    } catch {
      alert('Failed to remove participant.');
      return false;
    }
  };

  return { participants, loading, error, removeParticipant };
}