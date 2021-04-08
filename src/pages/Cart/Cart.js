import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCartItems } from 'axios/cart/requests';
import CartItems from 'components/CartItems';
import CartTotal from 'components/CartTotal';
import AddToCartForm from 'components/Forms/AddToCartForm';
import Section from 'hoc/Section';
import { showAlert } from 'store/actions/alert';
import { loadCartItems, startLoading, stopLoading } from 'store/actions/cart';

import classes from './Cart.module.css';

/**
 * A component for user's cart items
 * @category Application
 * @subcategory Pages
 * @component Cart
 * @returns {jsx} - Cart page content with cart info and form to add new items
 * @see Section
 * @see CartItems
 * @see CartTotal
 * @see AddToCartForm
 */

const Cart = () => {
  const { items, loading, isEmptyCartSet } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  /**
   * Using react hook useLayoutEffect to fetch user's cart data and render it
   * @memberof Cart
   * @function useLayoutEffect
   * @inner
   * @see module:Requests~fetchCartItems
   * @see module:CartActions~startLoading
   * @see module:CartActions~stopLoading
   * @see module:CartActions~loadCartItems
   * @see module:AlertActions~showAlert
   */

  useLayoutEffect(() => {
    const fetchData = async () => {
      dispatch(startLoading());

      try {
        const cartItems = await fetchCartItems();
        const cartItemsReversed = cartItems.reverse();

        dispatch(loadCartItems(cartItemsReversed));
      } catch (error) {
        dispatch(
          showAlert({
            alertType: 'error',
            alertMessage: `Could not fetch cart items: ${error.message}`,
          })
        );
      }

      dispatch(stopLoading());
    };

    // start fetching data only if it is the first visit to the cart
    // if we loaded data before or the cart was cleared then use store to handle it

    if (items.length === 0 && !isEmptyCartSet) fetchData();
  }, [dispatch, items.length, isEmptyCartSet]);

  return (
    <div className={classes.Cart}>
      <Section>
        <CartItems
          items={items}
          loading={loading}
          isEmptyCartSet={isEmptyCartSet}
        />
      </Section>
      <aside>
        <div className={classes.sticky}>
          <CartTotal items={items} />
          <AddToCartForm />
        </div>
      </aside>
    </div>
  );
};

export default Cart;
