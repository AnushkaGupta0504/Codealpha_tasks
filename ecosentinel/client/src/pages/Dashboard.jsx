import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { API_BASE, getToken } from '../utils/session';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

function Dashboard() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    async function load() {
      const token = getToken();
      const res = await axios.get(`${API_BASE}/activities`, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
      setActivities(res.data);
    }
    load();
  }, []);

  const totalCo2 = useMemo(() => activities.reduce((sum, a) => sum + (a.co2Kg || 0), 0), [activities]);
  const weekCo2 = useMemo(() => {
    const since = new Date();
    since.setDate(since.getDate() - 7);
    return activities.filter(a => new Date(a.date) >= since).reduce((s, a) => s + a.co2Kg, 0);
  }, [activities]);

  const chartData = useMemo(() => {
    const days = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d;
    });
    const labels = days.map(d => d.toLocaleDateString());
    const series = days.map(day => {
      const dayStr = day.toDateString();
      return activities
        .filter(a => new Date(a.date).toDateString() === dayStr)
        .reduce((s, a) => s + a.co2Kg, 0);
    });
    return {
      labels,
      datasets: [
        {
          label: 'Daily CO₂ (kg)',
          data: series,
          borderColor: '#2fbf71',
          backgroundColor: 'rgba(47,191,113,0.2)',
          tension: 0.3,
        },
      ],
    };
  }, [activities]);

  return (
    <div className="grid cols-3">
      <div className="card">
        <div style={{ fontSize: 14, color: 'var(--muted)' }}>Total Footprint</div>
        <div style={{ fontSize: 32, fontWeight: 700 }}>{totalCo2.toFixed(1)} kg</div>
      </div>
      <div className="card">
        <div style={{ fontSize: 14, color: 'var(--muted)' }}>This Week</div>
        <div style={{ fontSize: 32, fontWeight: 700 }}>{weekCo2.toFixed(1)} kg</div>
        <div style={{ color: 'var(--muted)' }}>You saved 5 kg CO₂ this week</div>
      </div>
      <div className="card">
        <div style={{ fontSize: 14, color: 'var(--muted)' }}>Activities Logged</div>
        <div style={{ fontSize: 32, fontWeight: 700 }}>{activities.length}</div>
      </div>

      <div className="card" style={{ gridColumn: '1 / -1' }}>
        <h3 style={{ marginTop: 0 }}>Weekly Trend</h3>
        <Line data={chartData} />
      </div>
    </div>
  );
}

export default Dashboard;