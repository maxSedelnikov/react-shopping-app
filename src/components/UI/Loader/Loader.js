import React from 'react';
import classes from './Loader.module.css';

/**
 * Loader component
 * @category Application
 * @subcategory UI
 * @component Loader
 * @returns {jsx} loader
 */

const Loader = () => {
  return (
    <div className={classes.Loader}>
      <div className={classes.Spinner}></div>
    </div>
  );
};

export default Loader;
