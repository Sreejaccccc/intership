import React, { useState } from 'react';

// A simple component to display the found loan details from a search
const LoanDetailsDisplay = ({ details }) => {
  // ... (styles for this component)
  const displayStyles = { marginTop: '1.5rem', padding: '1.5rem', backgroundColor: '#f0f8ff', borderRadius: '8px' };
  const itemStyles = { display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #e0e0e0' };
  
  return (
    <div style={displayStyles}>
      <h3 style={{ marginTop: 0 }}>Search Result: {details.email}</h3>
      <div style={itemStyles}><strong>Loan ID:</strong> <span>{details.loanId}</span></div>
      <div style={itemStyles}><strong>Original Amount:</strong> <span>{details.originalLoanAmount}</span></div>
      <div style={itemStyles}><strong>Remaining Balance:</strong> <span style={{fontWeight: 'bold'}}>{details.remainingBalance}</span></div>
    </div>
  );
};


const AdminDashboard = () => {
  // --- State for the "Add Loan" Form ---
  const [newLoanData, setNewLoanData] = useState({ email: '', loanId: '', originalLoanAmount: '', interestRate: '', remainingBalance: '', nextPaymentDate: '', nextPaymentAmount: '' });

  // --- State for the "Search Loan" Form ---
  const [emailToSearch, setEmailToSearch] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // --- Handler for "Add Loan" Form Input Changes ---
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewLoanData(prevData => ({ ...prevData, [name]: value }));
    
  };

  // --- Handler to Submit the "Add Loan" Form ---
  const handleAddLoan = async (event) => {
    event.preventDefault();
    console.log("data",newLoanData)
    try {
      const response = await fetch('http://localhost:5000/add-loan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLoanData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      setNewLoanData({ email: '', loanId: '', originalLoanAmount: '', interestRate: '', remainingBalance: '', nextPaymentDate: '', nextPaymentAmount: '' });
      alert('Loan added successfully!');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  // --- Handler to Submit the "Search Loan" Form ---
  const handleSearch = async (event) => {
    event.preventDefault();
    if (!emailToSearch) {
      setError('Please enter an email address to search.');
      return;
    }
    setIsLoading(true);
    setError('');
    setSearchResult(null);
    try {
      const response = await fetch(`http://localhost:5000/loan-details/${emailToSearch}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const data = await response.json();
      setSearchResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Admin Dashboard</h1>

      {/* --- Section to Add a New Loan --- */}
      <div style={styles.section}>
        <h2>Add a New Loan</h2>
        <form onSubmit={handleAddLoan}>
          <div style={styles.formGrid}>
            <input name="email" value={newLoanData.email} onChange={handleInputChange} placeholder="Employee Email" style={styles.input} required />
            <input name="loanId" value={newLoanData.loanId} onChange={handleInputChange} placeholder="Loan ID (e.g., LN-12345)" style={styles.input} required />
            <input name="originalLoanAmount" value={newLoanData.originalLoanAmount} onChange={handleInputChange} placeholder="Original Amount ($)" style={styles.input} />
            <input name="interestRate" value={newLoanData.interestRate} onChange={handleInputChange} placeholder="Interest Rate (%)" style={styles.input} />
            <input name="remainingBalance" value={newLoanData.remainingBalance} onChange={handleInputChange} placeholder="Remaining Balance ($)" style={styles.input} />
            <input name="nextPaymentDate" value={newLoanData.nextPaymentDate} onChange={handleInputChange} placeholder="Next Payment Date" style={styles.input} />
            <input name="nextPaymentAmount" value={newLoanData.nextPaymentAmount} onChange={handleInputChange} placeholder="Next Payment Amount ($)" style={styles.input} />
          </div>
          <button type="submit" style={styles.buttonAdd}>Add Loan</button>
        </form>
      </div>

      <hr style={styles.hr} />

      {/* --- Section to Search for a Loan --- */}
      <div style={styles.section}>
        <h2>Search for an Existing Loan</h2>
        <form onSubmit={handleSearch} style={styles.formSingle}>
          <input type="email" value={emailToSearch} onChange={(e) => setEmailToSearch(e.target.value)} placeholder="Enter employee's email" style={styles.input} required />
          <button type="submit" style={styles.buttonSearch} disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </form>
        <div style={styles.resultsContainer}>
          {error && <p style={styles.errorText}>{error}</p>}
          {searchResult && <LoanDetailsDisplay details={searchResult} />}
        </div>
      </div>
    </div>
  );
};

// --- Basic Styles ---
const styles = {
    container: { padding: '2rem', maxWidth: '800px', margin: 'auto', fontFamily: 'sans-serif' },
    title: { textAlign: 'center', color: '#333' },
    section: { marginBottom: '2rem', padding: '2rem', border: '1px solid #ddd', borderRadius: '8px' },
    hr: { border: 'none', borderTop: '1px solid #eee', margin: '3rem 0' },
    formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
    formSingle: { display: 'flex', gap: '1rem', justifyContent: 'center' },
    input: { width: '100%', boxSizing: 'border-box', padding: '0.8rem', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '5px' },
    buttonAdd: { marginTop: '1rem', padding: '0.8rem 1.5rem', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1rem' },
    buttonSearch: { padding: '0.8rem 1.5rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1rem' },
    resultsContainer: { marginTop: '1rem' },
    errorText: { color: 'red', fontWeight: 'bold', textAlign: 'center' },
};

export default AdminDashboard;