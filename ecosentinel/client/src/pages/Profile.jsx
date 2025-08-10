import React from 'react';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const achievements = user.achievements || [];

  return (
    <div className="container" style={{ maxWidth: 900 }}>
      <div className="grid cols-2">
        <div className="card" style={{ padding: 24 }}>
          <h2 style={{ marginTop: 0 }}>Profile</h2>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <img src={user.avatarUrl || `https://api.dicebear.com/9.x/identicon/svg?seed=${encodeURIComponent(user.email || 'eco')}`} alt="avatar" width={72} height={72} style={{ borderRadius: '50%' }} />
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>{user.name || 'Eco User'}</div>
              <div style={{ color: 'var(--muted)' }}>{user.email || ''}</div>
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ marginTop: 0 }}>Achievements</h3>
          {achievements.length === 0 ? (
            <div style={{ color: 'var(--muted)' }}>No badges yet. Log activities to earn achievements!</div>
          ) : (
            <div className="grid cols-3">
              {achievements.map((a, i) => (
                <div key={i} className="card" style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 700 }}>{a.name}</div>
                  <div style={{ color: 'var(--muted)' }}>{new Date(a.earnedAt).toLocaleDateString()}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;