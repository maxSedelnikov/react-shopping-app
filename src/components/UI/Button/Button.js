import React from 'react';
import classes from './Button.module.css';

/**
 * Button component
 * @category Application
 * @subcategory UI
 * @component Button
 * @param {string} type - button type
 * @param {boolean} disabled - disabled status
 * @param {string} title - title over a button when hover
 * @param {function} onClick - callback function
 * @param {array} children - button content e.g button text
 * @returns {jsx} button with text or icon
 */

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
