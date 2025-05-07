import React from 'react';
import Card from '../assets/Card'
// import './Page.css'; // You can reuse a common style or create Page.css

function LevelUpComponent() {
  return (
    <div className="page-container mb-80">
      <h1 className='text-5xl'>Level Up</h1>
      <p className='text-3xl mt-4'>Train, solve puzzles, and level up your chess game here!</p>
      <Card 
        title="Significance of center" 
        description="capturing the center in the opening gives you easy development and a potential breakthrough for attacking the opponent" 
      />
      
    </div>
  );
}

export default LevelUpComponent;
