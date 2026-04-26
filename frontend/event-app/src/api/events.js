import client from './client';

// GET fetch all events
export const getEvents = (signal) =>
  client.get('/events', { signal });

// POST create new event
export const createEvent = (name, time, maxAttendees) =>
  client.post('/events', { name, time, maxAttendees });

// DELETE event by id
export const deleteEvent = (id) =>
  client.delete(`/events/delete/${id}`);

// DELETE all data to reset database
export const resetDatabase = () =>
  client.delete('/admin/reset');