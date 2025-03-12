import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackButton.scss';

const BackButton = () => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(-1);
  };
  
  return (
    <button className="back-button" onClick={handleBack}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
          fillRule="evenodd" 
          clipRule="evenodd" 
          d="M11.8233 5.64648L12.5304 6.35359L8.88394 10L12.5304 13.6465L11.8233 14.3536L7.46973 10L11.8233 5.64648Z" 
          fill="black"
        />
      </svg>
      BACK
    </button>
  );
};

export default BackButton;