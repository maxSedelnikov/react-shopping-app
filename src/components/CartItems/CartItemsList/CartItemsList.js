import React from 'react';

import CartItem from 'components/CartItems/CartItem';

import classes from './CartItemsList.module.css';

/**
 * @category Application
 * @subcategory Elements
 * @component CartItemsList
 * @param {array} items cart items
 * @returns {jsx} list with cart items
 * @see CartItem
 */

const CartItemsList = ({ items }) => {
  return (
    <ul className={classes.CartItemsList} data-testid='cart-items-list'>
      {items.map((item) => (
        <CartItem key={item.id} item={item} dataTestId='cart-item' />
      ))}
    </ul>
  );
};

export default CartItemsList;
