import React from 'react';

import './order.css';

const order = (props) => {
  const ingredients = [];

  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName],
    });
  }

  let orderOutput = ingredients.map((ingredient) => {
    return (
      <span key={ingredient.name} className='OrderIngredients'>
        {ingredient.name} ({ingredient.amount})
      </span>
    );
  });

  return (
    <div className='Order'>
      <p>Ingredients: {orderOutput}</p>
      <p>
        Total Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};
export default order;
