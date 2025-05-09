import React from 'react';
import CommunityForm from '../assets/CommunityForm';
// import CommunityList from '../assets/CommunityList';
import ProfileCard from '../assets/ProfileCard';
// import './Page.css';

function CommunityComponent() {
  return (
    <div className="page-container">
      <h1>Community</h1>
      <p>Join discussions, events, and connect with other chess enthusiasts.</p>
      <ProfileCard/>
      <CommunityForm/>
    </div>
  );
}

export default CommunityComponent;
