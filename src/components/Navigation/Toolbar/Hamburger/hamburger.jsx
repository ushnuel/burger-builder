import React from 'react';
import './hamburger.css';

const hamburger = (props) => {
  return (
    <div onClick={props.clicked} className="Hamburger">
      <div />
      <div />
      <div />
    </div>
  );
};

export default hamburger;
