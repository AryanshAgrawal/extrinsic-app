import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function TopNav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header style={{
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1rem',
      padding: '1.25rem 1.5rem',
      background: 'rgba(15, 23, 42, 0.95)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      position: 'sticky',
      top: 0,
      zIndex: 20,
      backdropFilter: 'blur(16px)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: '1rem',
            fontWeight: '700',
            cursor: 'pointer',
          }}
        >
          Extrinsic Motivator
        </button>
        <nav style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {['/', '/tasks', '/rewards', '/profile'].map((path) => (
            <NavLink
              key={path}
              to={path}
              style={({ isActive }) => ({
                color: isActive ? '#8b5cf6' : '#cbd5e1',
                textDecoration: 'none',
                fontWeight: isActive ? 700 : 500,
              })}
            >
              {path === '/' ? 'Home' : path.replace('/', '').replace('-', ' ').replace(/\b\w/g, (ch) => ch.toUpperCase())}
            </NavLink>
          ))}
        </nav>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>Hi, {user?.username || 'Champion'}</div>
        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          style={{
            background: '#8b5cf6',
            color: 'white',
            border: 'none',
            borderRadius: '999px',
            padding: '0.65rem 1rem',
            cursor: 'pointer',
            fontWeight: 700,
          }}
        >
          Sign out
        </button>
      </div>
    </header>
  );
}
