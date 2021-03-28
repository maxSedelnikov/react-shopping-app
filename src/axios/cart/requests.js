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
  try {
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
  } catch (error) {
    const errorInfo = { isError: true, errorMessage: error.message };

    return errorInfo;
  }
};

export const fetchProductToCart = (product) => {
  try {
    return axiosCart.post(withCredentials(), product);
  } catch (error) {
    const errorInfo = { isError: true, errorMessage: error.message };

    return errorInfo;
  }
};

export const fetchProductRemoveFromCart = (productId) => {
  try {
    return axiosCart.delete(withCredentials(productId));
  } catch (error) {
    const errorInfo = { isError: true, errorMessage: error.message };

    return errorInfo;
  }
};

export const fetchPoductUpdate = (product) => {
  try {
    return axiosCart.put(withCredentials(product.id), product);
  } catch (error) {
    const errorInfo = { isError: true, errorMessage: error.message };

    return errorInfo;
  }
};

export const fetchClearCart = () => {
  try {
    return axiosCart.delete(withCredentials(), {});
  } catch (error) {
    const errorInfo = { isError: true, errorMessage: error.message };

    return errorInfo;
  }
};
