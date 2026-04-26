import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:5054/api',
});

// Automatically attach the JWT token to every request if it exists
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default client;