import React from 'react';
import classes from './EmptyCart.module.css';

/**
 * Empty cart component
 * @category Application
 * @subcategory Elements
 * @component EmptyCart
 * @returns {jsx} empty cart container
 */

const EmptyCart = () => {
  return (
    <div className={classes.EmptyCart}>
      <p>Your cart is empty</p>
    </div>
  );
};

export default EmptyCart;
