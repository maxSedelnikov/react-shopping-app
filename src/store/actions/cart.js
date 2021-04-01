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

export const loadCartItems = (items) => {
  return {
    type: GET_CART_ITEMS,
    payload: items,
  };
};

export const setEmptyCart = () => {
  return {
    type: SET_EMPTY_CART,
  };
};

export const addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    payload: product,
  };
};

export const removeProductFromCart = (id) => {
  return {
    type: REMOVE_FROM_CART,
    payload: id,
  };
};

export const updateProductInCart = (info) => {
  return {
    type: UPDATE_PRODUCT_IN_CART,
    payload: info,
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};

export const updateCartInfo = (info) => {
  return {
    type: UPDATE_CART_INFO,
    payload: info,
  };
};

export const startLoading = () => {
  return {
    type: START_LOADING,
  };
};
export const stopLoading = () => {
  return {
    type: STOP_LOADING,
  };
};
