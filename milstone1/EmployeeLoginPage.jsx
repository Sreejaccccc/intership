import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      const response = await fetch('http://localhost:5000/login', {


        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Login successful!');
        
        // ✅ 1. Get the email from the successful response
        const userEmail = data.email; 
         localStorage.setItem('userEmail', userEmail);
         console.log("testing  data not comming",data)
        if(data.isAdmin)
        {

            navigate('/admin-dashboard'); 
        }
        else
        {
           navigate('/loan-details'); 
        }

      } else {
        alert(`Login failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again.');
    }
  };

  // --- Styles (no changes needed) ---
  const formStyles = { /* ... */ };
  const inputStyles = { /* ... */ };
  const buttonStyles = { /* ... */ };

  return (
    <div>
      <h2>Employee Login</h2>
      <form onSubmit={handleSubmit} style={formStyles}>
        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>Email Address</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyles} required />
        </div>
        <div>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyles} required />
        </div>
        <button type="submit" style={buttonStyles}>Login</button>
      </form>
    </div>
  );
};

export default EmployeeLoginPage;
