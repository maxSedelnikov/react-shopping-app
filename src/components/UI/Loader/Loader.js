import React from 'react';
import classes from './Loader.module.css';

const Loader = () => {
  return (
    <div className={classes.Loader}>
      <div className={classes.Spinner}></div>
    </div>
  );
};

export default Loader;
