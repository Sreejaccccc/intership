import React from 'react';

const EmployeeDashboard = () => {
  // In a real app, this data would come from a server
  const employeeData = {
    id: 'E47781',
    name: 'Jane Doe',
    email: 'jane.doe@company.com',
    position: 'Senior Software Engineer',
    department: 'Technology',
    profilePic: 'https://placehold.co/150x150/61dafb/282c34?text=JD'
  };

  const handleLogout = () => {
    // In a real app, this would clear authentication tokens
    alert('You have been logged out.');
    // For this demo, we'll just navigate back home, but that requires more setup.
    // A simple alert is enough to show the button works.
  };

  // --- Styles ---
  const dashboardStyles = {
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
    maxWidth: '600px',
    margin: 'auto',
    textAlign: 'left',
  };

  const headerStyles = {
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #eee',
    paddingBottom: '1.5rem',
    marginBottom: '1.5rem',
  };

  const imgStyles = {
    borderRadius: '50%',
    marginRight: '1.5rem',
  };

  const infoStyles = {
    lineHeight: '1.8',
  };

  const buttonStyles = {
    marginTop: '2rem',
    padding: '0.8rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: '#d9534f', // A reddish color for logout
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };


  return (
    <div style={dashboardStyles}>
      <div style={headerStyles}>
        <img src={employeeData.profilePic} alt="Profile" style={imgStyles} />
        <div>
          <h1 style={{ margin: 0 }}>{employeeData.name}</h1>
          <p style={{ margin: 0, color: '#555' }}>{employeeData.position}</p>
        </div>
      </div>
      <div style={infoStyles}>
        <p><strong>Employee ID:</strong> {employeeData.id}</p>
        <p><strong>Email:</strong> {employeeData.email}</p>
        <p><strong>Department:</strong> {employeeData.department}</p>
      </div>
      <button onClick={handleLogout} style={buttonStyles}>Logout</button>
    </div>
  );
};

export default EmployeeDashboard;