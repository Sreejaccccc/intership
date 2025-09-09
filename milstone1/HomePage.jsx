import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <p>Welcome to the company portal main page.</p>
  <p>
      Don't have an account? <Link to="/register">Register here</Link>.
    </p>
    </div>
);

export default HomePage;