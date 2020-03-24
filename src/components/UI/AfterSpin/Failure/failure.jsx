import React from 'react';
import './failure.css';
import '../../Button/button.css';

const failure = () => {
  const reloadPage = () => {
    window.location.reload();
  };
  return (
    <div className='Failure'>
      <h2>Operation failed! Could not locate a remote server</h2>
      <p>Try connecting to a network and try again!</p>
      <button className='Button Danger' onClick={reloadPage}>
        RELOAD PAGE
      </button>
    </div>
  );
};

export default failure;
