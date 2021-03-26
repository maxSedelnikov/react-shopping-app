import React from 'react';
import { useDispatch } from 'react-redux';
import { ReactComponent as ClearCartIcon } from '../../assets/icons/cartIcons//clear.svg';
import { fetchClearCart } from '../../axios/cart/requests';
import { clearCart } from '../../store/actions/cart';
import EmptyCart from '../EmptyCart/EmptyCart';
import Button from '../UI/Button/Button';
import Loader from '../UI/Loader/Loader';
import CartItem from './CartItem/CartItem';
import classes from './CartItems.module.css';

// displayng cart's content depending on cart products recieved from db

const CartItems = ({ items, loading }) => {
  const dispatch = useDispatch();

  const onClearCartHandler = async () => {
    // eslint-disable-next-line no-restricted-globals
    const isConfirmed = confirm(`Are you sure to clear your cart completely?`);

    if (isConfirmed) {
      await fetchClearCart();

      dispatch(clearCart());
    }
  };

  if (loading) {
    return (
      <div className={classes.CartItems}>
        <Loader />
      </div>
    );
  }

  if (items.length === 0) {
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
        >
          <ClearCartIcon width='20' height='20' />
        </Button>
      </div>
      <ul>
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default CartItems;
