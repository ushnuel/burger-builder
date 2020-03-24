import React from 'react';
import Logo from '../../Navigation/Logo/logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Hamburger from '../Toolbar/Hamburger/hamburger';
import './toolbar.css';

const toolbar = (props) => {
  return (
    <header className='Toolbar'>
      <Hamburger clicked={props.openSideDrawer} />
      <Logo height='80%' />
      <nav className='DesktopView'>
        <NavigationItems isAuthenticated={props.isAuth} />
      </nav>
    </header>
  );
};

export default toolbar;
