/**
 * A root reducer which combines all existing reducers for the store
 * @category Store
 * @subcategory Reducers
 * @module RootReducer
 * @returns {object} store
 * @see module:AlertReducer
 * @see module:CartReducer
 */

import { combineReducers } from 'redux';
import cartReducer from './cart';
import alertReducer from './alert';

export default combineReducers({
  cart: cartReducer,
  alert: alertReducer,
});
