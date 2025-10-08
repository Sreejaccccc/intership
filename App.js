import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link,useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import EmployeeLoginPage from './pages/EmployeeLoginPage.jsx';
import AdminLoginPage from './pages/AdminLoginPage.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import LoanDetailsPage from './pages/LoanDetailsPage.jsx';
 // 1. Import the new page
 import RegisterPage from './pages/RegisterPage.jsx';
//import LoanApplicationPage from './pages/LoanApplicationPage.jsx';

import AvailableLoansPage from './pages/AvailableLoansPage.jsx';

import './App.css';
import EmployeeDashboard from './pages/EmployeeDashboard.jsx';
import EmployeeLoanForm from './pages/EmployeeLoanForm.jsx';
// ... other imports

// --- Chatbot Component Defined Directly in App.js ---
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your friendly assistant. How can I help you today? 🤖",
      sender: 'bot',
      options: [
        { text: "Apply for a Loan", value: "apply" },
        { text: "Check Loan Status", value: "status" },
        { text: "Loan FAQs", value: "faq" },
      ],
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleBotResponse = (userInput) => {
    setIsTyping(true);
    setTimeout(() => {
      const lowerCaseInput = userInput.toLowerCase();
      let botResponse = {};

      if (lowerCaseInput.includes('apply')) {
        botResponse.text = "Great! To apply for a loan, please log in and navigate to the 'Apply for Loan' section from your dashboard.";
      } else if (lowerCaseInput.includes('status')) {
        botResponse.text = "You can check your loan application status on the 'Loan Details' page after logging in.";
      } else if (lowerCaseInput.includes('faq')) {
        botResponse.text = "Of course! What would you like to know?";
        botResponse.options = [
          { text: "What documents are needed?", value: "documents" },
          { text: "How long does approval take?", value: "approval_time" },
          { text: "What is the interest rate?", value: "interest_rate" },
        ];
      } else if (lowerCaseInput.includes('documents')) {
        botResponse.text = "Generally, you'll need proof of identity and income (like recent payslips).";
      } else if (lowerCaseInput.includes('approval_time')) {
        botResponse.text = "We aim to process applications within 5-7 business days after all required documents are submitted.";
      } else if (lowerCaseInput.includes('interest_rate')) {
        botResponse.text = "Interest rates depend on the loan product. You can view the rates for each option on the 'Available Loans' page.";
      } else {
        botResponse.text = "I'm sorry, I don't quite understand. Maybe try one of the main options?";
        botResponse.options = [
            { text: "Apply for a Loan", value: "apply" },
            { text: "Check Loan Status", value: "status" },
            { text: "Loan FAQs", value: "faq" },
        ];
      }
      
      setMessages((prev) => [...prev, { ...botResponse, sender: 'bot' }]);
      setIsTyping(false);
    }, 1200);
  };
  const handleUserMessage = (text, value) => {
    const userMessage = { text: text, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    handleBotResponse(value || text);
    setInputValue('');
  };

  const styles = { /* All style objects */
    chatIcon: { position: 'fixed', bottom: '25px', right: '25px', width: '60px', height: '60px', backgroundColor: '#007bff', color: 'white', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px', cursor: 'pointer', boxShadow: '0 4px 8px rgba(0,0,0,0.2)', zIndex: 1000 },
    chatWindow: { position: 'fixed', bottom: '100px', right: '25px', width: '350px', height: '450px', backgroundColor: 'white', borderRadius: '15px', boxShadow: '0 8px 16px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', overflow: 'hidden', zIndex: 1000 },
    header: { backgroundColor: '#007bff', color: 'white', padding: '1rem', fontWeight: 'bold', textAlign: 'center' },
    body: { flex: 1, padding: '1rem', overflowY: 'auto', backgroundColor: '#f4f7f9' },
    message: { marginBottom: '1rem', maxWidth: '80%', padding: '0.6rem 0.9rem', borderRadius: '18px', lineHeight: '1.4' },
    botMessage: { backgroundColor: '#e9e9eb', color: '#333', alignSelf: 'flex-start' },
    userMessage: { backgroundColor: '#007bff', color: 'white', marginLeft: 'auto' },
    footer: { padding: '0.5rem', borderTop: '1px solid #ddd' },
    form: { display: 'flex', gap: '0.5rem' },
    input: { flex: 1, padding: '0.8rem', border: '1px solid #ccc', borderRadius: '20px', outline: 'none' },
    button: { padding: '0.8rem 1rem', border: 'none', backgroundColor: '#007bff', color: 'white', borderRadius: '20px', cursor: 'pointer' },
    optionsContainer: { display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem', marginLeft: 'auto', justifyContent: 'flex-end', },
    optionButton: { backgroundColor: 'transparent', border: '1px solid #007bff', color: '#007bff', padding: '0.5rem 1rem', borderRadius: '20px', cursor: 'pointer', },
    typingIndicator: { display: 'flex', alignItems: 'center', backgroundColor: '#e9e9eb', width: 'fit-content', padding: '0.6rem 0.9rem', borderRadius: '18px', },
    typingDot: { height: '8px', width: '8px', backgroundColor: '#999', borderRadius: '50%', margin: '0 2px', animation: 'bounce 1.3s infinite', },
  };

  return (
    <>
      <style>{` @keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1.0); } } `}</style>
      <div style={styles.chatIcon} onClick={() => setIsOpen(!isOpen)}> {isOpen ? 'X' : '💬'} </div>
      {isOpen && ( <div style={styles.chatWindow}> <div style={styles.header}>Loan Support Chat</div> <div style={styles.body} ref={chatBodyRef}> {messages.map((msg, index) => ( <div key={index}> <div style={{ display: 'flex' }}> <div style={{...styles.message, ...(msg.sender === 'bot' ? styles.botMessage : styles.userMessage)}}> {msg.text} </div> </div> {msg.options && ( <div style={styles.optionsContainer}> {msg.options.map((opt, i) => ( <button key={i} style={styles.optionButton} onClick={() => handleUserMessage(opt.text, opt.value)}> {opt.text} </button> ))} </div> )} </div> ))} {isTyping && ( <div style={styles.typingIndicator}> <div style={{...styles.typingDot, animationDelay: '0s'}}></div> <div style={{...styles.typingDot, animationDelay: '0.2s'}}></div> <div style={{...styles.typingDot, animationDelay: '0.4s'}}></div> </div> )} </div> <div style={styles.footer}> <form onSubmit={(e) => { e.preventDefault(); handleUserMessage(inputValue); }} style={styles.form}> <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} style={styles.input} placeholder="Ask a question..."/> <button type="submit" style={styles.button}>Send</button> </form> </div> </div> )}
    </>
  );
};

// Component to manage the user key for resetting the chatbot
const AppContent = () => {
  const location = useLocation();
  const [userKey, setUserKey] = useState(localStorage.getItem('userEmail') || 'guest');

  useEffect(() => {
    const currentUser = localStorage.getItem('userEmail') || 'guest';
    if (currentUser !== userKey) {
      setUserKey(currentUser);
    }
  }, [location, userKey]);
 return (
    <div className="app">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/employee-login">Employee Login</Link>
        <Link to="/admin-login">Admin Login</Link>
      </nav>
      
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/employee-login" element={<EmployeeLoginPage />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/loan-details" element={<LoanDetailsPage />} />
          <Route path="/employee-dashboard" element={<EmployeeDashboard/>}/>
          <Route path="/register" element={<RegisterPage />}/>
          <Route path="/apply-loan" element={<AvailableLoansPage />} />
          <Route path="/employee-loan-form" element={<EmployeeLoanForm />} />
        </Routes>
      </main>
      
      {/* The key prop is what resets the chatbot */}
      <Chatbot key={userKey} />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;