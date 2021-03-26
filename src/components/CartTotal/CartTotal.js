import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ReactComponent as FinishOrderIcon } from '../../assets/icons/cartIcons//order.svg';
import {
  getCartSum,
  getNumberOfCartItems,
  getPriceToFixed,
} from '../../helpers/functions';
import Section from '../../hoc/Section/Section';
import { updateCartInfo } from '../../store/actions/cart';
import Button from '../UI/Button/Button';
import classes from './CartTotal.module.css';

// displaying cart info

const CartTotal = ({ items }) => {
  const numberOfItems = getNumberOfCartItems(items);
  const totalSum = getCartSum(items);
  const totalSumCut = getPriceToFixed(totalSum, 2);
  const dispatch = useDispatch();

  useEffect(() => {
    // updating cart store with carts info
    const info = {
      numberOfItems,
      totalSum,
    };

    dispatch(updateCartInfo(info));
  }, [dispatch, numberOfItems, totalSum]);

  return (
    <Section>
      <div className={classes.CartTotal}>
        <h3>Cart Info</h3>
        <p className={classes.totalItems}>
          <strong>Total items in cart :</strong>
          <span>{numberOfItems}</span>
        </p>
        <p className={classes.totalPrice}>
          <strong>Total price :</strong>
          <span>{totalSumCut} $</span>
        </p>
        <Button disabled={numberOfItems === 0}>
          <span>finish order</span>
          <FinishOrderIcon width='20' height='20' />
        </Button>
      </div>
    </Section>
  );
};

export default CartTotal;
