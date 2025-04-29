import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };
  
  return (
    <nav className="navbar">
      <div className="logo">Resume Analyzer</div>
      <ul>
        {user.email ? (
          <>
            <li>
              <span className="welcome-message">Welcome, {user.name}</span>
            </li>
            <li>
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;