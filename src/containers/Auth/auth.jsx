import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/input';
import * as actionCreators from '../../store/actions';
import Spinner from '../../components/UI/Spinner/spinner';
import { checkValidity, updateObject } from '../../shared/utility';

class Auth extends Component {
  state = {
    controls: {
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
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
    isSignUp: true,
  };

  componentDidMount() {
    if (!this.props.building && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  }

  onSubmitHandler = (event) => {
    const { controls, isSignUp } = this.state;

    event.preventDefault();
    this.props.onAuth(controls.email.value, controls.password.value, isSignUp);
  };

  onButtonClicked = (event) => {
    event.preventDefault();
    this.setState((prevState) => {
      return { isSignUp: !prevState.isSignUp };
    });
  };

  onChangeHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(this.state.controls[inputIdentifier], {
      value: event.target.value,
      touched: true,
      valid: checkValidity(this.state.controls[inputIdentifier].validation, event.target.value),
    });

    const updatedControls = updateObject(this.state.controls, { [inputIdentifier]: updatedFormElement });

    let formIsValid = true;
    for (let inputIdentifier in updatedControls) {
      formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
    }
    this.setState({ controls: updatedControls, formIsValid });
  };
  render() {
    const formElementArray = [];
    for (let key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = formElementArray.map(({ id, config }) => {
      return (
        <Input
          key={id}
          elementConfig={config.elementConfig}
          elementType={config.elementType}
          value={config.value}
          invalid={!config.valid}
          touched={config.touched}
          changed={(event) => this.onChangeHandler(event, id)}
        />
      );
    });

    let submit = 'SUBMIT';

    if (this.props.loading) {
      submit = <Spinner />;
    }

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = <p className='ErrorMsg'>{this.props.error.message}</p>;
    }

    let redirectAuth = null;
    if (this.props.isAuthenticated) {
      redirectAuth = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div className='Auth'>
        {redirectAuth}
        {errorMessage}
        <form onSubmit={this.onSubmitHandler}>
          {form}
          <button className='Button Success' disabled={!this.state.formIsValid}>
            {submit}
          </button>
          <button className='Button Danger' onClick={this.onButtonClicked}>
            SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
    building: state.ings.building,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) => {
      dispatch(actionCreators.auth(email, password, isSignUp));
    },
    onSetAuthRedirectPath: () => dispatch(actionCreators.setAuthRedirectPath('/')),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
