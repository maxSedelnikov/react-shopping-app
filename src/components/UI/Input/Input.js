import React from 'react';
import classes from './Input.module.css';

/**
 * A function to validate input
 * @memberof Input
 * @inner
 * @function isInvalid
 * @param {boolean} valid - checks is value is valid
 * @param {boolean} touched - checks if input was changed
 * @param {boolean} shouldValidate - checks if input shoud be validated
 * @returns {boolean}
 */

function isInvalid({ valid, touched, shouldValidate }) {
  return !valid && shouldValidate && touched;
}

/**
 * Input component
 * @category Application
 * @subcategory UI
 * @component Input
 * @param {object} props - component props passed
 * @param {string} props.type - input type
 * @param {string} props.label - input label
 * @param {string} props.value - input value
 * @param {function} props.onCHange - input onChange callback
 * @param {string} props.errorMessage - input error message when invalid
 * @returns {jsx} input element
 */

const Input = (props) => {
  const inputType = props.type || 'text';
  const cls = [classes.Input];
  const htmlFor = `${inputType}-${Math.random()}`;

  if (isInvalid(props)) {
    cls.push(classes.invalid);
  }

  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        type={inputType}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
      />
      {isInvalid(props) ? (
        <span>{props.errorMessage || 'Field is invalid'}</span>
      ) : null}
    </div>
  );
};

export default Input;
