import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE, getToken } from '../utils/session';

function Recommendations() {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    async function load() {
      const token = getToken();
      const res = await axios.get(`${API_BASE}/recommendations`, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
      setTips(res.data.tips || []);
    }
    load();
  }, []);

  return (
    <div className="container" style={{ maxWidth: 800 }}>
      <div className="card" style={{ padding: 24 }}>
        <h2 style={{ marginTop: 0 }}>Personalized Eco Tips</h2>
        <ul>
          {tips.map((t, i) => (
            <li key={i} style={{ marginBottom: 8 }}>{t}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Recommendations;