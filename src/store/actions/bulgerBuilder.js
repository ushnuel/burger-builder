import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const addIngredient = (ingredientName) => {
  return { type: actionTypes.ADD_INGREDIENT, ingredientName };
};

export const removeIngredient = (ingredientName) => {
  return { type: actionTypes.REMOVE_INGREDIENT, ingredientName };
};

export const setIngredient = (ingredients) => {
  return { type: actionTypes.SET_INGREDIENT, ingredients };
};

export const setIngredientFailed = () => {
  return { type: actionTypes.SET_INGREDIENT_FAILED };
};

export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get('https://burger-builder-b717c.firebaseio.com/ingredients.json')
      .then((response) => {
        dispatch(setIngredient(response.data));
      })
      .catch((error) => {
        dispatch(setIngredientFailed());
      });
  };
};
