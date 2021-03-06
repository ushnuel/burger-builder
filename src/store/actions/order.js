import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const purchaseBurgerSuccess = (orderData, orderId) => {
  return { type: actionTypes.PURCHASE_ORDER_SUCCESS, orderData, orderId };
};

export const purchaseBurgerFail = (error) => {
  return { type: actionTypes.PURCHASE_ORDER_FAIL, error };
};

export const purchaseBurgerStart = () => {
  return { type: actionTypes.PURCHASE_ORDER_START };
};

export const purchaseInit = () => {
  return { type: actionTypes.PURCHASE_INIT };
};

export const purchaseBurger = (orderData, token) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
      .post('/order.json?auth=' + token, orderData)
      .then((response) => {
        dispatch(purchaseBurgerSuccess(orderData, response.data.name));
      })
      .catch((error) => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};

export const fetchOrderSuccess = (orders) => {
  return { type: actionTypes.FETCH_ORDER_SUCCESS, orders };
};

export const fetchOrderFail = (error) => {
  return { type: actionTypes.FETCH_ORDER_FAIL, error };
};

export const fetchOrderStart = () => {
  return { type: actionTypes.FETCH_ORDER_START };
};

export const fetchOrders = (token) => {
  return (dispatch) => {
    dispatch(fetchOrderStart());
    axios
      .get('/order.json?auth=' + token)
      .then((res) => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(fetchOrderSuccess(fetchedOrders));
      })
      .catch((err) => {
        dispatch(fetchOrderFail(err));
      });
  };
};
