import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoanApplicationPage = () => {
  const [requestedAmount, setRequestedAmount] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    try {
      const userEmail = localStorage.getItem('userEmail');
      if (!userEmail) {
        throw new Error('You must be logged in to apply for a loan.');
      }

      const response = await fetch('http://localhost:5000/apply-loan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, requestedAmount }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      setSuccess('Application submitted! Redirecting to your loan details...');
      setTimeout(() => navigate('/loan-details'), 2500);

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    // JSX for the application form...
     <div style={styles.container}>
      <h2>Apply for a New Loan</h2>
      <p style={styles.subtitle}>Enter the amount you would like to request.</p>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <span style={styles.currencySymbol}>$</span>
          <input
            type="number"
            placeholder="5000.00"
            value={requestedAmount}
            onChange={(e) => setRequestedAmount(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.button}>Submit Application</button>
      </form>
      {error && <p style={{ ...styles.message, color: 'red' }}>{error}</p>}
      {success && <p style={{ ...styles.message, color: 'green' }}>{success}</p>}
    </div>
  );
};

// Styles for the application form...
 const styles = {
    container: { display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'sans-serif', padding: '2rem' },
    subtitle: { color: '#555', marginTop: '-1rem' },
    form: { display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px', alignItems: 'center' },
    inputGroup: { display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '5px' },
    currencySymbol: { padding: '0 1rem', fontSize: '1.2rem', color: '#777' },
    input: { padding: '0.8rem', fontSize: '1.2rem', border: 'none', outline: 'none', width: '100%' },
    button: { padding: '0.8rem', fontSize: '1rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%' },
    message: { textAlign: 'center', fontWeight: 'bold', marginTop: '1rem' },
};

export default LoanApplicationPage;