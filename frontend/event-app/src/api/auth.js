import client from './client';

// POST login
export const login = (email, password) =>
  client.post('/auth/login', { email, password });