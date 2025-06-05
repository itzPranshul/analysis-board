import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/board', label: 'Board' },
    { to: '/buy-chessboard', label: 'Buy' },
    { to: '/community', label: 'Community' },
  ];

  const linkClasses = ({ isActive }) =>
    `transition-colors hover:text-blue-400 ${isActive ? 'text-blue-400 font-semibold' : ''}`;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-900 text-white shadow-md z-50 h-20 flex items-center px-6 justify-between">
      {/* Logo */}
      <div className="text-2xl font-bold">
        <Link to="/">♟️ ChessPlay</Link>
      </div>

      {/* Desktop Links */}
      <ul className="hidden md:flex gap-10 text-lg items-center">
        {navLinks.map(({ to, label }) => (
          <li key={to}>
            <NavLink to={to} className={linkClasses}>{label}</NavLink>
          </li>
        ))}
      </ul>

      {/* Desktop Login */}
      <div className="hidden md:block">
        <Link
          to="/login"
          className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg text-sm font-medium"
        >
          Login
        </Link>
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-20 left-0 right-0 bg-gray-800/95 backdrop-blur-md flex flex-col items-center gap-5 py-6 md:hidden shadow-lg z-40 transition-all duration-300">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={linkClasses}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm font-medium transition"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
