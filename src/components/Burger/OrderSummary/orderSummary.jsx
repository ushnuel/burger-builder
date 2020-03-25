import React from 'react';
import utils from '../../../utils';
import '../../UI/Button/button.css';

const orderSummary = (props) => {
  const { ingredients, cancelPurchase, continuePurchase, totalPrice } = props;
  const ingredientSummary = utils(ingredients).map((ingKey) => {
    return (
      <li key={ingKey}>
        <span style={{ textTransform: 'capitalize' }}>{ingKey}</span>: {ingredients[ingKey]}
      </li>
    );
  });

  return (
    <>
      <h3>Your Order Summary</h3>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total Price: {totalPrice.toFixed(2)}</strong>
      </p>
      <div className='OrderBtn'>
        <button onClick={cancelPurchase} className='Button Danger'>
          CANCEL
        </button>
        <button onClick={continuePurchase} className='Button Success'>
          CONTINUE
        </button>
      </div>
    </>
  );
};

export default orderSummary;
