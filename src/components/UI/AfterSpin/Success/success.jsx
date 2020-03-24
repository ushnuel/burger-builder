import React from 'react';
import './success.css';
import '../../Button/button.css';

const success = ({ done, show }) => {
  const style = {
    transform: show ? 'translateY(0)' : 'translateY(-100vh)',
    opacity: show ? '1' : '0',
  };
  return (
    <div className="Success" style={style}>
      <h1>success</h1>
      <button onClick={done} className="Button Success">
        CLOSE
      </button>
    </div>
  );
};

export default success;
