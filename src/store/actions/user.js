import actionTypes from './actionTypes';

const { SET_USER } = actionTypes;

export const setUserId = (id) => {
  return {
    type: SET_USER,
    payload: id,
  };
};
