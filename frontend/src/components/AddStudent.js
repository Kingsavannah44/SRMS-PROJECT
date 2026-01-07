import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';

const AddStudent = () => {
  const [student, setStudent] = useState({
    name: '',
    email: '',
    age: '',
    course: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/students', student, {
        headers: { Authorization: token }
      });
      navigate('/students');
    } catch (error) {
      alert('Error adding student');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Add New Student</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-2">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter student's full name"
                value={student.name}
                onChange={(e) => setStudent({...student, name: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                placeholder="Enter email address"
                value={student.email}
                onChange={(e) => setStudent({...student, email: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Age</label>
              <input
                type="number"
                className="form-input"
                placeholder="Enter age"
                value={student.age}
                onChange={(e) => setStudent({...student, age: e.target.value})}
                required
                min="1"
                max="100"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Course</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter course name"
                value={student.course}
                onChange={(e) => setStudent({...student, course: e.target.value})}
                required
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Adding...' : 'Add Student'}
            </button>
            <button type="button" className="btn btn-outline" onClick={() => navigate('/students')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddStudent;