import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { ReactComponent as FinishOrderIcon } from 'assets/icons/cartIcons/order.svg';
import Button from 'components/UI/Button';
import {
  getCartSum,
  getNumberOfCartItems,
  getPriceToFixed,
} from 'helpers/functions';
import Section from 'hoc/Section';
import { showAlert } from 'store/actions/alert';
import { updateCartInfo } from 'store/actions/cart';

import classes from './CartTotal.module.css';

/**
 * @category Applicationz
 * @subcategory Elements
 * @component CartTotal
 * @param {array} items cart items
 * @returns {jsx} information about yser's order
 * @see Section
 * @see Button
 * @see getNumberOfCartItems
 * @see getCartSum
 * @see getPriceToFixed
 */

const CartTotal = ({ items }) => {
  const numberOfItems = getNumberOfCartItems(items);
  const totalSum = getCartSum(items);
  const totalSumCut = getPriceToFixed(totalSum, 2);
  const dispatch = useDispatch();

  /**
   * Using react hook useEffect to render the current info about user's order
   * @memberof CartTotal
   * @inner
   * @function useEffect
   * @see module:CartActions~updateCartInfo
   * @see module:AlertActions~showAlert
   */

  useEffect(() => {
    // updating cart store with carts info
    const info = {
      numberOfItems,
      totalSum,
    };

    dispatch(updateCartInfo(info));
  }, [dispatch, numberOfItems, totalSum]);

  const finishOrder = () => {
    dispatch(
      showAlert({
        alertType: 'success',
        alertMessage: 'Success!',
      })
    );
  };

  return (
    <Section>
      <div className={classes.CartTotal}>
        <h3>Cart Info</h3>
        <p className={classes.totalItems}>
          <strong>Total items in cart :</strong>
          <span data-testid='number-of-cart-items'>{numberOfItems}</span>
        </p>
        <p className={classes.totalPrice}>
          <strong>Total price :</strong>
          <span data-testid='cart-sum'>{totalSumCut} $</span>
        </p>
        <Button
          disabled={numberOfItems === 0}
          onClick={finishOrder}
          dataTestId='finish-order-btn'
        >
          <span>finish order</span>
          <FinishOrderIcon width='20' height='20' />
        </Button>
      </div>
    </Section>
  );
};

export default CartTotal;
