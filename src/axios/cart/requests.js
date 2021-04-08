/**
 * Api request for working with cart API
 * @category API
 * @subcategory Cart
 * @module Requests
 */

import { getUserId } from 'helpers/functions';

import axiosCart from './axios-cart';

/**
 * A function to get proper url to connect to the database
 * @function withCredentials
 * @param {string} productId - product id
 * @returns {string} url
 */

const withCredentials = (productId) => {
  const userId = getUserId();
  const url = productId
    ? `users/${userId}/cart/${productId}/.json`
    : `users/${userId}/cart.json`;

  return url;
};

/**
 * A function to fetch cart items from the database
 * @function fetchCartItems
 * @async
 * @returns {array} items in cart
 */

export const fetchCartItems = async () => {
  const response = await axiosCart.get(withCredentials());
  const inCart = [];

  if (!response.data) return inCart;

  Object.keys(response.data).forEach((key) => {
    inCart.push({
      id: key,
      ...response.data[key],
    });
  });

  return inCart;
};

/**
 * A function to add product to cart
 * @function fetchProductToCart
 * @param {object} product
 * @returns {Promise} Promise object represents the response from the server
 */

export const fetchProductToCart = (product) => {
  return axiosCart.post(withCredentials(), product);
};

/**
 * @function fetchProductRemoveFromCart
 * @param {string} productId
 * @returns {Promise} Promise object represents the response from the server
 */

export const fetchProductRemoveFromCart = (productId) => {
  return axiosCart.delete(withCredentials(productId));
};

/**
 * @function fetchPoductUpdate
 * @param {object} product
 * @returns {Promise} Promise object represents the response from the server
 */

export const fetchPoductUpdate = (product) => {
  return axiosCart.put(withCredentials(product.id), product);
};

/**
 * @function fetchClearCart
 * @returns {Promise} Promise object represents the response from the server
 */

export const fetchClearCart = () => {
  return axiosCart.delete(withCredentials(), {});
};
