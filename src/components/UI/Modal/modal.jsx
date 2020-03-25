import React, { Component } from 'react';
import BackDrop from '../Backdrop/backdrop';
import './modal.css';

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }
  render() {
    const { show, children, cancelPurchase } = this.props;
    const style = {
      transform: show ? 'translateY(0)' : 'translateY(-100vh)',
      opacity: show ? '1' : '0',
    };
    return (
      <>
        <BackDrop onCancel={cancelPurchase} show={show} />
        <div className='Modal' style={style}>
          {children}
        </div>
      </>
    );
  }
}

export default Modal;
