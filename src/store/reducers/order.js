import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
  error: false,
};

const purchaseOrderSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, { id: action.orderId });
  return updateObject(state, { loading: false, purchased: true, error: false, orders: state.orders.concat(newOrder) });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return updateObject(state, { purchased: false, error: false });

    case actionTypes.PURCHASE_ORDER_START: {
      return updateObject(state, { loading: true, error: false });
    }

    case actionTypes.PURCHASE_ORDER_SUCCESS:
      return purchaseOrderSuccess(state, action);

    case actionTypes.PURCHASE_ORDER_FAIL:
      return updateObject(state, { loading: false, error: true });

    case actionTypes.FETCH_ORDER_START:
      return updateObject(state, { loading: true, error: false });

    case actionTypes.FETCH_ORDER_SUCCESS:
      return updateObject(state, { loading: false, error: false, orders: action.orders });

    case actionTypes.FETCH_ORDER_FAIL:
      return updateObject(state, { loading: false, error: true });

    default:
      return state;
  }
};

export default reducer;
