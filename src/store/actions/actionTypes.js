/**
 * All actions availible in the app
 * @category Store
 * @subcategory Actions
 * @module ActionTypes
 * @see module:AlertActions
 * @see module:CartActions
 */

const actionTypes = {
  GET_CART_ITEMS: 'GET_CART_ITEMS',
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_PRODUCT_IN_CART: 'UPDATE_PRODUCT_IN_CART',
  CLEAR_CART: 'CLEAR_CART',
  UPDATE_CART_INFO: 'UPDATE_CART_INFO',
  START_LOADING: 'START_LOADING',
  STOP_LOADING: 'STOP_LOADING',
  SHOW_ALERT: 'SHOW_ALERT',
  HIDE_ALERT: 'HIDE_ALERT',
  SET_EMPTY_CART: 'SET_EMPTY_CART',
};

export default actionTypes;
