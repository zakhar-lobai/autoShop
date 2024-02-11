import React from 'react';
import './Preloader.css'; // Import your preloader CSS file

const Preloader = () => {
  return (
    <div className="dot-preloader-container">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  );
};

export default Preloader;