import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE, setToken } from '../../utils/session';

function Register({ onAuthed }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(`${API_BASE}/auth/register`, { name, email, password }, { withCredentials: true });
      setToken(res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      onAuthed?.();
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container" style={{ maxWidth: 480 }}>
      <div className="card" style={{ padding: 28 }}>
        <h2 style={{ marginTop: 0 }}>Create account</h2>
        <p style={{ color: 'var(--muted)' }}>Join EcoSentinel to start your journey</p>
        <form onSubmit={submit} className="grid" style={{ gap: 12 }}>
          <input className="input" type="text" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input className="input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {error && <div style={{ color: '#ef4444' }}>{error}</div>}
          <button className="btn" type="submit" disabled={loading}>{loading ? 'Creating...' : 'Sign up'}</button>
        </form>
        <div style={{ marginTop: 12 }}>
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;