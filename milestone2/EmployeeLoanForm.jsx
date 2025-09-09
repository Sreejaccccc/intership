//import React, { useState } from 'react';
import React, { useState, useEffect } from 'react';

const EmployeeLoanForm = () => {
  // State to hold the values from the form inputs
  const [employeeId, setEmployeeId] = useState('');
  const [salary, setSalary] = useState('');
  const [documentFile, setDocumentFile] = useState(null);
  const [fileName, setFileName] = useState('No file chosen');
  
  // NEW: State to store the response message from the server
  const [message, setMessage] = useState('');


  // This useEffect hook runs once and auto-fills ONLY the employeeId
  useEffect(() => {
    const loggedInUserEmail = localStorage.getItem('userEmail');
    if (loggedInUserEmail) {
      setEmployeeId(loggedInUserEmail);
    }
  }, []); 

  // Handler for the file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setDocumentFile(file);
      setFileName(file.name);
    }
  };

  // UPDATED: This is the main function that handles form submission
  
// In EmployeeLoanForm.jsx

const handleSubmit = async (event) => {
  event.preventDefault();
  setMessage('');

  if (!documentFile) {
    setMessage('Please select a file first.');
    return;
  }

  const formData = new FormData();
  formData.append('email', employeeId);
  formData.append('salary', salary);
  // UPDATED: Use the field name 'document'
  formData.append('document', documentFile);

  try {
    // UPDATED: Send the request to the correct '/apply-loan' endpoint
    const response = await fetch('http://localhost:5000/apply-loan', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (response.ok) {
      setMessage(`Success: ${result.message}`);
      // Clear the form
      setEmployeeId('');
      setSalary('');
      setDocumentFile(null);
      setFileName('No file chosen');
    } else {
      throw new Error(result.message || 'Application failed.');
    }
  } catch (error) {
    setMessage(`Error: ${error.message}`);
  }
};

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Employee Information</h2>
      {/* The form's onSubmit now correctly points to the handleSubmit function */}
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Employee ID Textbox */}
        <div style={styles.inputGroup}>
          <label htmlFor="employeeId" style={styles.label}>Employee ID</label>
          <input
            type="text"
            id="employeeId"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            style={styles.input}
            placeholder="e.g., E47781"
            required
          />
        </div>

        {/* Salary Textbox */}
        <div style={styles.inputGroup}>
          <label htmlFor="salary" style={styles.label}>Salary ($)</label>
          <input
            type="number"
            id="salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            style={styles.input}
            placeholder="e.g., 60000"
            required
          />
        </div>

        {/* Document Upload Control */}
        <div style={styles.inputGroup}>
          <label htmlFor="documentUpload" style={styles.label}>Upload Document</label>
          <input
            type="file"
            id="documentUpload"
            onChange={handleFileChange}
            style={styles.fileInput}
            required
          />
          <label htmlFor="documentUpload" style={styles.fileLabel}>
            Choose File
          </label>
          <span style={styles.fileName}>{fileName}</span>
        </div>

        <button type="submit" style={styles.submitButton}>Submit to Server</button>
      </form>
      
      {/* NEW: Display the message from the server */}
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

// --- Basic Styles ---
const styles = {
  container: {
    fontFamily: 'sans-serif',
    maxWidth: '500px',
    margin: '2rem auto',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
  },
  title: {
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '0.5rem',
    color: '#555',
    fontWeight: 'bold',
  },
  input: {
    padding: '0.8rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  fileInput: {
    display: 'none', 
  },
  fileLabel: {
    padding: '0.8rem 1.2rem',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ccc',
    borderRadius: '5px',
    cursor: 'pointer',
    textAlign: 'center',
  },
  fileName: {
    marginTop: '0.5rem',
    fontSize: '0.9rem',
    color: '#555',
  },
  submitButton: {
    marginTop: '1rem',
    padding: '0.9rem',
    fontSize: '1.1rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  message: {
    marginTop: '1rem',
    fontWeight: 'bold',
    textAlign: 'center',
  },
};


export default EmployeeLoanForm;