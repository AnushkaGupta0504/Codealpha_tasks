import React, { useState } from 'react';

function Settings() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  function save(e) {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify({ name, email }));
    alert('Saved locally (demo)');
  }

  function deleteAccount() {
    localStorage.clear();
    alert('Account deleted locally (demo)');
    window.location.href = '/register';
  }

  return (
    <div className="container" style={{ maxWidth: 680 }}>
      <div className="card" style={{ padding: 24 }}>
        <h2 style={{ marginTop: 0 }}>Settings</h2>
        <form className="grid" style={{ gap: 12 }} onSubmit={save}>
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
          <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <button className="btn" type="submit">Save</button>
        </form>
        <div style={{ marginTop: 24 }}>
          <button className="btn" onClick={deleteAccount} style={{ background: '#ef4444', boxShadow: '0 8px 16px rgba(239,68,68,.25)' }}>Delete account</button>
        </div>
      </div>
    </div>
  );
}

export default Settings;