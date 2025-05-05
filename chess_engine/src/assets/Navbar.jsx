import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li><Link to="/">Board</Link></li>
        <li><Link to="/level-up">Level Up</Link></li>
        <li><Link to="/buy-chessboard">Buy Chessboard</Link></li>
        <li><Link to="/community">Community</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
