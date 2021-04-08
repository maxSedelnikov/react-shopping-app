import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { hideAlert } from 'store/actions/alert';

import classes from './Alert.module.css';

/**
 * Alert component for showing notifications
 * @category Application
 * @subcategory Elements
 * @component Alert
 * @returns {JSX} - notification
 */

const Alert = () => {
  const { showAlert, type, message } = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  const cls = [classes.Alert, classes[type]];

  if (showAlert) cls.push(classes.active);

  /**
   * Using react hook useEffect to hide alert it was shown after 3 seconds
   * @memberof Alert
   * @function useEffect
   * @inner
   * @see module:AlertActions~showAlert
   * @see module:AlertActions~hideAlert
   */

  useEffect(() => {
    if (showAlert) setTimeout(() => dispatch(hideAlert()), 3000);
  }, [dispatch, showAlert]);

  return (
    <div className={cls.join(' ')} data-testid='alert'>
      <span className={classes.Text}>{message}</span>
    </div>
  );
};

export default Alert;
