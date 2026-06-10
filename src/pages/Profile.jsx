import { useEffect, useState } from 'react';
import api from '../lib/api';
import TopNav from '../components/TopNav';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await api.get('/api/me/profile');
        setProfile(res.data);
      } catch (err) {
        setError('Failed to load profile data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#020617', color: 'white' }}>
      <TopNav />
      <main style={{ padding: '2rem 1.5rem 3rem', maxWidth: '960px', margin: '0 auto' }}>
        <section style={{ marginBottom: '2rem' }}>
          <h1 style={{ margin: 0, fontSize: '2.2rem' }}>Profile</h1>
          <p style={{ margin: '0.75rem 0 0', color: '#94a3b8' }}>
            View your account summary, progress points, and profile details.
          </p>
        </section>

        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {loading ? (
            <div style={{ color: '#cbd5e1' }}>Loading profile…</div>
          ) : error ? (
            <div style={{ color: '#f87171' }}>{error}</div>
          ) : (
            <div style={{
              background: 'rgba(15, 23, 42, 0.9)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '20px',
              padding: '2rem',
              display: 'grid',
              gap: '1.5rem',
            }}>
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                <p style={{ margin: 0, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.8rem' }}>Account</p>
                <h2 style={{ margin: 0, fontSize: '2rem' }}>{profile.user?.username ?? 'Guest'}</h2>
                <p style={{ margin: 0, color: '#cbd5e1' }}>Keep your goals on track and use points to unlock rewards.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                <div style={infoCard}>
                  <p style={infoLabel}>Available points</p>
                  <p style={infoValue}>{profile.points ?? 0}</p>
                </div>
                <div style={infoCard}>
                  <p style={infoLabel}>Email</p>
                  <p style={infoValue}>{profile.user?.email || 'Not available'}</p>
                </div>
                <div style={infoCard}>
                  <p style={infoLabel}>User ID</p>
                  <p style={infoValue}>{profile.user?.id ?? 'N/A'}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

const infoCard = {
  background: 'rgba(30, 41, 59, 0.8)',
  borderRadius: '18px',
  padding: '1.5rem',
  border: '1px solid rgba(255,255,255,0.08)',
};

const infoLabel = {
  margin: 0,
  color: '#94a3b8',
  fontSize: '0.82rem',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
};

const infoValue = {
  margin: '0.75rem 0 0',
  color: 'white',
  fontSize: '1.45rem',
  fontWeight: 700,
};
