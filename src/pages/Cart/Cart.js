import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems } from '../../axios/cart/requests';
import CartItems from '../../components/CartItems/CartItems';
import CartTotal from '../../components/CartTotal/CartTotal';
import AddToCartForm from '../../components/Forms/AddToCartForm/AddToCartForm';
import Section from '../../hoc/Section/Section';
import { showAlert } from '../../store/actions/alert';
import {
  loadCartItems,
  startLoading,
  stopLoading,
} from '../../store/actions/cart';
import classes from './Cart.module.css';

const Cart = () => {
  const { items, loading, isEmptyCartSet } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    // loading user's cart data from db and setting it up to the store

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
