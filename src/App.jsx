import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import './App.css'

// A simple protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white'}}>Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Main App Dashboard Placeholder
function Dashboard() {
  const { user, logout } = useAuth();
  
  return (
    <div style={{ padding: '2rem', color: 'white', maxWidth: '800px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1>🚀 Extrinsic Motivator</h1>
      <div style={{ background: 'rgba(30, 41, 59, 0.7)', padding: '2rem', borderRadius: '16px', marginTop: '2rem', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
        <h2>Hello, {user?.username || user?.name || 'Achiever'} 👋</h2>
        <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>
          You have successfully authenticated with the full-stack system! You are now ready to start tracking goals and earning rewards.
        </p>
        <button 
          onClick={logout}
          style={{
            background: '#ef4444', 
            color: 'white', 
            border: 'none', 
            padding: '0.75rem 1.5rem', 
            borderRadius: '8px',
            marginTop: '1.5rem',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'background 0.2s'
          }}
          onMouseOver={(e) => e.target.style.background = '#dc2626'}
          onMouseOut={(e) => e.target.style.background = '#ef4444'}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
    </Routes>
  )
}

export default App
