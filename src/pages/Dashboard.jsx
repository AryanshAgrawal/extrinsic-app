import { useAuth } from '../context/AuthContext';
import { Trophy, Flame, Target, LogOut } from 'lucide-react';
import StatCard from '../components/StatCard';
import TaskList from '../components/TaskList';
import RewardStore from '../components/RewardStore';

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header section */}
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <div>
            <h1 style={{
              margin: 0,
              color: 'white',
              fontSize: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <span style={{ fontSize: '2.5rem' }}>🚀</span>
              Extrinsic Motivator
            </h1>
            <p style={{ color: '#94a3b8', margin: '0.5rem 0 0 0', fontSize: '1.1rem' }}>
              Welcome back, <strong>{user?.email?.split('@')[0] || 'Achiever'}</strong>!
            </p>
          </div>

          <button
            onClick={logout}
            style={{
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#ef4444',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
          >
            <LogOut size={18} />
            Logout
          </button>
        </header>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <StatCard
            title="Total Reward Points"
            value="1,250"
            icon={Trophy}
            trend="+150 this week"
          />
          <StatCard
            title="Current Streak"
            value="12 Days"
            icon={Flame}
          />
          <StatCard
            title="Tasks Completed"
            value="48"
            icon={Target}
          />
        </div>

        {/* Main Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          '@media (maxWidth: 768px)': {
            gridTemplateColumns: '1fr'
          }
        }}>
          <TaskList />
          <RewardStore />
        </div>

      </div>
    </div>
  );
}
