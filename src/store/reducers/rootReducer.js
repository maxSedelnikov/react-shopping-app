import { combineReducers } from 'redux';

import alertReducer from './alert';
import cartReducer from './cart';

/**
 * A root reducer which combines all existing reducers for the store
 * @category Store
 * @subcategory Reducers
 * @module RootReducer
 * @returns { combineReducers } store
 * @see module:AlertReducer
 * @see module:CartReducer
 */

export default combineReducers({
  cart: cartReducer,
  alert: alertReducer,
});
