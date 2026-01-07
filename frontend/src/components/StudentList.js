import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from './Layout';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async (query = '') => {
    try {
      const token = localStorage.getItem('token');
      const url = query
        ? `http://localhost:5000/api/students/search?q=${encodeURIComponent(query)}`
        : 'http://localhost:5000/api/students';
      const response = await axios.get(url, {
        headers: { Authorization: token }
      });
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/students/${id}`, {
          headers: { Authorization: token }
        });
        fetchStudents(searchQuery); // Refresh the list with current search
      } catch (error) {
        alert('Error deleting student');
      }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchStudents(searchQuery);
  };

  if (loading) {
    return (
      <Layout>
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Student Records</h3>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ width: '200px', margin: 0 }}
              />
              <button type="submit" className="btn btn-outline">Search</button>
            </form>
            <button className="btn btn-primary" onClick={() => navigate('/add-student')}>
              <span style={{ marginRight: '0.5rem' }}>➕</span>
              Add New Student
            </button>
          </div>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Course</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.age}</td>
                  <td>{student.course}</td>
                  <td>
                    <button className="btn btn-outline" style={{ marginRight: '0.5rem' }} onClick={() => alert('Edit feature coming soon!')}>
                      ✏️ Edit
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDelete(student._id)}>
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {students.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
            No students found. Add your first student to get started.
          </div>
        )}
      </div>
    </Layout>
  );
};

export default StudentList;