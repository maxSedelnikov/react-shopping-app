import React from 'react';

import classes from './QuantityLoader.module.css';

/**
 * QuantityLoader component
 * @category Application
 * @subcategory UI
 * @component QuantityLoader
 * @returns {jsx} quantity loader
 */

const QuantityLoader = () => {
  return (
    <div className={classes.QuantityLoader} data-testid='quantity-loader'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default QuantityLoader;
