import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems } from '../../axios/cart/requests';
import CartItems from '../../components/CartItems/CartItems';
import CartTotal from '../../components/CartTotal/CartTotal';
import AddToCartForm from '../../components/Forms/AddToCartForm/AddToCartForm';
import Section from '../../hoc/Section/Section';
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

      const cartItems = await fetchCartItems();
      const cartItemsReversed = cartItems.reverse();

      dispatch(loadCartItems(cartItemsReversed));
      dispatch(stopLoading());
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
