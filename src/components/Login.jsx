// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../style/Login.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');

  const navigate = useNavigate();

  // Function to validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const lowercaseEmail = e.target.value.toLowerCase(); // Convert email to lowercase
    setEmail(lowercaseEmail);

    // Validate email format
    if (!validateEmail(lowercaseEmail)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Validate email and password before login
    if (!validateEmail(email)) {
      alert('Please enter a valid email.');
      return;
    }
    
    if (password.trim() === '') {
      alert('Please enter your password.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.email === email && user.password === password);

    if (userExists) {
      navigate('/home');
    } else {
      alert('User not found or incorrect credentials');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2 className="form-title">Login</h2>

        <div className="form-group">
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={handleEmailChange} 
            required 
            className="form-input"
          />
          {emailError && <p className="error_text_p">{emailError}</p>} {/* Display email error */}
        </div>

        <div className="form-group">
          <input 
            type={showPassword ? 'text' : 'password'}
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className="form-input"
          />
        </div>

        <div className="form-group show-password">
          <input 
            type="checkbox" 
            id="showPassword" 
            checked={showPassword} 
            onChange={() => setShowPassword(!showPassword)} 
          />
          <label htmlFor="showPassword">Show Password</label>
        </div>

        <button type="submit" className="form-button">Login</button>

        <div className="login-links">
          <p>
            Forgot Username / Password?
          </p>
          <p>
            Don't have an account? 
            <Link to="/" className="signup-link"> Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
