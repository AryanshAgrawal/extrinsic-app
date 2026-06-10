import { useEffect, useState } from 'react';
import api from '../lib/api';
import TopNav from '../components/TopNav';
import RewardStore from '../components/RewardStore';

export default function Rewards() {
  const [rewards, setRewards] = useState([]);
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/api/rewards');
        setRewards(res.data.rewards);
        setPoints(res.data.points);
      } catch (err) {
        console.error('Failed to load rewards', err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleRedeem = async (rewardId) => {
    try {
      const res = await api.post('/api/rewards/redeem', { rewardId });
      setRewards(res.data.rewards);
      setPoints(res.data.points);
    } catch (err) {
      console.error('Could not redeem reward', err);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#020617', color: 'white' }}>
      <TopNav />

      <main style={{ padding: '2rem 1.5rem 3rem', maxWidth: '1120px', margin: '0 auto' }}>
        <section style={{ marginBottom: '1.5rem' }}>
          <h1 style={{ margin: 0, fontSize: '2.2rem' }}>Rewards Store</h1>
          <p style={{ margin: '0.75rem 0 0', color: '#94a3b8' }}>
            Spend your earned points on rewards that help you stay motivated.
          </p>
        </section>

        <section style={{ display: 'grid', gap: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p style={{ margin: 0, color: '#94a3b8' }}>Available points</p>
              <p style={{ margin: '0.35rem 0 0', fontSize: '2rem', fontWeight: 700 }}>{loading ? '...' : points}</p>
            </div>
            <div style={{ background: 'rgba(15, 23, 42, 0.9)', padding: '1rem 1.25rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <p style={{ margin: 0, color: '#c7d2fe' }}>Redeem a reward and keep the momentum going.</p>
            </div>
          </div>

          <RewardStore rewards={rewards} points={points} onRedeem={handleRedeem} />
        </section>
      </main>
    </div>
  );
}
