import { combineReducers } from 'redux';
import cartReducer from './cart';
import alertReducer from './alert';

export default combineReducers({
  cart: cartReducer,
  alert: alertReducer,
});
