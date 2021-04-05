import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ReactComponent as ClearCartIcon } from '../../assets/icons/cartIcons//clear.svg';
import { fetchClearCart } from '../../axios/cart/requests';
import { showAlert } from '../../store/actions/alert';
import { clearCart, setEmptyCart } from '../../store/actions/cart';
import EmptyCart from '../EmptyCart/EmptyCart';
import Button from '../UI/Button/Button';
import Loader from '../UI/Loader/Loader';
import CartItem from './CartItem/CartItem';
import classes from './CartItems.module.css';

/**
 * Component for rendering cart products recieved for user
 * @category Application
 * @subcategory Elements
 * @component CartItems
 * @param {array} items - cart items added
 * @param {boolean} loading - status of loading the cart
 * @param {boolean} isEmptyCartSet - status of empty cart set
 * @returns {jsx} cart content
 * @see Loader
 * @see EmptyCart
 * @see Button
 * @see CartItem
 */

const CartItems = ({ items, loading, isEmptyCartSet }) => {
  const dispatch = useDispatch();

  /**
   * Using react hook useEffect to set empty cart if the cart is empty
   * @memberof CartItems
   * @inner
   * @function useEffect
   * @see module:CartActions~setEmptyCart
   */

  useEffect(() => {
    if (items.length === 0) dispatch(setEmptyCart());
  }, [dispatch, items.length]);

  /**
   * Clear cart handler
   * @memberof CartItems
   * @inner
   * @function onClearCartHandler
   * @see module:CartActions~setEmptyCart
   * @see module:CartActions~clearCart
   * @see module:AlertActions~showAlert
   * @see module:Requests~fetchClearCart
   */

  const onClearCartHandler = async () => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm(`Are you sure to clear your cart completely?`)) return;

    try {
      await fetchClearCart();

      dispatch(clearCart());
      dispatch(setEmptyCart());
      dispatch(
        showAlert({
          alertType: 'warning',
          alertMessage: 'Your cart was cleared',
        })
      );
    } catch (error) {
      dispatch(
        showAlert({
          alertType: 'error',
          alertMessage: `Could not clear cart: ${error.message}`,
        })
      );
    }
  };

  if (loading) {
    return (
      <div className={classes.CartItems}>
        <Loader />
      </div>
    );
  }

  if (items.length === 0 && isEmptyCartSet) {
    return <EmptyCart />;
  }

  return (
    <div className={classes.CartItems}>
      <div className={classes.title}>
        <h3>Your order</h3>
        <Button
          type='icon'
          title='clear cart'
          onClick={() => onClearCartHandler()}
          dataTestId='clear-cart-btn'
        >
          <ClearCartIcon width='20' height='20' />
        </Button>
      </div>
      <ul data-testid='cart-items-list'>
        {items.map((item) => (
          <CartItem key={item.id} item={item} dataTestId='cart-item' />
        ))}
      </ul>
    </div>
  );
};

export default CartItems;
