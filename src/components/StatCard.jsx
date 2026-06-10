import { TrendingUp } from 'lucide-react';

export default function StatCard({ title, value, icon: Icon, trend }) {
  return (
    <div style={{
      background: 'rgba(30, 41, 59, 0.7)',
      padding: '1.5rem',
      borderRadius: '16px',
      border: '1px solid rgba(255,255,255,0.1)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      transition: 'transform 0.2s',
      cursor: 'default',
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#94a3b8' }}>
        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '500' }}>{title}</h3>
        {Icon && <Icon size={20} />}
      </div>
      
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem' }}>
        <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'white', lineHeight: 1 }}>{value}</span>
        {trend && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#10b981', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem' }}>
            <TrendingUp size={16} />
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
