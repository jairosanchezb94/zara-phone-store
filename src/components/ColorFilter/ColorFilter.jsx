import React, { useState } from 'react';
import './ColorFilter.scss';

const ColorFilter = ({ onFilter, onClose }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  
  const colors = [
    { name: 'Gray', hexCode: '#4E4E4E' },
    { name: 'Blue', hexCode: '#636094' },
    { name: 'Beige', hexCode: '#D4C68C' },
    { name: 'Yellow', hexCode: '#F5E1A4' }
  ];
  
  const handleColorSelect = (color) => {
    setSelectedColor(color === selectedColor ? null : color);
  };
  
  const handleApplyFilter = () => {
    if (selectedColor) {
      onFilter(selectedColor);
    }
  };
  
  return (
    <div className="color-filter">
      {colors.map((color) => (
        <button
          key={color.name}
          className={`color-filter__color ${selectedColor === color ? 'selected' : ''}`}
          style={{ backgroundColor: color.hexCode }}
          onClick={() => handleColorSelect(color)}
          aria-label={`Filter by color ${color.name}`}
        />
      ))}
      <button 
        className="color-filter__close-button"
        onClick={onClose}
      >
        CERRAR
      </button>
    </div>
  );
};

export default ColorFilter;