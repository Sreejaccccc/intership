import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data.message);
      }

      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/employee-login'), 2000);

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Register New Account</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} required />
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={styles.input} required />
        <button type="submit" style={styles.button}>Register</button>
      </form>
      {error && <p style={{ ...styles.message, color: 'red' }}>{error}</p>}
      {success && <p style={{ ...styles.message, color: 'green' }}>{success}</p>}
      <p style={styles.loginLink}>
        Already have an account? <Link to="/employee-login">Login here</Link>
      </p>
    </div>
  );
};

// --- Basic Styles ---
const styles = {
  container: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' },
  input: { padding: '0.8rem', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '5px' },
  button: { padding: '0.8rem', fontSize: '1rem', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' },
  message: { textAlign: 'center', fontWeight: 'bold', marginTop: '1rem' },
  loginLink: { marginTop: '1.5rem' },
};

export default RegisterPage;