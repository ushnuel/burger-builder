import React from 'react';

import './input.css';

const input = (props) => {
  let inputElement = null;
  const inputClasses = ['InputElement'];

  if (props.invalid && props.touched) {
    inputClasses.push('InvalidElement');
  }

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;

    case 'textarea':
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;

    case 'select':
      inputElement = (
        <select className='InputElement' value={props.value} onChange={props.changed}>
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;

    default:
      inputElement = (
        <input className='InputElement' {...props.elementConfig} value={props.value} onChange={props.changed} />
      );
      break;
  }
  return (
    <div className='Input'>
      <label className='InputLabel'>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
