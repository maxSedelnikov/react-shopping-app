import actionTypes from './actionTypes';

const { SHOW_ALERT, HIDE_ALERT } = actionTypes;

export const showAlert = ({ alertType, alertMessage }) => {
  return {
    type: SHOW_ALERT,
    payload: { alertType, alertMessage },
  };
};

export const hideAlert = () => {
  return {
    type: HIDE_ALERT,
  };
};
