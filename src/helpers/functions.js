// global functions to use

export const getNumberOfCartItems = (cart = []) => {
  return cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);
};

export const getCartSum = (cart = []) => {
  return cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
};

export const getPriceToFixed = (price = 0, limit = 0) => {
  return price.toFixed(limit);
};

export const generateUniqId = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};

export const getUserId = () => {
  return window.localStorage.getItem(process.env.REACT_APP_USER_STORAGE_KEY);
};
