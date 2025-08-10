import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Forgot() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  function submit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="container" style={{ maxWidth: 480 }}>
      <div className="card" style={{ padding: 28 }}>
        <h2 style={{ marginTop: 0 }}>Reset password</h2>
        {!sent ? (
          <form onSubmit={submit} className="grid" style={{ gap: 12 }}>
            <input className="input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button className="btn" type="submit">Send reset link</button>
          </form>
        ) : (
          <div>Check your inbox for a reset link (demo only).</div>
        )}
        <div style={{ marginTop: 12 }}>
          <Link to="/login">Back to login</Link>
        </div>
      </div>
    </div>
  );
}

export default Forgot;