import { useEffect, useState } from 'react';
import { Sparkles, ListChecks, Gift, User2 } from 'lucide-react';
import api from '../lib/api';
import TopNav from '../components/TopNav';
import TaskList from '../components/TaskList';
import RewardStore from '../components/RewardStore';

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [profileRes, tasksRes, rewardsRes] = await Promise.all([
          api.get('/api/me/profile'),
          api.get('/api/tasks'),
          api.get('/api/rewards'),
        ]);

        setProfile(profileRes.data);
        setTasks(tasksRes.data.tasks);
        setRewards(rewardsRes.data.rewards);
      } catch (err) {
        console.error('Failed to load dashboard data', err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleToggle = async (taskId) => {
    try {
      const res = await api.post(`/api/tasks/${taskId}/toggle`);
      setTasks(res.data.tasks);
      setProfile((prev) => ({ ...(prev || {}), points: res.data.points }));
    } catch (err) {
      console.error('Could not update task', err);
    }
  };

  const handleRedeem = async (rewardId) => {
    try {
      const res = await api.post('/api/rewards/redeem', { rewardId });
      setRewards(res.data.rewards);
      setProfile((prev) => ({ ...(prev || {}), points: res.data.points }));
    } catch (err) {
      console.error('Could not redeem reward', err);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#020617', color: 'white' }}>
      <TopNav />
      <main style={{ padding: '2rem 1.5rem 3rem', maxWidth: '1320px', margin: '0 auto' }}>
        <section style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <p style={{ margin: 0, color: '#94a3b8' }}>Welcome back</p>
                <h1 style={{ margin: '0.5rem 0 0', fontSize: '2.5rem' }}>Your motivation dashboard</h1>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(15, 23, 42, 0.95)', borderRadius: '18px', padding: '1rem 1.25rem' }}>
                <Sparkles size={24} color="#a855f7" />
                <div>
                  <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.85rem' }}>Available points</p>
                  <p style={{ margin: 0, fontSize: '1.75rem', fontWeight: 700 }}>{loading ? '...' : profile?.points ?? 0}</p>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <div style={cardStyle}>
                <div style={cardIcon}> <ListChecks size={24} /> </div>
                <div>
                  <p style={cardLabel}>Active tasks</p>
                  <p style={cardValue}>{tasks.filter((task) => !task.completed).length}</p>
                </div>
              </div>
              <div style={cardStyle}>
                <div style={cardIcon}> <Gift size={24} /> </div>
                <div>
                  <p style={cardLabel}>Rewards available</p>
                  <p style={cardValue}>{rewards.length}</p>
                </div>
              </div>
              <div style={cardStyle}>
                <div style={cardIcon}> <User2 size={24} /> </div>
                <div>
                  <p style={cardLabel}>Logged in as</p>
                  <p style={cardValue}>{profile?.user?.username ?? 'You'}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: '1.65fr 1fr' }}>
          <TaskList tasks={tasks} onToggle={handleToggle} />
          <RewardStore rewards={rewards} points={profile?.points ?? 0} onRedeem={handleRedeem} />
        </section>
      </main>
    </div>
  );
}

const cardStyle = {
  background: 'rgba(15, 23, 42, 0.9)',
  borderRadius: '1rem',
  padding: '1.25rem',
  border: '1px solid rgba(255,255,255,0.08)',
};

const cardIcon = {
  width: '3rem',
  height: '3rem',
  display: 'grid',
  placeItems: 'center',
  borderRadius: '1rem',
  background: 'rgba(139, 92, 246, 0.15)',
  marginBottom: '1rem',
};

const cardLabel = {
  margin: 0,
  color: '#94a3b8',
  fontSize: '0.9rem',
};

const cardValue = {
  margin: '0.35rem 0 0',
  fontSize: '1.65rem',
  fontWeight: 700,
};
