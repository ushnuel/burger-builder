import React from 'react';
import burgerLogo from '../../../assets/Images/127 burger-logo.png';
import './logo.css';

const logo = (props) => {
  return (
    <div className="Logo" style={{ height: props.height }}>
      <img src={burgerLogo} alt="Burger logo" />
    </div>
  );
};

export default logo;
