import React from 'react';
import { motion as Motion } from 'framer-motion';

function BuyChessboardComponent() {
  const handlePayment = () => {
    window.location.href = "https://your-payment-gateway.com/checkout";
  };

  return (
    <Motion.div
      className="p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <div className="page-container" style={{ textAlign: 'center', padding: '2rem' }}>
        <img 
          src="./images/PHOTO-2025-05-05-21-18-36.jpg" 
          alt="Chessboard" 
          style={{ width: '60%', maxWidth: '100%', margin: '2rem auto', display: 'block' }} 
        />

        <p className="text-gray-200 text-base max-w-xl mx-auto mb-6">
          This is a high-quality, standard tournament-size chess mat (20x20 inches) with 2.25-inch squares—perfect for casual play and official events alike. Durable, lightweight, and easy to roll for portability.
        </p>

        <h2 className="text-white" style={{ margin: '1rem 0', fontSize: '1.5rem' }}>Price: ₹499</h2>

        <button 
          onClick={handlePayment}
          style={{
            padding: '0.8rem 2rem',
            fontSize: '1rem',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Pay Now
        </button>
      </div>
    </Motion.div>
  );
}

export default BuyChessboardComponent;
