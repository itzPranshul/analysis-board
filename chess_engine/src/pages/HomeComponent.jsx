// pages/HomeComponent.jsx
import React from 'react';
import { motion } from 'framer-motion';

const HomeComponent = () => {
  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold mb-4">Welcome to ChessPlay</h1>
      <p>Your ultimate chess journey starts here.</p>
    </motion.div>
  );
};

export default HomeComponent;
