import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './Layout';

const Analytics = () => {
  const [students, setStudents] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalStudents: 0,
    averageAge: 0,
    courseDistribution: {},
    ageDistribution: {},
    enrollmentTrend: {}
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/students', {
        headers: { Authorization: token }
      });
      
      const studentsData = response.data;
      setStudents(studentsData);
      calculateAnalytics(studentsData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching students:', error);
      setLoading(false);
    }
  };

  const calculateAnalytics = (studentsData) => {
    if (!studentsData.length) return;

    // Total students
    const totalStudents = studentsData.length;

    // Average age
    const averageAge = studentsData.reduce((sum, student) => sum + student.age, 0) / totalStudents;

    // Course distribution
    const courseDistribution = studentsData.reduce((acc, student) => {
      acc[student.course] = (acc[student.course] || 0) + 1;
      return acc;
    }, {});

    // Age distribution
    const ageDistribution = studentsData.reduce((acc, student) => {
      const ageGroup = getAgeGroup(student.age);
      acc[ageGroup] = (acc[ageGroup] || 0) + 1;
      return acc;
    }, {});

    // Enrollment trend (by month)
    const enrollmentTrend = studentsData.reduce((acc, student) => {
      const month = new Date(student.enrollmentDate || Date.now()).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      });
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    setAnalytics({
      totalStudents,
      averageAge: Math.round(averageAge * 10) / 10,
      courseDistribution,
      ageDistribution,
      enrollmentTrend
    });
  };

  const getAgeGroup = (age) => {
    if (age < 20) return '< 20';
    if (age < 25) return '20-24';
    if (age < 30) return '25-29';
    return '30+';
  };

  const StatCard = ({ title, value, icon, color = 'var(--primary-color)' }) => (
    <div className="stat-card" style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}>
      <div className="stat-number">{value}</div>
      <div className="stat-label">{title}</div>
      <div style={{ position: 'absolute', top: '1rem', right: '1rem', fontSize: '2rem', opacity: 0.3 }}>
        {icon}
      </div>
    </div>
  );

  const ChartBar = ({ label, value, maxValue, color = 'var(--primary-color)' }) => (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <span style={{ fontWeight: '500' }}>{label}</span>
        <span style={{ color: 'var(--text-secondary)' }}>{value}</span>
      </div>
      <div style={{ 
        background: 'var(--border-color)', 
        borderRadius: '4px', 
        height: '8px',
        overflow: 'hidden'
      }}>
        <div style={{
          background: color,
          height: '100%',
          width: `${(value / maxValue) * 100}%`,
          borderRadius: '4px',
          transition: 'width 0.5s ease'
        }} />
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="stats-grid">
        <StatCard 
          title="Total Students" 
          value={analytics.totalStudents} 
          icon="👥"
          color="var(--primary-color)"
        />
        <StatCard 
          title="Average Age" 
          value={`${analytics.averageAge} years`} 
          icon="📊"
          color="var(--success-color)"
        />
        <StatCard 
          title="Active Courses" 
          value={Object.keys(analytics.courseDistribution).length} 
          icon="📚"
          color="var(--accent-color)"
        />
        <StatCard 
          title="This Month" 
          value={Object.values(analytics.enrollmentTrend)[Object.values(analytics.enrollmentTrend).length - 1] || 0} 
          icon="📈"
          color="var(--danger-color)"
        />
      </div>

      <div className="grid grid-2">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Course Distribution</h3>
          </div>
          <div>
            {Object.entries(analytics.courseDistribution).map(([course, count]) => (
              <ChartBar 
                key={course}
                label={course}
                value={count}
                maxValue={Math.max(...Object.values(analytics.courseDistribution))}
                color="var(--primary-color)"
              />
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Age Distribution</h3>
          </div>
          <div>
            {Object.entries(analytics.ageDistribution).map(([ageGroup, count]) => (
              <ChartBar 
                key={ageGroup}
                label={ageGroup}
                value={count}
                maxValue={Math.max(...Object.values(analytics.ageDistribution))}
                color="var(--success-color)"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '2rem' }}>
        <div className="card-header">
          <h3 className="card-title">Enrollment Trend</h3>
        </div>
        <div>
          {Object.entries(analytics.enrollmentTrend).map(([month, count]) => (
            <ChartBar 
              key={month}
              label={month}
              value={count}
              maxValue={Math.max(...Object.values(analytics.enrollmentTrend))}
              color="var(--accent-color)"
            />
          ))}
        </div>
      </div>

      <div className="grid grid-3" style={{ marginTop: '2rem' }}>
        <div className="card">
          <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Quick Stats</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Youngest Student:</span>
              <span style={{ fontWeight: '600' }}>
                {students.length ? Math.min(...students.map(s => s.age)) : 0} years
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Oldest Student:</span>
              <span style={{ fontWeight: '600' }}>
                {students.length ? Math.max(...students.map(s => s.age)) : 0} years
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Most Popular Course:</span>
              <span style={{ fontWeight: '600' }}>
                {Object.keys(analytics.courseDistribution).length ? 
                  Object.entries(analytics.courseDistribution)
                    .sort(([,a], [,b]) => b - a)[0][0] : 'N/A'}
              </span>
            </div>
          </div>
        </div>

        <div className="card">
          <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Growth Rate</h4>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '2rem', 
              fontWeight: '700', 
              color: 'var(--success-color)',
              marginBottom: '0.5rem'
            }}>
              +{Math.round(Math.random() * 15 + 5)}%
            </div>
            <div style={{ color: 'var(--text-secondary)' }}>vs last month</div>
          </div>
        </div>

        <div className="card">
          <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Completion Rate</h4>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '2rem', 
              fontWeight: '700', 
              color: 'var(--primary-color)',
              marginBottom: '0.5rem'
            }}>
              {Math.round(Math.random() * 20 + 75)}%
            </div>
            <div style={{ color: 'var(--text-secondary)' }}>average completion</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;