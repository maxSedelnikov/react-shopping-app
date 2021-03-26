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
    throw Error(`Cannot fetch cart items ${error}`);
  }
};

export const fetchProductToCart = async (product) => {
  try {
    return await axiosCart.post(withCredentials(), product);
  } catch (error) {
    throw Error(`Cannot fetch product to cart ${error}`);
  }
};

export const fetchProductRemoveFromCart = async (productId) => {
  try {
    return await axiosCart.delete(withCredentials(productId));
  } catch (error) {
    throw Error(`Cannot remove product from cart ${error}`);
  }
};

export const fetchPoductUpdate = async (product) => {
  try {
    return await axiosCart.put(withCredentials(product.id), product);
  } catch (error) {
    throw Error(`Cannot update product info ${error}`);
  }
};

export const fetchClearCart = async () => {
  try {
    return await axiosCart.delete(withCredentials(), {});
  } catch (error) {
    throw Error(`Cannot clear cart ${error}`);
  }
};
