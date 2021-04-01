import React from 'react';
import classes from './EmptyCart.module.css';

const EmptyCart = () => {
  return (
    <div className={classes.EmptyCart}>
      <p>Your cart is empty</p>
    </div>
  );
};

export default EmptyCart;
