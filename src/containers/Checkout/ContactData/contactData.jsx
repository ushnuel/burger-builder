import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/spinner';
import Input from '../../../components/UI/Input/input';
import errorHandler from '../../../hoc/ErrorHandler/ErrorHandler';
import * as actionCreators from '../../../store/actions';
import { updateObject, checkValidity } from '../../../shared/utility';
import './contactData.css';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      postalCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code',
        },
        value: '',
        validation: {
          required: true,
          minLenght: 5,
          maxLenght: 5,
          isNumber: true,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {
              value: 'fastest',
              displayValue: 'Fastest',
            },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ],
        },
        value: 'fastest',
        valid: true,
      },
    },
    formIsValid: false,
  };

  orderHander = (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    const formData = {};
    for (let formDataIdentifier in this.state.orderForm) {
      formData[formDataIdentifier] = this.state.orderForm[formDataIdentifier].valid;
    }

    const orderData = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
    };

    this.props.onOrderBurger(orderData, this.props.token);
  };

  onChangeHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
      value: event.target.value,
      touched: true,
      valid: checkValidity(this.state.orderForm[inputIdentifier].validation, event.target.value),
    });

    const updatedOrderForm = updateObject(this.state.orderForm, { [inputIdentifier]: updatedFormElement });

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ orderForm: updatedOrderForm, formIsValid });
  };

  render() {
    const formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let form = (
      <form onSubmit={this.orderHander}>
        {formElementArray.map(({ id, config }) => (
          <Input
            key={id}
            elementConfig={config.elementConfig}
            elementType={config.elementType}
            value={config.value}
            invalid={!config.valid}
            touched={config.touched}
            changed={(event) => this.onChangeHandler(event, id)}
          />
        ))}
        <button className='Button Success' disabled={!this.state.formIsValid}>
          ORDER
        </button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className='ContactData'>
        <h3>Enter your Contact Data</h3>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ings.ingredients,
    price: state.ings.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) => {
      dispatch(actionCreators.purchaseBurger(orderData, token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(errorHandler(ContactData, axios)));
