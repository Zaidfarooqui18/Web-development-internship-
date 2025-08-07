import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Welcome to your Dashboard!</h1>
      <p>You are successfully logged in.</p>
      <button onClick={handleLogout} style={{ marginTop: '1rem', padding: '10px 20px', cursor: 'pointer' }}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;