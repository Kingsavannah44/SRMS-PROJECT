import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="grid grid-2">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Quick Actions</h3>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={() => navigate('/students')}>
                <span style={{ marginRight: '0.5rem' }}>👥</span>
                View Students
              </button>
              <button className="btn btn-success" onClick={() => navigate('/add-student')}>
                <span style={{ marginRight: '0.5rem' }}>➕</span>
                Add Student
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/analytics')}>
                <span style={{ marginRight: '0.5rem' }}>📊</span>
                View Reports
              </button>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">System Overview</h3>
          </div>
          <div className="card-body">
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Welcome to the Student Record Management System. Manage student records efficiently.
            </p>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">150</div>
                <div className="stat-label">Total Students</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">12</div>
                <div className="stat-label">Active Courses</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">95%</div>
                <div className="stat-label">Attendance Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;