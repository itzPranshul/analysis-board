import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && token.length > 10) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [location]);

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

      {/* Desktop Login/Profile */}
      <div className="hidden md:block">
        {isLoggedIn ? (
          <Link to="/dashboard">
            <img
              src="./public/images/blue-circle-with-white-user_78370-4707.jpg.avif"
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-white object-cover"
            />
          </Link>
        ) : (
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg text-sm font-medium"
          >
            Login
          </Link>
        )}
      </div>

      {/* Hamburger */}
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
          {isLoggedIn ? (
            <Link
              to="/dashboard"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm font-medium transition"
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
          ) : (
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm font-medium transition"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
