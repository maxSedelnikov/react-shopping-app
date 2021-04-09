import React from 'react';

import classes from './CartItemInfo.module.css';

/**
 * @category Application
 * @subcategory Elements
 * @component CartItemInfo
 * @param {string} img item image url
 * @param {string} name item name
 * @param {string} price item price
 * @returns {jsx} item info layout
 */

const CartItemInfo = ({ img, name, price }) => {
  return (
    <>
      <img className={classes.PrdocutImg} src={img} loading='lazy' alt={name} />
      <span className={classes.ProductName}>{name}</span>
      <span className={classes.ProductPrice}>{price}&nbsp;$</span>
    </>
  );
};

export default CartItemInfo;
