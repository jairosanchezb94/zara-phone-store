import React from 'react';

const ClearSearchIcon = ({ onClick }) => {
  return (
    <button 
      className="clear-search-button" 
      onClick={onClick}
      aria-label="Clear search"
    >
      <svg 
        width="20" 
        height="19" 
        viewBox="0 0 20 19" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_27067_760)">
          <path 
            d="M9.22887 9.3622L6 12.4296L6.62613 13.0245L9.855 9.95703L13.0839 13.0245L13.71 12.4296L10.4811 9.3622L13.71 6.29478L13.0839 5.69995L9.855 8.76738L6.62613 5.69995L6 6.29478L9.22887 9.3622Z" 
            fill="black"
          />
        </g>
        <defs>
          <clipPath id="clip0_27067_760">
            <rect width="20" height="19" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    </button>
  );
};

export default ClearSearchIcon;