import React from 'react';

import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
  let authStatus = <NavigationItem link='/auth'>Authenticate</NavigationItem>;
  if (props.isAuthenticated) {
    authStatus = <NavigationItem link='/logout'>Logout</NavigationItem>;
  }
  return (
    <ul className='NavigationItems'>
      <NavigationItem link='/' exact>
        Home
      </NavigationItem>
      {props.isAuthenticated ? <NavigationItem link='/orders'>Orders</NavigationItem> : null} {authStatus}
    </ul>
  );
};

export default navigationItems;
