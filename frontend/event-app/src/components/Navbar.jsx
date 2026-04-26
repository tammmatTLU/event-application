import { useState } from 'react';
import client from '../api/client';
import '../styles/Navbar.css'

export default function Navbar({ isAdmin, onLoginSuccess, onLogout }) {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await client.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      onLoginSuccess();
      setShowModal(false);
      setEmail('');
      setPassword('');
    } catch {
      setError('Invalid email or password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
  };

  return (
    <>
      <nav className='navbar'>
        <span className='navbar-brand'>Event Registration</span>
        {isAdmin ? (
          <button className='btn btn-primary' onClick={handleLogout}>Log out</button>
        ) : (
          <button className='btn btn-primary' onClick={() => setShowModal(true)}>Admin login</button>
        )}
      </nav>

      {showModal && (
        <div className='overlay'>
          <div className='modal navbar-modal'>
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
              <input
                className='input'
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <input
                className='input'
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              {error && <p className='error-message'>{error}</p>}
              <div className='navbar-modal-actions'>
                <button className='btn btn-primary' type="submit">Login</button>
                <button className='btn btn-secondary' type="button" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}