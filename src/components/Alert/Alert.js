import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideAlert } from '../../store/actions/alert';
import classes from './Alert.module.css';

// Alert component for showing notifications

const Alert = () => {
  const { showAlert, type, message } = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  const cls = [classes.Alert, classes[type]];

  if (showAlert) cls.push(classes.active);

  useEffect(() => {
    if (showAlert) setTimeout(() => dispatch(hideAlert()), 3000);
  }, [dispatch, showAlert]);

  return (
    <div className={cls.join(' ')}>
      <span className={classes.Text}>{message}</span>
    </div>
  );
};

export default Alert;
