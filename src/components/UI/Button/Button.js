import React from 'react';
import classes from './Button.module.css';

const Button = ({ type, disabled, title, onClick, children }) => {
  const cls = [classes.Button, classes[type]];

  return (
    <button
      onClick={onClick}
      className={cls.join(' ')}
      title={title}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
