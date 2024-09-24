import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import '../style/Register.css'; 

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  // Function to validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Handle email input change
  const handleEmailChange = (e) => {
    const lowercaseEmail = e.target.value.toLowerCase(); // Convert email to lowercase
    setEmail(lowercaseEmail);

    // Validate email format
    if (!validateEmail(lowercaseEmail)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError(''); // Clear error if valid email entered
    }
  };

  // Handle password input change
  const handlePasswordChange = (e) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);

    // Password Validation
    if (inputPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters');
    } else {
      setPasswordError(''); // Clear error if valid password entered
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate email and password before submission
    if (!validateEmail(email)) {
      alert('Please enter a valid email.');
      return;
    }
    if (password.length < 8) {
      alert('Please enter a valid password.');
      return;
    }

    const user = { id: uuidv4(), username, email, password };
    const users = JSON.parse(localStorage.getItem('users')) || [];
    localStorage.setItem('users', JSON.stringify([...users, user]));
    alert('Successfully registered');
    navigate('/login');
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2 className="form-title">Create Account</h2>

        <div className="form-group">
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
            className="form-input"
          />
        </div>

        <div className="form-group">
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={handleEmailChange} 
            required 
            className="form-input"
          />
          {emailError && <p className="error_text_p">{emailError}</p>}
        </div>

        <div className="form-group">
          <input 
            type={showPassword ? 'text' : 'password'}
            placeholder="Password" 
            value={password} 
            onChange={handlePasswordChange} 
            required 
            className="form-input"
          />
          {passwordError && <p className="error-text">{passwordError}</p>} {/* Display password error for minimum 8 char required */}
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

        <button type="submit" className="form-button" disabled={!!emailError || !!passwordError}>Register</button>

        <div className="already-registered">
          <p>Already Registered?</p>
          <Link to="/login" className="login-link">
            <button type="button" className="form-button">Login</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
