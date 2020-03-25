import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-order';
import Burger from '../../components/Burger/burger';
import BuildControls from '../../components/Burger/BuildControls/buildControls';
import Modal from '../../components/UI/Modal/modal';
import OrderSummary from '../../components/Burger/OrderSummary/orderSummary';
import Spinner from '../../components/UI/Spinner/spinner';
import Failure from '../../components/UI/AfterSpin/Failure/failure';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import * as actionCreators from '../../store/actions';

class BulgerBuilder extends Component {
  state = {
    isOrdered: false,
    loading: false,
  };

  updatePurchaseable(ingredients) {
    const ingredientSum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, curr) => {
        return sum + curr;
      }, 0);
    return ingredientSum > 0;
  }

  componentDidMount() {
    this.props.onInitIngredient();
  }

  purchaseOrderHandler = () => {
    if (!this.props.isAuthenticated) {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    } else {
      this.setState({ isOrdered: true });
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ isOrdered: false, spinSuccess: false });
  };

  purchaseContinueHandler = () => {
    this.props.onPurchaseInit();
    this.props.history.push('/checkout');
  };

  render() {
    const disabledInfo = { ...this.props.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.error ? <Failure /> : <Spinner />;

    if (this.props.ingredients) {
      burger = (
        <>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            addedIngredient={this.props.onIngredientAdded}
            removedIngredient={this.props.onIngredientRemoved}
            disabledInfo={disabledInfo}
            totalPrice={this.props.price}
            isPurchaseable={this.updatePurchaseable(this.props.ingredients)}
            isOrdered={this.purchaseOrderHandler}
            isAuth={this.props.isAuthenticated}
          />
        </>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          cancelPurchase={this.purchaseCancelHandler}
          continuePurchase={this.purchaseContinueHandler}
          totalPrice={this.props.price}
        />
      );

      if (this.state.loading) {
        orderSummary = <Spinner />;
      }
    }

    return (
      <>
        <Modal show={this.state.isOrdered} cancelPurchase={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.ings.ingredients,
    price: state.ings.totalPrice,
    error: state.ings.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingredientName) => {
      dispatch(actionCreators.addIngredient(ingredientName));
    },
    onIngredientRemoved: (ingredientName) => {
      dispatch(actionCreators.removeIngredient(ingredientName));
    },
    onInitIngredient: () => {
      dispatch(actionCreators.initIngredients());
    },
    onPurchaseInit: () => {
      dispatch(actionCreators.purchaseInit());
    },
    onSetAuthRedirectPath: (path) => dispatch(actionCreators.setAuthRedirectPath(path)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(BulgerBuilder, axios));
