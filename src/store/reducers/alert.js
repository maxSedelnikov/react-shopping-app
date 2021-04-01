/**
 * A reducer for alert state
 * @category Store
 * @subcategory Reducers
 * @module AlertReducer
 * @see module:AlertActions
 * @see module:ActionTypes
 */

import actionTypes from '../actions/actionTypes';

const { SHOW_ALERT, HIDE_ALERT } = actionTypes;

const initialState = {
  showAlert: false,
  type: 'error',
  message: 'Something went wrong...',
};

/**
 * Alert reducer for store
 * @function alertReducer
 * @param {object} state current state
 * @param {string} type action type
 * @param {any} payload values to update the current state
 * @returns {object} current state
 */

const alertReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SHOW_ALERT:
      return {
        ...state,
        showAlert: true,
        type: payload.alertType,
        message: payload.alertMessage,
      };

    case HIDE_ALERT:
      return {
        initialState,
      };

    default:
      return state;
  }
};

export default alertReducer;
