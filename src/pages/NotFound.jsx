import { Link } from 'react-router-dom';
import TopNav from '../components/TopNav';

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', background: '#020617', color: 'white' }}>
      <TopNav />
      <main style={{ display: 'grid', placeItems: 'center', minHeight: 'calc(100vh - 88px)', padding: '2rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '560px', width: '100%' }}>
          <p style={{ margin: 0, color: '#a5b4fc', fontWeight: 700 }}>404 · Page not found</p>
          <h1 style={{ margin: '1rem 0', fontSize: 'clamp(2.5rem, 4vw, 4.5rem)' }}>Looks like you took a wrong turn.</h1>
          <p style={{ color: '#94a3b8', lineHeight: 1.75 }}>Head back to the dashboard and continue building positive habits with the rewards system.</p>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              marginTop: '1.5rem',
              background: '#8b5cf6',
              color: 'white',
              borderRadius: '999px',
              padding: '0.85rem 1.4rem',
              textDecoration: 'none',
              fontWeight: 700,
            }}
          >
            Go home
          </Link>
        </div>
      </main>
    </div>
  );
}
