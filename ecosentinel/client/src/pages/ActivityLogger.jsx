import React, { useMemo, useState } from 'react';
import axios from 'axios';
import { API_BASE, getToken } from '../utils/session';

const categoryToTypes = {
  transportation: [
    { value: 'car', label: 'Car (km)' },
    { value: 'bus', label: 'Bus (km)' },
    { value: 'bike', label: 'Bike (km)' },
    { value: 'flight_short', label: 'Flight – Short-haul (km)' },
    { value: 'flight_long', label: 'Flight – Long-haul (km)' },
  ],
  energy: [
    { value: 'electricity', label: 'Electricity (kWh)' },
    { value: 'natural_gas', label: 'Natural Gas (m3/therm)' },
    { value: 'renewable', label: 'Renewable (kWh)' },
  ],
  food: [
    { value: 'meat', label: 'Meat-heavy diet (days/meals)' },
    { value: 'vegetarian', label: 'Vegetarian (days/meals)' },
    { value: 'vegan', label: 'Vegan (days/meals)' },
  ],
  waste: [
    { value: 'landfill', label: 'Landfill waste (kg)' },
    { value: 'recycled', label: 'Recycled materials (kg)' },
  ],
};

function ActivityLogger() {
  const [category, setCategory] = useState('transportation');
  const [type, setType] = useState('car');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('km');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [message, setMessage] = useState('');

  const types = categoryToTypes[category];

  const co2Preview = useMemo(() => {
    const q = parseFloat(quantity || '0');
    if (Number.isNaN(q)) return 0;
    const factors = {
      transportation: { car: 0.192, bus: 0.089, bike: 0, flight_short: 0.255, flight_long: 0.195 },
      energy: { electricity: 0.475, natural_gas: 2.1, renewable: 0.05 },
      food: { meat: 7, vegetarian: 3.8, vegan: 2.9 },
      waste: { landfill: 1.2, recycled: -0.2 },
    };
    const f = factors[category]?.[type] || 0;
    return Math.round(q * f * 100) / 100;
  }, [category, type, quantity]);

  async function submit(e) {
    e.preventDefault();
    const token = getToken();
    const payload = { category, type, quantity: parseFloat(quantity), unit, date };
    await axios.post(`${API_BASE}/activities`, payload, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    setMessage('Activity saved!');
    setQuantity('');
  }

  return (
    <div className="container" style={{ maxWidth: 680 }}>
      <div className="card" style={{ padding: 24 }}>
        <h2 style={{ marginTop: 0 }}>Log Activity</h2>
        <form className="grid" style={{ gap: 12 }} onSubmit={submit}>
          <select className="select" value={category} onChange={(e) => { setCategory(e.target.value); setType(categoryToTypes[e.target.value][0].value); }}>
            {Object.keys(categoryToTypes).map((c) => (
              <option key={c} value={c}>{c[0].toUpperCase() + c.slice(1)}</option>
            ))}
          </select>

          <select className="select" value={type} onChange={(e) => setType(e.target.value)}>
            {types.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>

          <input className="input" type="number" step="any" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          <input className="input" type="text" placeholder="Unit" value={unit} onChange={(e) => setUnit(e.target.value)} />
          <input className="input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />

          <div style={{ color: 'var(--muted)' }}>Estimated CO₂: <b>{co2Preview} kg</b></div>

          <button className="btn" type="submit">Save Activity</button>
        </form>
        {message && <div style={{ marginTop: 12, color: 'var(--primary-600)' }}>{message}</div>}
      </div>
    </div>
  );
}

export default ActivityLogger;