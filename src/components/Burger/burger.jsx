import React from 'react';
import BurgerIngredient from './BurgerIngredient/burgerIngredient';
import utils from '../../utils';
import './burger.css';

const burger = ({ ingredients }) => {
  // convert the ingredient to an array
  let transformedIngredient = utils(ingredients)
    .map((ingredient) => {
      return [...Array(ingredients[ingredient])].map((_, index) => {
        return <BurgerIngredient key={ingredient + index} type={ingredient} />;
      });
    })
    .reduce((prevArr, curArr) => {
      return prevArr.concat(curArr);
    }, []);

  if (transformedIngredient.length === 0) {
    transformedIngredient = <p>Please add your preferred ingredients</p>;
  }

  return (
    <div className="Burger">
      <BurgerIngredient type="bread-top" />
      {transformedIngredient}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
