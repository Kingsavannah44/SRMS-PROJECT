import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/students', label: 'Students', icon: '👥' },
    { path: '/add-student', label: 'Add Student', icon: '➕' },
    { path: '/analytics', label: 'Analytics', icon: '📈' },
    { path: '/settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="nav-brand">
          <h1>SRMS</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
            Student Record Management
          </p>
        </div>
        
        <nav>
          <ul className="nav-menu">
            {navItems.map((item) => (
              <li key={item.path} className="nav-item">
                <Link 
                  to={item.path} 
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div style={{ position: 'absolute', bottom: '2rem', left: '1rem', right: '1rem' }}>
          <button 
            onClick={handleLogout}
            className="btn btn-outline"
            style={{ width: '100%' }}
          >
            <span className="nav-icon">🚪</span>
            Logout
          </button>
        </div>
      </aside>

      <header className="header">
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>
            {navItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
          </h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ color: 'var(--text-secondary)' }}>
            Welcome, Admin
          </span>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            borderRadius: '50%', 
            background: 'var(--primary-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: '600'
          }}>
            A
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="content-area fade-in">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;