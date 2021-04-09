import React from 'react';
import { useDispatch } from 'react-redux';

import { ReactComponent as RemoveItemIcon } from 'assets/icons/cartIcons/remove.svg';
import { fetchProductRemoveFromCart } from 'axios/cart/requests';
import Button from 'components/UI/Button';
import { getPriceToFixed } from 'helpers/functions';
import { showAlert } from 'store/actions/alert';
import { removeProductFromCart } from 'store/actions/cart';

import classes from './CartItem.module.css';
import CartItemInfo from './CartItemInfo';
import CartItemQuantity from './CartItemQuantity';

/**
 * Component for one cart item
 * @category Application
 * @subcategory Elements
 * @component CartItem
 * @param {object} item
 * @returns {jsx} layout for ine cart product added
 * @see CartItemInfo
 * @see CartItemQuantity
 * @see Button
 * @see getPriceToFixed
 */

const CartItem = ({ item, dataTestId }) => {
  const { id, name, price, pictureUrl } = item;
  const modPrice = getPriceToFixed(price, 2);
  const dispatch = useDispatch();

  /**
   * Remove item handler
   * @memberof CartItem
   * @inner
   * @function onRemoveHandler
   * @see module:Requests~fetchProductRemoveFromCart
   * @see module:CartActions~removeProductFromCart
   * @see module:AlertActions~showAlert
   */

  const onRemoveHandler = async () => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm(`Are you sure to delete ${name} from your cart?`)) return;

    try {
      await fetchProductRemoveFromCart(id);

      dispatch(removeProductFromCart(id));
      dispatch(
        showAlert({
          alertType: 'warning',
          alertMessage: 'Product was removed from your cart',
        })
      );
    } catch (error) {
      dispatch(
        showAlert({
          alertType: 'error',
          alertMessage: `Could not remove product from cart: ${error.message}`,
        })
      );
    }
  };

  return (
    <li className={classes.CartItem} data-testid={dataTestId}>
      <CartItemInfo img={pictureUrl} name={name} price={modPrice} />
      <CartItemQuantity onRemove={onRemoveHandler} item={item} />
      <Button
        type='iconAbsolute'
        title='remove item'
        onClick={() => onRemoveHandler()}
        dataTestId='remove-item-btn'
      >
        <RemoveItemIcon width='20' height='20' />
      </Button>
    </li>
  );
};

export default CartItem;
