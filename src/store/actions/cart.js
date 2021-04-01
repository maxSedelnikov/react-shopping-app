/**
 * Action functions for cart state
 * @category Store
 * @subcategory Actions
 * @module CartActions
 * @see module:ActionTypes
 * @see module:CartReducer
 */

import actionTypes from './actionTypes';

const {
  GET_CART_ITEMS,
  SET_EMPTY_CART,
  ADD_TO_CART,
  CLEAR_CART,
  UPDATE_PRODUCT_IN_CART,
  UPDATE_CART_INFO,
  REMOVE_FROM_CART,
  START_LOADING,
  STOP_LOADING,
} = actionTypes;

/**
 * An action to load user's cart items
 * @function loadCartItems
 * @param {array} items - cart items
 * @returns {object}
 */

export const loadCartItems = (items) => {
  return {
    type: GET_CART_ITEMS,
    payload: items,
  };
};

/**
 * An action to define the cart got empty
 * @function setEmptyCart
 * @returns {object}
 */

export const setEmptyCart = () => {
  return {
    type: SET_EMPTY_CART,
  };
};

/**
 * An action to add product to the cart
 * @function addToCart
 * @param {object} product
 * @returns {object}
 */

export const addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    payload: product,
  };
};

/**
 * An action to remove item from cart by id
 * @function removeProductFromCart
 * @param {string} id - product id to remove
 * @returns {object}
 */

export const removeProductFromCart = (id) => {
  return {
    type: REMOVE_FROM_CART,
    payload: id,
  };
};

/**
 *  An action to update product info in the cart
 * @function updateProductInCart
 * @param {object} info - updated product info
 * @returns {object}
 */

export const updateProductInCart = (info) => {
  return {
    type: UPDATE_PRODUCT_IN_CART,
    payload: info,
  };
};

/**
 * An action to clear the cart entirely
 * @function clearCart
 * @returns {object}
 */

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};

/**
 * An action to update general cart info about products added
 * @function updateCartInfo
 * @param {object} info - general cart info like number of items and total price
 * @returns {object}
 */

export const updateCartInfo = (info) => {
  return {
    type: UPDATE_CART_INFO,
    payload: info,
  };
};

/**
 * An action to start showing loader
 * @function startLoading
 * @returns {object}
 */

export const startLoading = () => {
  return {
    type: START_LOADING,
  };
};

/**
 * An action to stop showing loader
 * @function stopLoading
 * @returns {object}
 */

export const stopLoading = () => {
  return {
    type: STOP_LOADING,
  };
};
