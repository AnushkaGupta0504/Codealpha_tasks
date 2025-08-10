import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { FiLeaf, FiSun, FiMoon } from 'react-icons/fi';
import AuthLogin from './pages/auth/Login';
import AuthRegister from './pages/auth/Register';
import AuthForgot from './pages/auth/Forgot';
import Dashboard from './pages/Dashboard';
import ActivityLogger from './pages/ActivityLogger';
import Recommendations from './pages/Recommendations';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Goals from './pages/Goals';
import { getToken, setThemeOnDocument, removeToken } from './utils/session';

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [token, setTokenState] = useState(getToken());
  const navigate = useNavigate();

  useEffect(() => {
    setThemeOnDocument(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  function logout() {
    removeToken();
    setTokenState(null);
    navigate('/login');
  }

  return (
    <div>
      <header className="card" style={{ position: 'sticky', top: 0, zIndex: 30 }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'space-between' }}>
          <Link to={token ? '/' : '/login'} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <FiLeaf color={theme === 'dark' ? '#2fbf71' : '#23a15e'} size={28} />
            <div style={{ fontWeight: 700, fontSize: 20 }}>EcoSentinel</div>
          </Link>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {token && (
              <>
                <Link to="/" className="btn" style={{ padding: '8px 14px' }}>Dashboard</Link>
                <Link to="/log" className="btn" style={{ padding: '8px 14px' }}>Log Activity</Link>
                <Link to="/recommendations" className="btn" style={{ padding: '8px 14px' }}>Tips</Link>
                <Link to="/profile" className="btn" style={{ padding: '8px 14px' }}>Profile</Link>
                <Link to="/settings" className="btn" style={{ padding: '8px 14px' }}>Settings</Link>
                <Link to="/goals" className="btn" style={{ padding: '8px 14px' }}>Goals</Link>
                <button className="btn" onClick={logout} style={{ padding: '8px 14px', background: '#ef4444', boxShadow: '0 8px 16px rgba(239,68,68,.25)' }}>Logout</button>
              </>
            )}
            <button className="btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {theme === 'dark' ? <FiSun /> : <FiMoon />} {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
          </nav>
        </div>
      </header>

      <main className="container" style={{ paddingTop: 24 }}>
        <Routes>
          <Route path="/login" element={<AuthLogin onAuthed={() => setTokenState(getToken())} />} />
          <Route path="/register" element={<AuthRegister onAuthed={() => setTokenState(getToken())} />} />
          <Route path="/forgot" element={<AuthForgot />} />

          <Route path="/" element={token ? <Dashboard /> : <Navigate to="/login" replace />} />
          <Route path="/log" element={token ? <ActivityLogger /> : <Navigate to="/login" replace />} />
          <Route path="/recommendations" element={token ? <Recommendations /> : <Navigate to="/login" replace />} />
          <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" replace />} />
          <Route path="/settings" element={token ? <Settings /> : <Navigate to="/login" replace />} />
          <Route path="/goals" element={token ? <Goals /> : <Navigate to="/login" replace />} />
        </Routes>
      </main>

      <footer className="container" style={{ opacity: .7, paddingBottom: 32 }}>
        © {new Date().getFullYear()} EcoSentinel — Your guardian for a greener future
      </footer>
    </div>
  );
}

export default App;
