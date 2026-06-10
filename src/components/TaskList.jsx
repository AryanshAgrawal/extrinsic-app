import { CheckCircle2, Circle } from 'lucide-react';

export default function TaskList({ tasks = [], onToggle }) {
  return (
    <div style={{
      background: 'rgba(30, 41, 59, 0.75)',
      padding: '1.5rem',
      borderRadius: '16px',
      border: '1px solid rgba(255,255,255,0.1)',
      backdropFilter: 'blur(10px)',
    }}>
      <h2 style={{ color: 'white', fontSize: '1.35rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        📝 Daily Goals
      </h2>

      {!tasks.length ? (
        <p style={{ color: '#94a3b8', margin: 0 }}>No tasks available yet. Complete a task to earn points.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => onToggle?.(task.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem',
                background: task.completed ? 'rgba(16, 185, 129, 0.1)' : 'rgba(15, 23, 42, 0.5)',
                border: `1px solid ${task.completed ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                opacity: task.completed ? 0.78 : 1,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ color: task.completed ? '#10b981' : '#64748b' }}>
                  {task.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                </div>
                <div>
                  <p style={{
                    margin: 0,
                    color: task.completed ? '#cbd5e1' : 'white',
                    textDecoration: task.completed ? 'line-through' : 'none',
                    fontWeight: 600,
                  }}>
                    {task.title}
                  </p>
                  <p style={{ margin: '0.35rem 0 0', color: '#94a3b8', fontSize: '0.9rem' }}>{task.category || 'General'}</p>
                </div>
              </div>
              <div style={{
                background: task.completed ? 'transparent' : 'rgba(16, 185, 129, 0.18)',
                color: task.completed ? '#94a3b8' : '#34d399',
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.9rem',
                fontWeight: 700,
              }}>
                +{task.points} pts
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
