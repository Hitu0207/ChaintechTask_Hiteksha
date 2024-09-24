import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/'); // Navigate to the register page
  };

  const handleLogin = () => {
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div>
      <nav className="navbar bg-body-tertiary">
        <form className="container-fluid justify-content-end">
          <button className="btn btn-outline-success me-2" type="button" onClick={handleRegister}>
            Register
          </button>
          <button className="btn btn-outline-success me-2" type="button" onClick={handleLogin}>
            Login
          </button>
        </form>
      </nav>
    </div>
  );
}

export default Navbar;
