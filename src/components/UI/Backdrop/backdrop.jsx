import React from 'react';
import './backDrop.css';

const backDrop = ({ show, onCancel }) => {
  return show ? <div className="Backdrop" onClick={onCancel} /> : null;
};

export default backDrop;
