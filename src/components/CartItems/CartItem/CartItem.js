import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ReactComponent as DecreaseQntCounter } from '../../../assets/icons/cartIcons/decrease.svg';
import { ReactComponent as IncreaseQntIcon } from '../../../assets/icons/cartIcons/increase.svg';
import { ReactComponent as RemoveItemIcon } from '../../../assets/icons/cartIcons/remove.svg';
import {
  fetchPoductUpdate,
  fetchProductRemoveFromCart,
} from '../../../axios/cart/requests';
import { getPriceToFixed } from '../../../helpers/functions';
import { showAlert } from '../../../store/actions/alert';
import {
  removeProductFromCart,
  updateProductInCart,
} from '../../../store/actions/cart';
import Button from '../../UI/Button/Button';
import QuantityLoader from '../../UI/QuantityLoader/QuantityLoader';
import classes from './CartItem.module.css';

// displaying separate cart items

const CartItem = ({ item }) => {
  const { id, name, price, pictureUrl, quantity } = item;
  const modPrice = getPriceToFixed(price, 2);
  const [qantityLoader, setQuantityLoader] = useState(false);
  const dispatch = useDispatch();

  const onRemoveHandler = async () => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm(`Are you sure to delete ${name} from your order?`)) return;

    try {
      await fetchProductRemoveFromCart(id);

      dispatch(removeProductFromCart(id));
      dispatch(
        showAlert({
          alertType: 'warning',
          alertMessage: 'Product was removed from your order',
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

  const onDecreaseQantityHandler = async () => {
    if (quantity === 1) {
      onRemoveHandler();
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
    <li className={classes.CartItem}>
      <img
        className={classes.prdocutImg}
        src={pictureUrl}
        loading='lazy'
        alt={name}
      />
      <div className={classes.productInfo}>
        <span className={classes.productName}>{name}</span>
        <span className={classes.productPrice}>{modPrice}&nbsp;$</span>
        <div className={classes.actions}>
          {qantityLoader ? (
            <QuantityLoader />
          ) : (
            <div className={classes.productQuntity}>
              <Button
                type='icon'
                title='decrease quantity'
                onClick={() => onDecreaseQantityHandler()}
              >
                <DecreaseQntCounter width='20' height='20' />
              </Button>
              <span>{quantity}</span>
              <Button
                type='icon'
                title='increase quantity'
                onClick={() => onIncreaseQantityHandler()}
              >
                <IncreaseQntIcon width='20' height='20' />
              </Button>
            </div>
          )}
          <Button
            type='iconAbsolute'
            title='remove item'
            onClick={() => onRemoveHandler()}
          >
            <RemoveItemIcon width='20' height='20' />
          </Button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
