import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../Auxe/Aux';
import './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/sideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };
  closeSideDrawerHandler = () => {
    this.setState({ showSideDrawer: false });
  };
  openSideDrawerHandler = () => {
    this.setState({ showSideDrawer: true });
  };
  render() {
    return (
      <Aux>
        <Toolbar openSideDrawer={this.openSideDrawerHandler} isAuth={this.props.isAuthenticated} />
        <SideDrawer
          closeSideDrawer={this.closeSideDrawerHandler}
          open={this.state.showSideDrawer}
          isAuth={this.props.isAuthenticated}
        />
        <main className='contents'>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
