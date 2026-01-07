import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './Layout';

const Settings = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [notifications, setNotifications] = useState(localStorage.getItem('notifications') === 'true');
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  const handleNotificationsChange = (enabled) => {
    setNotifications(enabled);
    localStorage.setItem('notifications', enabled);
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const handleExportData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/students', {
        headers: { Authorization: token }
      });
      const dataStr = JSON.stringify(response.data, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      const exportFileDefaultName = 'students_export.json';
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      alert('Data exported successfully!');
    } catch (error) {
      alert('Error exporting data');
    }
  };

  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const importedData = JSON.parse(e.target.result);
          const token = localStorage.getItem('token');
          for (const student of importedData) {
            await axios.post('http://localhost:5000/api/students', student, {
              headers: { Authorization: token }
            });
          }
          alert('Data imported successfully!');
        } catch (error) {
          alert('Error importing data');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleResetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      localStorage.removeItem('theme');
      localStorage.removeItem('notifications');
      localStorage.removeItem('language');
      setTheme('light');
      setNotifications(false);
      setLanguage('en');
      alert('Settings reset to default!');
    }
  };

  return (
    <Layout>
      <div className="grid grid-2">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Appearance</h3>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label className="form-label">Theme</label>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  className={`btn ${theme === 'light' ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => handleThemeChange('light')}
                >
                  Light
                </button>
                <button
                  className={`btn ${theme === 'dark' ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => handleThemeChange('dark')}
                >
                  Dark
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Preferences</h3>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label className="form-label">Language</label>
              <select
                className="form-input"
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => handleNotificationsChange(e.target.checked)}
                />
                Enable Notifications
              </label>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">System Information</h3>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Version:</span>
                <span style={{ fontWeight: '600' }}>1.0.0</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Last Updated:</span>
                <span style={{ fontWeight: '600' }}>{new Date().toLocaleDateString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Database:</span>
                <span style={{ fontWeight: '600' }}>MongoDB</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Actions</h3>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button className="btn btn-outline" style={{ width: '100%' }} onClick={handleExportData}>
                Export Data
              </button>
              <label className="btn btn-outline" style={{ width: '100%', cursor: 'pointer' }}>
                Import Data
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportData}
                  style={{ display: 'none' }}
                />
              </label>
              <button className="btn btn-danger" style={{ width: '100%' }} onClick={handleResetSettings}>
                Reset Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;