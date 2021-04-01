/**
 * Action functions for alert state
 * @category Store
 * @subcategory Actions
 * @module AlertActions
 * @see module:ActionTypes
 * @see module:AlertReducer
 */

import actionTypes from './actionTypes';

const { SHOW_ALERT, HIDE_ALERT } = actionTypes;

/**
 * An action to show alert
 * @function showAlert
 * @param {string} alertType - type of alert
 * @param {string} alertMessage - message to show
 * @returns {object}
 */

export const showAlert = ({ alertType, alertMessage }) => {
  return {
    type: SHOW_ALERT,
    payload: { alertType, alertMessage },
  };
};

/**
 * An action to hide alert
 * @function hideAlert
 * @returns {object}
 */

export const hideAlert = () => {
  return {
    type: HIDE_ALERT,
  };
};
