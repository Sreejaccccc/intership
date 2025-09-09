import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LoanDetailsPage = () => {
  // State to hold the loan data, loading status, and any errors
  const [loanDetails, setLoanDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // This effect runs once when the component loads
  useEffect(() => {
    const fetchLoanDetails = async () => {
      try {
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) {
          throw new Error('No user email found. Please log in again.');
        }

        const response = await fetch(`http://localhost:5000/loan-details/${userEmail}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch details');
        }

        const data = await response.json();
        setLoanDetails(data);

      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLoanDetails();
  }, []);

  // Show a loading message while fetching
  if (isLoading) {
    return <div style={styles.messageContainer}><h1>Loading Your Account Details...</h1></div>;
  }

  // If there's an error (meaning NO LOAN was found), show the "Apply" button
  if (error) {
    return (
      <div style={styles.messageContainer}>
        <div style={styles.cardStyles}>
            <h1>No Active Loan Found</h1>
            <p style={{color: '#555'}}>{error}</p>
            <Link to="/apply-loan">
              <button style={styles.applyButton}>
                Apply for a New Loan
              </button>
            </Link>
        </div>
      </div>
    );
  }

  // If loan details exist, show the summary card AND the apply button
  if (loanDetails) {
    return (
      // Use a React Fragment to return multiple elements
      <>
        {/* --- Existing Loan Details Card --- */}
        <div style={styles.cardStyles}>
          <header style={styles.headerStyles}>
            <h2 style={styles.titleStyles}>Your Loan Summary</h2>
            <p style={styles.loanIdStyles}>Loan ID: {loanDetails.loanId}</p>
          </header>
          <div style={styles.gridStyles}>
            <div style={styles.detailItemStyles}><span style={styles.labelStyles}>Original Amount</span><span style={styles.valueStyles}>{loanDetails.originalLoanAmount}</span></div>
            <div style={styles.detailItemStyles}><span style={styles.labelStyles}>Interest Rate</span><span style={styles.valueStyles}>{loanDetails.interestRate}</span></div>
            <div style={styles.detailItemStyles}><span style={styles.labelStyles}>Next Payment Date</span><span style={styles.valueStyles}>{loanDetails.nextPaymentDate}</span></div>
            <div style={styles.detailItemStyles}><span style={styles.labelStyles}>Next Payment Amount</span><span style={styles.valueStyles}>{loanDetails.nextPaymentAmount}</span></div>
          </div>
          <div style={styles.highlightSectionStyles}>
            <p style={styles.labelStyles}>Remaining Balance</p>
            <h3 style={styles.highlightAmountStyles}>{loanDetails.remainingBalance}</h3>
          </div>
        </div>

        {/* ✅ NEW: Add a section with a link to apply for another loan */}
        <div style={styles.messageContainer}>
            <p>Need additional funds?</p>
            <Link to="/apply-loan">
                <button style={styles.applyButton}>Apply for a New Loan</button>
            </Link>
        </div>
      </>
    );
  }

  return <div style={styles.messageContainer}>Welcome to your dashboard.</div>;
};

// --- Styles ---
const styles = {
    cardStyles: { backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)', padding: '2rem', maxWidth: '550px', margin: '2rem auto', fontFamily: 'system-ui, sans-serif' },
    headerStyles: { textAlign: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #f0f0f0' },
    titleStyles: { color: '#1a202c', margin: 0, fontSize: '1.5rem' },
    loanIdStyles: { color: '#718096', fontSize: '0.9rem', marginTop: '0.25rem' },
    gridStyles: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' },
    detailItemStyles: { display: 'flex', flexDirection: 'column' },
    labelStyles: { color: '#a0aec0', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.25rem' },
    valueStyles: { color: '#2d3748', fontSize: '1.1rem', fontWeight: '600' },
    highlightSectionStyles: { backgroundColor: '#f7fafc', borderRadius: '8px', padding: '1.5rem', textAlign: 'center' },
    highlightAmountStyles: { color: '#28a745', fontSize: '2.5rem', fontWeight: 'bold', margin: 0 },
    messageContainer: { textAlign: 'center', fontFamily: 'sans-serif', padding: '2rem' },
    applyButton: { padding: '0.8rem 1.5rem', fontSize: '1rem', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '1rem' }
};

export default LoanDetailsPage;