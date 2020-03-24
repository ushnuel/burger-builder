import React from 'react';
import './buildControls.css';
import BuildControl from './BuildControl/buildControl';

const ingredients = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Meat', type: 'meat' },
  { label: 'Cheese', type: 'cheese' },
];
const buildControls = (props) => {
  const { addedIngredient, removedIngredient, disabledInfo, totalPrice, isPurchaseable, isOrdered, isAuth } = props;
  return (
    <div className='BuildControls'>
      <p>
        Current Price: <strong>N{totalPrice.toFixed(2)}</strong>
      </p>
      {ingredients.map((ingredient) => (
        <BuildControl
          label={ingredient.label}
          key={ingredient.label}
          onAddition={() => addedIngredient(ingredient.type)}
          onRemoval={() => removedIngredient(ingredient.type)}
          disabledInfo={disabledInfo[ingredient.type]}
        />
      ))}

      <button className='OrderButton' disabled={!isPurchaseable} onClick={isOrdered}>
        {isAuth ? 'ORDER NOW' : 'SIGN UP TO CONTINUE'}
      </button>
    </div>
  );
};

export default buildControls;
