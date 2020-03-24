import React, { Component } from 'react';
import { connect } from 'react-redux';

import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import Order from '../../components/Orders/order';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/spinner';
import Failure from '../../components/UI/AfterSpin/Failure/failure';
import * as actionCreators from '../../store/actions/';

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token);
  }
  render() {
    let orders = this.props.error ? <Failure /> : <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map((order) => (
        <Order key={order.id} price={order.price} ingredients={order.ingredients} />
      ));
    }

    return <div>{orders}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    error: state.order.error,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token) => dispatch(actionCreators.fetchOrders(token)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(Orders, axios));
