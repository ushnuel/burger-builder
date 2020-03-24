import React, { Fragment } from 'react';
import Logo from '../Logo/logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../UI/Backdrop/backdrop';
import './sideDrawer.css';

const sideDrawer = ({ closeSideDrawer, open, isAuth }) => {
  let attatchedClasses = 'SideDrawer Close';
  if (open) {
    attatchedClasses = 'SideDrawer Open';
  }
  return (
    <Fragment>
      <BackDrop show={open} onCancel={closeSideDrawer} />
      <div className={attatchedClasses} onClick={closeSideDrawer}>
        <Logo height='11%' />
        <NavigationItems isAuthenticated={isAuth} />
      </div>
    </Fragment>
  );
};

export default sideDrawer;
