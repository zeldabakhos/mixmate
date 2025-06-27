import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaHome, 
  FaGlassMartiniAlt, 
  FaBoxOpen, 
  FaUserCircle, 
  FaSignOutAlt, 
 
} from 'react-icons/fa'; 
import './NavBar.css';

const NavBar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);  
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">Mixmate</Link>

        {/* Menu */}
        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <Link to="/" className="navbar-item" onClick={() => setIsMenuOpen(false)}>
              <FaHome style={{ marginRight: '5px' }} /> Home
            </Link>
          </li>

          {isLoggedIn ? (
            <>
              <li>
                <Link to="/myfridge" className="navbar-item" onClick={() => setIsMenuOpen(false)}>
                  <FaBoxOpen style={{ marginRight: '5px' }} /> My Fridge
                </Link>
              </li>
              <li>
                <Link to="/mydrinks" className="navbar-item" onClick={() => setIsMenuOpen(false)}>
                  <FaGlassMartiniAlt style={{ marginRight: '5px' }} /> My Drinks
                </Link>
              </li>
              <li>
                <Link to="/makeadrink" className="navbar-item" onClick={() => setIsMenuOpen(false)}>
                  <FaGlassMartiniAlt style={{ marginRight: '5px' }} /> Make a Drink
                </Link>
              </li>
              <li>
                <Link to="/profile" className="navbar-item" onClick={() => setIsMenuOpen(false)}>
                  <FaUserCircle style={{ marginRight: '5px' }} /> Profile
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }} 
                  className="navbar-item btn btn-link" 
                  style={{ padding: 0 }}
                >
                  <FaSignOutAlt style={{ marginRight: '5px' }} /> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="navbar-item" onClick={() => setIsMenuOpen(false)}>
                  <FaSignOutAlt style={{ marginRight: '5px' }} /> Login
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Hamburger */}
        <div className="navbar-hamburger" onClick={toggleMenu}>
          <span className="navbar-hamburger-line"></span>
          <span className="navbar-hamburger-line"></span>
          <span className="navbar-hamburger-line"></span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
