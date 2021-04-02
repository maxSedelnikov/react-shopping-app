/**
 * AXIOS basic setup for working with cart API
 * @category API
 * @subcategory Cart
 * @module Setup
 * @see module:Requests
 */

import axios from 'axios';

export default axios.create({
  baseURL: 'https://react-cart-79b85-default-rtdb.firebaseio.com/',
});
