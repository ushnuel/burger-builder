import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BulgerBuilder from './containers/bulgerBuilder/bulgerBuilder';
import Checkout from './containers/Checkout/checkout';
import Orders from './containers/Orders/orders';
import Auth from './containers/Auth/auth';
import Logout from './containers/Auth/Logout/logout';
import * as actionCreators from './store/actions';

class App extends Component {
  componentDidMount() {
    this.props.onCheckAuthState();
  }

  render() {
    return (
      <Layout>
        <Switch>
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={Orders} />
          <Route path='/auth' component={Auth} />
          <Route path='/logout' component={Logout} />
          <Route path='/' exact component={BulgerBuilder} />
        </Switch>
      </Layout>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCheckAuthState: () => dispatch(actionCreators.checkAuthState()),
  };
};

export default connect(null, mapDispatchToProps)(App);
