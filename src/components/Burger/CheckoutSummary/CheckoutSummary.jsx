import React from 'react';

import Burger from '../burger';

import './CheckoutSummary.css';

const checkoutSummary = (props) => {
  return (
    <div className='CheckoutSummary'>
      <h2>Hope this tastes great</h2>
      <Burger ingredients={props.ingredients} />
      <div className='OrderBtn'>
        <button className='Button Danger' onClick={props.checkoutCancelled}>
          CANCEL
        </button>
        <button className='Button Success' onClick={props.checkoutContinued}>
          CONTINUE
        </button>
      </div>
    </div>
  );
};

export default checkoutSummary;
