import { getUserId } from '../../helpers/functions';
import axiosCart from './axios-cart';

// existing requests for cart API

const withCredentials = (productId) => {
  const userId = getUserId();
  const url = productId
    ? `users/${userId}/cart/${productId}/.json`
    : `users/${userId}/cart.json`;

  return url;
};

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

export const fetchProductToCart = (product) => {
  return axiosCart.post(withCredentials(), product);
};

export const fetchProductRemoveFromCart = (productId) => {
  return axiosCart.delete(withCredentials(productId));
};

export const fetchPoductUpdate = (product) => {
  return axiosCart.put(withCredentials(product.id), product);
};

export const fetchClearCart = () => {
  return axiosCart.delete(withCredentials(), {});
};
