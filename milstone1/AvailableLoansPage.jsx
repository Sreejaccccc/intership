import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AvailableLoansPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // 1. Fetch the available loan products when the page loads
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/loan-products');
        if (!response.ok) {
          throw new Error('Could not fetch loan products.');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // 2. Handle the application when a user clicks a button
  const handleApply = async (product) => {
    // For simplicity, we'll apply for the maximum amount of the chosen loan
    const requestedAmount = product.maxAmount;
    navigate('/employee-loan-form');
    /*const handleApplyClick = () => {
   
  };*/
    
  /* try {
      const userEmail = localStorage.getItem('userEmail');
      if (!userEmail) {
        throw new Error('You must be logged in to apply.');
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
      
      alert(`Successfully applied for the ${product.title}! Redirecting...`);
      navigate('/loan-details');

    } catch (err) {
      alert(`Error: ${err.message}`);
    }*/
  };

  if (isLoading) {
    return <div style={styles.container}><h2>Loading available loans...</h2></div>;
  }
  
  if (error) {
    return <div style={styles.container}><h2>{error}</h2></div>;
  }

  // 3. Render the list of products as cards
  return (
    <div style={styles.container}>
      <h1 style={styles.mainTitle}>Choose Your Loan</h1>
      <p style={styles.subtitle}>Select one of the options below to start your application.</p>
      <div style={styles.grid}>
        {products.map(product => (
          <div key={product.id} style={styles.card}>
            <h3 style={styles.cardTitle}>{product.title}</h3>
            <p style={styles.cardDescription}>{product.description}</p>
            <div style={styles.details}>
              <span>Interest Rate: <strong>{product.interestRate}</strong></span>
              <span>Max Amount: <strong>${product.maxAmount.toLocaleString()}</strong></span>
              <span>Term: <strong>{product.term}</strong></span>
            </div>
            <button style={styles.applyButton} onClick={() => handleApply(product)}>
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};


// --- Styles ---
const styles = {
  container: { padding: '2rem', fontFamily: 'system-ui, sans-serif' },
  mainTitle: { textAlign: 'center', color: '#1a202c' },
  subtitle: { textAlign: 'center', color: '#718096', marginTop: '-1rem', marginBottom: '3rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' },
  card: { backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '2rem', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' },
  cardTitle: { margin: '0 0 0.5rem 0', color: '#2d3748', fontSize: '1.5rem' },
  cardDescription: { color: '#4a5568', flexGrow: 1, marginBottom: '1.5rem' },
  details: { display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.9rem', color: '#718096' },
  applyButton: { backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '8px', padding: '0.8rem 1.5rem', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold', alignSelf: 'flex-start' }
};

export default AvailableLoansPage;