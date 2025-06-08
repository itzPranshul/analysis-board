import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar from './assets/Navbar';
import ChessBoardPage from './pages/ChessBoardPage';
import BuyChessboardComponent from './pages/BuyChessboardComponent';
import CommunityComponent from './pages/CommunityComponent';
import HomeComponent from './pages/HomeComponent';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import PrivateRoute from './components/PrivateRoute';
import ResetPasswordPage from './ResetPasswordPage'; // ✅ Make sure this path is correct
import './App.css';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/board" element={<ChessBoardPage />} />
        <Route path="/buy-chessboard" element={<BuyChessboardComponent />} />
        <Route path="/community" element={<CommunityComponent />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/SignUpPage" element={<SignupPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} /> {/* ✅ Moved inside Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <Navbar />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
