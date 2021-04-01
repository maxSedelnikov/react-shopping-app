import actionTypes from '../actions/actionTypes';

const { SHOW_ALERT, HIDE_ALERT } = actionTypes;

const initialState = {
  showAlert: false,
  type: 'error',
  message: 'Something went wrong...',
};

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
