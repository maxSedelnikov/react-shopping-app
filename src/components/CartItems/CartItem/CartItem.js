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

    const response = await fetchProductRemoveFromCart(id);

    if (!response.isError) {
      dispatch(removeProductFromCart(id));
    } else {
      dispatch(
        showAlert({
          alertType: 'error',
          alertMessage: `Could not remove product from cart: ${response.errorMessage}`,
        })
      );
    }
  };

  const onIncreaseQantityHandler = async () => {
    setQuantityLoader(true);

    const response = await fetchPoductUpdate({
      ...item,
      quantity: quantity + 1,
    });

    if (!response.isError) {
      const updatedProduct = response.data;

      dispatch(updateProductInCart(updatedProduct));
    } else {
      dispatch(
        showAlert({
          alertType: 'error',
          alertMessage: `Could not update product info: ${response.errorMessage}`,
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

      const response = await fetchPoductUpdate({
        ...item,
        quantity: quantity - 1,
      });

      if (!response.isError) {
        const updatedProduct = response.data;

        dispatch(updateProductInCart(updatedProduct));
      } else {
        dispatch(
          showAlert({
            alertType: 'error',
            alertMessage: `Could not update product info: ${response.errorMessage}`,
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
