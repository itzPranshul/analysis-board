import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    
    <nav className="fixed top-0 left-0 right-0 bg-gray-900 text-white shadow-md z-50 h-20 flex items-center px-6 justify-between">
      {/* Logo or Brand */}
      <div className="text-2xl font-bold">
        <Link to="/">♟️ ChessPlay</Link>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-10 text-lg items-center">
        <li><Link to="/" className="hover:text-blue-400 transition">Home</Link></li>
        <li><Link to="/board" className="hover:text-blue-400 transition">Board</Link></li>
        <li><Link to="/buy-chessboard" className="hover:text-blue-400 transition">Buy</Link></li>
        <li><Link to="/community" className="hover:text-blue-400 transition">Community</Link></li>
      </ul>

      {/* Login Button */}
      <div className="hidden md:block">
        <Link to="/login" className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg text-sm font-medium">
          Login
        </Link>
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="absolute top-20 left-0 right-0 bg-gray-800 flex flex-col items-center gap-4 py-4 md:hidden shadow-lg z-40">
          <Link to="/" className="hover:text-blue-400" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/board" className="hover:text-blue-400" onClick={() => setMenuOpen(false)}>Board</Link>
          <Link to="/buy-chessboard" className="hover:text-blue-400" onClick={() => setMenuOpen(false)}>Buy</Link>
          <Link to="/community" className="hover:text-blue-400" onClick={() => setMenuOpen(false)}>Community</Link>
          <Link to="/login" className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded" onClick={() => setMenuOpen(false)}>Login</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
