/**
 * AXIOS basic setup for working with cart API
 * @category API
 * @subcategory Cart
 * @module Setup
 * @see module:Requests
 * @see firebaseDataBaseUrl
 */

import axios from 'axios';
import { firebaseDataBaseUrl } from 'helpers/variables';

export default axios.create({
  baseURL: firebaseDataBaseUrl,
});
