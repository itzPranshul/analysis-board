import React from 'react';

function BuyChessboardComponent() {
  const handlePayment = () => {
    // Replace this with your actual payment gateway URL or integration
    window.location.href = "https://your-payment-gateway.com/checkout";
  };

  return (
    <div className="page-container" style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Buy Chessboard</h1>

      <img 
        src="/images/PHOTO-2025-05-05-21-18-36.jpg" 
        alt="Chessboard" 
        style={{ width: '60%', maxWidth: '100%', margin: '2rem auto', display: 'block' }} 
      />

      <h2 style={{ margin: '1rem 0', fontSize: '1.5rem' }}>Price: ₹499</h2>

      <button 
        // onClick={handlePayment}
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
  );
}

export default BuyChessboardComponent;
