/**
 * Gets the number of cart items
 * @category Application
 * @subcategory Helpers
 * @function getNumberOfCartItems
 * @param {array} cart - user's cart items
 * @returns {number} Number of cart items
 */

import { userIdStorageKey } from './variables';

export const getNumberOfCartItems = (cart = []) => {
  return cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);
};

/**
 * Gets the sum of cart items
 * @category Application
 * @subcategory Helpers
 * @function getCartSum
 * @param {array} cart - user's cart items
 * @returns {number} Sum of cart items
 */

export const getCartSum = (cart = []) => {
  return cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
};

/**
 * Normalizes the product's price
 * @category Application
 * @subcategory Helpers
 * @function getPriceToFixed
 * @param {number} price - product's price
 * @param {number} limit - limit of characters to shorten the price
 * @returns {string} updated product's price
 */

export const getPriceToFixed = (price = 0, limit = 0) => {
  return price.toFixed(limit);
};

/**
 * Generates a uniq id
 * @category Application
 * @subcategory Helpers
 * @function generateUniqId
 * @returns {string} uniq id
 */

export const generateUniqId = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};

/**
 * Gets the user by id
 * @category Application
 * @subcategory Helpers
 * @function getUserId
 * @returns {string} user's id
 */

export const getUserId = () => {
  return window.localStorage.getItem(userIdStorageKey);
};
