import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { ReactComponent as DecreaseQntCounter } from 'assets/icons/cartIcons/decrease.svg';
import { ReactComponent as IncreaseQntIcon } from 'assets/icons/cartIcons/increase.svg';
import { fetchPoductUpdate } from 'axios/cart/requests';
import Button from 'components/UI/Button';
import QuantityLoader from 'components/UI/QuantityLoader';
import { showAlert } from 'store/actions/alert';
import { updateProductInCart } from 'store/actions/cart';

import classes from './CartItemQuantity.module.css';

/**
 * @category Application
 * @subcategory Elements
 * @component CartItemQuantity
 * @param {object} item single item info
 * @param {function} onRemove callback function to remove item from cart
 * @returns {jsx} item quantity layout
 */

const CartItemQuantity = ({ item, onRemove }) => {
  const { quantity } = item;
  const [qantityLoader, setQuantityLoader] = useState(false);
  const dispatch = useDispatch();

  /**
   * Increase item's quantity handler
   * @memberof CartItemQuantity
   * @inner
   * @function onIncreaseQantityHandler
   * @see module:Requests~fetchPoductUpdate
   * @see module:CartActions~updateProductInCart
   * @see module:AlertActions~showAlert
   */

  const onIncreaseQantityHandler = async () => {
    setQuantityLoader(true);

    try {
      const response = await fetchPoductUpdate({
        ...item,
        quantity: quantity + 1,
      });

      const updatedProduct = response.data;

      dispatch(updateProductInCart(updatedProduct));
    } catch (error) {
      dispatch(
        showAlert({
          alertType: 'error',
          alertMessage: `Could not update product info: ${error.message}`,
        })
      );
    }

    setQuantityLoader(false);
  };

  /**
   * Decrease item's quantity handler
   * @memberof CartItemQuantity
   * @inner
   * @function onDecreaseQantityHandler
   * @see module:Requests~fetchPoductUpdate
   * @see module:CartActions~updateProductInCart
   * @see module:AlertActions~showAlert
   */

  const onDecreaseQantityHandler = async () => {
    if (quantity === 1) {
      onRemove();
    } else {
      setQuantityLoader(true);

      try {
        const response = await fetchPoductUpdate({
          ...item,
          quantity: quantity - 1,
        });

        const updatedProduct = response.data;

        dispatch(updateProductInCart(updatedProduct));
      } catch (error) {
        dispatch(
          showAlert({
            alertType: 'error',
            alertMessage: `Could not update product info: ${error.message}`,
          })
        );
      }

      setQuantityLoader(false);
    }
  };

  return (
    <div className={classes.CartItemQuantity}>
      {qantityLoader ? (
        <QuantityLoader />
      ) : (
        <>
          <Button
            type='icon'
            title='decrease quantity'
            onClick={() => onDecreaseQantityHandler()}
            dataTestId='decrease-quantity-btn'
          >
            <DecreaseQntCounter width='20' height='20' />
          </Button>
          <span data-testid='product-quantity'>{quantity}</span>
          <Button
            type='icon'
            title='increase quantity'
            onClick={() => onIncreaseQantityHandler()}
            dataTestId='increase-quantity-btn'
          >
            <IncreaseQntIcon width='20' height='20' />
          </Button>
        </>
      )}
    </div>
  );
};

export default CartItemQuantity;
