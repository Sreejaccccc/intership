import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
      // 1. Send credentials to your single /login endpoint
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        // 2. If login is successful, check if the user is an admin
        if (data.isAdmin) {
          // If they are an admin, navigate to the dashboard
          alert('Admin login successful!');
    console.log('Admin login successful for:', { email, password });
    // Navigate to the admin dashboard page
    navigate('/admin-dashboard');
    } else {
          // If they are a regular user, show an error
          alert('Login failed: This user is not an admin.');
        }
      } else {
        // Handle errors like wrong password or user not found
        alert(`Login failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again.');
    }
  };

  // --- Styles ---
  const formStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '300px',
  };
  const inputStyles = {
    padding: '0.8rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
  };
  const buttonStyles = {
    padding: '0.8rem',
    fontSize: '1rem',
    backgroundColor: '#282c34',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit} style={formStyles}>
        <div>
          <label htmlFor="admin-email" style={{ display: 'block', marginBottom: '0.5rem' }}>Admin Email</label>
          <input type="email" id="admin-email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyles} required />
        </div>
        <div>
          <label htmlFor="admin-password" style={{ display: 'block', marginBottom: '0.5rem' }}>Admin Password</label>
          <input type="password" id="admin-password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyles} required />
        </div>
        <button type="submit" style={buttonStyles}>Login</button>
      </form>
    </div>
  );
};

export default AdminLoginPage;