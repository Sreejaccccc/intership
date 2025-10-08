import React, { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your friendly assistant. How can I help you with your loan questions today? 🤖", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const chatBodyRef = useRef(null);

  // Automatically scroll to the bottom when new messages are added
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);
  
  // The core logic for the bot's responses
  const getBotResponse = (userInput) => {
    const lowerCaseInput = userInput.toLowerCase();

    if (lowerCaseInput.includes('hello') || lowerCaseInput.includes('hi')) {
      return "Hello there! How can I assist you with our loan services?";
    }
    if (lowerCaseInput.includes('apply') || lowerCaseInput.includes('loan')) {
      return "To apply for a loan, please log in as an employee and navigate to the 'Apply for Loan' section from your dashboard.";
    }
    if (lowerCaseInput.includes('status')) {
      return "You can check your loan application status on the 'Loan Details' page after logging in.";
    }
    if (lowerCaseInput.includes('help') || lowerCaseInput.includes('support')) {
        return "I can help with questions about applying for a loan or checking your status. What do you need help with?";
    }
     if (lowerCaseInput.includes('contact')) {
        return "For further assistance, you can contact our support team at support@company.com.";
    }

    return "I'm sorry, I don't quite understand. You can ask me about how to 'apply for a loan' or check your 'status'.";
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const userMessage = { text: inputValue, sender: 'user' };
    const botResponse = { text: getBotResponse(inputValue), sender: 'bot' };

    setMessages([...messages, userMessage, botResponse]);
    setInputValue('');
  };

  // --- Styles ---
  const styles = {
    chatIcon: {
      position: 'fixed',
      bottom: '25px',
      right: '25px',
      width: '60px',
      height: '60px',
      backgroundColor: '#007bff',
      color: 'white',
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '24px',
      cursor: 'pointer',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      zIndex: 1000,
    },
    chatWindow: {
      position: 'fixed',
      bottom: '100px',
      right: '25px',
      width: '350px',
      height: '450px',
      backgroundColor: 'white',
      borderRadius: '15px',
      boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      zIndex: 1000,
    },
    header: {
      backgroundColor: '#007bff',
      color: 'white',
      padding: '1rem',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    body: {
      flex: 1,
      padding: '1rem',
      overflowY: 'auto',
      backgroundColor: '#f4f7f9',
    },
    message: {
      marginBottom: '1rem',
      maxWidth: '80%',
      padding: '0.6rem 0.9rem',
      borderRadius: '18px',
      lineHeight: '1.4',
    },
    botMessage: {
      backgroundColor: '#e9e9eb',
      color: '#333',
      alignSelf: 'flex-start',
    },
    userMessage: {
      backgroundColor: '#007bff',
      color: 'white',
      marginLeft: 'auto', // Pushes user message to the right
    },
    footer: {
      padding: '0.5rem',
      borderTop: '1px solid #ddd',
    },
    form: {
      display: 'flex',
      gap: '0.5rem',
    },
    input: {
      flex: 1,
      padding: '0.8rem',
      border: '1px solid #ccc',
      borderRadius: '20px',
      outline: 'none',
    },
    button: {
      padding: '0.8rem 1rem',
      border: 'none',
      backgroundColor: '#007bff',
      color: 'white',
      borderRadius: '20px',
      cursor: 'pointer',
    }
  };

  return (
    <>
      <div style={styles.chatIcon} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'X' : '💬'}
      </div>

      {isOpen && (
        <div style={styles.chatWindow}>
          <div style={styles.header}>Loan Support Chat</div>
          <div style={styles.body} ref={chatBodyRef}>
             {messages.map((msg, index) => (
              <div key={index} style={{ display: 'flex' }}>
                 <div style={{
                    ...styles.message,
                    ...(msg.sender === 'bot' ? styles.botMessage : styles.userMessage)
                 }}>
                   {msg.text}
                 </div>
              </div>
            ))}
          </div>
          <div style={styles.footer}>
            <form onSubmit={handleSendMessage} style={styles.form}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                style={styles.input}
                placeholder="Ask a question..."
              />
              <button type="submit" style={styles.button}>Send</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;