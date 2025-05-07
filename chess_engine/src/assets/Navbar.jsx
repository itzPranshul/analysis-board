import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-800 shadow-md z-50 h-24 flex items-center justify-center">
      <ul className="flex justify-center gap-6 p-4 text-white gap-80">
        <li><Link to="/" className="hover:text-blue-400">Board</Link></li>
        <li><Link to="/level-up" className="hover:text-blue-400">Level Up</Link></li>
        <li><Link to="/buy-chessboard" className="hover:text-blue-400">Buy Chessboard</Link></li>
        <li><Link to="/community" className="hover:text-blue-400">Community</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
