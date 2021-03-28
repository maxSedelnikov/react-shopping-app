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
  const { items, loading } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    // loading user's cart data from db and setting it up to the store

    const fetchData = async () => {
      dispatch(startLoading());

      const response = await fetchCartItems();
      const cartItems = response.isError ? [] : response.reverse();

      dispatch(loadCartItems(cartItems));
      dispatch(stopLoading());

      if (response.isError)
        dispatch(
          showAlert({
            alertType: 'error',
            alertMessage: `Could not fetch cart items: ${response.errorMessage}`,
          })
        );
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className={classes.Cart}>
      <Section>
        <CartItems items={items} loading={loading} />
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
