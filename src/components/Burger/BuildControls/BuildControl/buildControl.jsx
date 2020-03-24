import React from 'react';
import './buildControl.css';

const buildControl = (props) => {
  const { label, onAddition, onRemoval, disabledInfo } = props;
  return (
    <div className="BuildControl">
      <div className="Label">{label}</div>
      <button className="Less" disabled={disabledInfo} onClick={onRemoval}>
        -
      </button>
      <button className="More" onClick={onAddition}>
        +
      </button>
    </div>
  );
};

export default buildControl;
