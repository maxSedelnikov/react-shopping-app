/**
 * AXIOS basic setup for working with cart API
 * @category API
 * @subcategory Cart
 * @module Setup
 * @see module:Requests
 */

import axios from 'axios';

const { REACT_APP_FIREBASE_DB_URL } = process.env;

export default axios.create({
  baseURL: REACT_APP_FIREBASE_DB_URL,
});
