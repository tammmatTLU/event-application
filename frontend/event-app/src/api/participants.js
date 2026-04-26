import client from './client';

// GET participants by eventId
export const getParticipants = (eventId, signal) =>
  client.get(`/participants/event/${eventId}`, { signal });

// POST register new participant
export const registerParticipant = (firstName, lastName, nationalId, eventId) =>
  client.post('/participants', { firstName, lastName, nationalId, eventId });

// DELETE participant from event by participantId
export const deleteParticipant = (id) =>
  client.delete(`/participants/delete/${id}`);