import { useEffect, useState } from 'react';
import api from '../lib/api';
import TopNav from '../components/TopNav';
import TaskList from '../components/TaskList';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const taskRes = await api.get('/api/tasks');
        setTasks(taskRes.data.tasks);
        setPoints(taskRes.data.points);
      } catch (err) {
        console.error('Failed to load tasks', err);
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
      setPoints(res.data.points);
    } catch (err) {
      console.error('Could not update task', err);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#020617', color: 'white' }}>
      <TopNav />

      <main style={{ padding: '2rem 1.5rem 3rem', maxWidth: '1120px', margin: '0 auto' }}>
        <section style={{ marginBottom: '1.5rem' }}>
          <h1 style={{ margin: 0, fontSize: '2.2rem' }}>Task Manager</h1>
          <p style={{ margin: '0.75rem 0 0', color: '#94a3b8' }}>
            Track your tasks and earn points for every completed goal.
          </p>
        </section>

        <section style={{ display: 'grid', gap: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p style={{ margin: 0, color: '#94a3b8' }}>Current points</p>
              <p style={{ margin: '0.35rem 0 0', fontSize: '2rem', fontWeight: 700 }}>{loading ? '...' : points}</p>
            </div>
            <div style={{ background: 'rgba(15, 23, 42, 0.9)', padding: '1rem 1.25rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <p style={{ margin: 0, color: '#c7d2fe' }}>Tap any task to mark it complete.</p>
            </div>
          </div>

          <TaskList tasks={tasks} onToggle={handleToggle} />
        </section>
      </main>
    </div>
  );
}
