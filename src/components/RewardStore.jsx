import { ShoppingBag, Gift } from 'lucide-react';

export default function RewardStore({ rewards = [], points = 0, onRedeem }) {
  return (
    <div style={{
      background: 'rgba(30, 41, 59, 0.75)',
      padding: '1.5rem',
      borderRadius: '16px',
      border: '1px solid rgba(255,255,255,0.1)',
      backdropFilter: 'blur(10px)',
    }}>
      <h2 style={{ color: 'white', fontSize: '1.35rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <ShoppingBag size={20} color="#8b5cf6" />
        Rewards Store
      </h2>

      <div style={{ marginBottom: '1.25rem', color: '#94a3b8' }}>
        {rewards.length ? `Spend your points on rewards and track your redemptions.` : 'No rewards are available at the moment.'}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1rem',
      }}>
        {rewards.map((reward) => {
          const disabled = reward.redeemed || reward.cost > points;
          return (
            <div
              key={reward.id}
              style={{
                background: 'rgba(15, 23, 42, 0.5)',
                border: '1px solid rgba(139, 92, 246, 0.2)',
                borderRadius: '12px',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '1rem',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(139, 92, 246, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '2.5rem' }}>{reward.icon}</div>
              <h3 style={{ color: 'white', fontSize: '1rem', fontWeight: '500', margin: 0 }}>{reward.title}</h3>
              <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.95rem' }}>{reward.description}</p>
              <button
                type="button"
                disabled={disabled}
                onClick={() => onRedeem?.(reward.id)}
                style={{
                  marginTop: 'auto',
                  width: '100%',
                  background: disabled ? 'rgba(100, 116, 139, 0.25)' : 'linear-gradient(to right, #8b5cf6, #d946ef)',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  cursor: disabled ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '0.5rem',
                  opacity: disabled ? 0.7 : 1,
                  transition: 'opacity 0.2s',
                }}
              >
                <Gift size={16} />
                {reward.redeemed ? 'Redeemed' : `-${reward.cost} pts`}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
