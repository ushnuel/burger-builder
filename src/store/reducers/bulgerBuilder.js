import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  ingredients: null,
  totalPrice: 0,
  error: false,
};

const INGREDIENT_PRICE = {
  salad: 0.5,
  cheese: 0.6,
  meat: 1.4,
  bacon: 0.8,
  building: false,
};

const addOrRemoveIngredient = (state, action, isAdd = true) => {
  let updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
  let totalPrice = state.totalPrice + INGREDIENT_PRICE[action.ingredientName];

  if (!isAdd) {
    totalPrice = state.totalPrice - INGREDIENT_PRICE[action.ingredientName];
    updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
  }

  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);

  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice,
    building: true,
  };
  return updateObject(state, updatedState);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addOrRemoveIngredient(state, action);

    case actionTypes.REMOVE_INGREDIENT:
      return addOrRemoveIngredient(state, action, false);

    case actionTypes.SET_INGREDIENT:
      return updateObject(state, { ingredients: action.ingredients, error: false, totalPrice: 0, building: false });

    case actionTypes.SET_INGREDIENT_FAILED:
      return updateObject(state, { error: true, building: false });

    default:
      return state;
  }
};

export default reducer;
