import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE, getToken } from '../utils/session';

function Goals() {
  const [goals, setGoals] = useState([]);
  const [targetMonthlyCo2Kg, setTarget] = useState('200');
  const [startMonth, setStartMonth] = useState(() => new Date().toISOString().slice(0, 7));

  async function load() {
    const token = getToken();
    const res = await axios.get(`${API_BASE}/goals`, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
    setGoals(res.data);
  }

  useEffect(() => { load(); }, []);

  async function submit(e) {
    e.preventDefault();
    const token = getToken();
    await axios.post(
      `${API_BASE}/goals`,
      { targetMonthlyCo2Kg: parseFloat(targetMonthlyCo2Kg), startMonth: `${startMonth}-01` },
      { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
    );
    setTarget('');
    await load();
  }

  return (
    <div className="container" style={{ maxWidth: 800 }}>
      <div className="card" style={{ padding: 24 }}>
        <h2 style={{ marginTop: 0 }}>Sustainability Goals</h2>
        <form className="grid" style={{ gap: 12 }} onSubmit={submit}>
          <input className="input" type="number" step="any" placeholder="Monthly CO₂ target (kg)" value={targetMonthlyCo2Kg} onChange={(e) => setTarget(e.target.value)} />
          <input className="input" type="month" value={startMonth} onChange={(e) => setStartMonth(e.target.value)} />
          <button className="btn" type="submit">Add Goal</button>
        </form>
      </div>

      <div className="card" style={{ padding: 24, marginTop: 16 }}>
        <h3 style={{ marginTop: 0 }}>Your Goals</h3>
        {goals.length === 0 ? (
          <div style={{ color: 'var(--muted)' }}>No goals yet. Create one above.</div>
        ) : (
          <div className="grid cols-2">
            {goals.map((g) => (
              <div key={g._id} className="card" style={{ padding: 16 }}>
                <div style={{ fontSize: 14, color: 'var(--muted)' }}>Target Monthly CO₂</div>
                <div style={{ fontSize: 24, fontWeight: 700 }}>{g.targetMonthlyCo2Kg} kg</div>
                <div style={{ color: 'var(--muted)' }}>Start: {new Date(g.startMonth).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Goals;