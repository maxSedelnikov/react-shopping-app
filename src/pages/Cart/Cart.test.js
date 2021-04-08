import { waitFor, waitForElementToBeRemoved } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { generateUniqId } from 'helpers/functions.js';
import { userIdStorageKey } from 'helpers/variables.js';
import renderWithRedux from 'testUtils/renderWithRedux.js';

import Cart from './Cart';

describe('Cart', () => {
  window.localStorage.setItem(userIdStorageKey, 'testUser');

  it('adds a new product to cart, checks product was added and updates cart info', async () => {
    const {
      getByRole,
      getByTestId,
      getAllByTestId,
      queryByText,
    } = renderWithRedux(<Cart />, {
      initialState: {
        cart: {
          items: [],
          isEmptyCartSet: true,
          numberOfItems: 0,
          totalSum: 0,
          loading: false,
        },
      },
    });
    const numberOfItemsInCart = getByTestId('number-of-cart-items');
    const cartSum = getByTestId('cart-sum');
    const finishOrderBtn = getByTestId('finish-order-btn');
    const productNameInput = getByRole('textbox', { name: 'Product name' });
    const productImageInput = getByRole('textbox', {
      name: 'Product image url',
    });
    const productPriceInput = getByRole('spinbutton', {
      name: 'Product price',
    });
    const createProductBtn = getByTestId('create-product-btn');

    expect(numberOfItemsInCart).toHaveTextContent('0');
    expect(cartSum).toHaveTextContent('0.00 $');
    expect(finishOrderBtn).toBeDisabled();

    userEvent.type(productNameInput, 'new product');
    userEvent.type(
      productImageInput,
      'https://ipsumimage.appspot.com/140x100.png'
    );
    userEvent.type(productPriceInput, '55.99');

    expect(queryByText('The name should be longer')).toBeNull();
    expect(queryByText('The url should lead to the image')).toBeNull();
    expect(queryByText('The price should be numeric')).toBeNull();
    expect(createProductBtn).not.toBeDisabled();

    userEvent.click(createProductBtn);

    await waitFor(() => expect(createProductBtn).toBeDisabled());
    expect(productNameInput).toHaveDisplayValue('');
    expect(productImageInput).toHaveDisplayValue('');
    expect(productPriceInput).toHaveDisplayValue('');

    const listItems = getByTestId('cart-items-list');
    const items = getAllByTestId('cart-item');

    expect(listItems).toBeInTheDocument();
    expect(items).toHaveLength(1);
    expect(numberOfItemsInCart).toHaveTextContent('1');
    expect(cartSum).toHaveTextContent('55.99 $');
    expect(finishOrderBtn).not.toBeDisabled();
  });

  it('increases quantity of a single product in cart and updates cart info', async () => {
    const { getByTestId, queryByTestId } = renderWithRedux(<Cart />, {
      initialState: {
        cart: {
          items: [
            {
              id: generateUniqId(),
              name: 'test product',
              pictureUrl: 'https://ipsumimage.appspot.com/140x100.png',
              price: 5,
              quantity: 10,
            },
          ],
          isEmptyCartSet: true,
          numberOfItems: 0,
          totalSum: 0,
          loading: false,
        },
      },
    });
    const item = getByTestId('cart-item');
    const increaseQntBtn = getByTestId('increase-quantity-btn');
    const numberOfItemsInCart = getByTestId('number-of-cart-items');
    const cartSum = getByTestId('cart-sum');
    const finishOrderBtn = getByTestId('finish-order-btn');

    expect(item).toBeInTheDocument();
    expect(getByTestId('product-quantity')).toHaveTextContent('10');
    expect(numberOfItemsInCart).toHaveTextContent('10');
    expect(cartSum).toHaveTextContent('50.00 $');
    expect(finishOrderBtn).not.toBeDisabled();

    userEvent.click(increaseQntBtn);

    expect(getByTestId('quantity-loader')).toBeInTheDocument();
    await waitForElementToBeRemoved(queryByTestId('quantity-loader'));
    expect(getByTestId('product-quantity')).toHaveTextContent('11');
    expect(numberOfItemsInCart).toHaveTextContent('11');
    expect(cartSum).toHaveTextContent('55.00 $');
    expect(finishOrderBtn).not.toBeDisabled();
  });

  it('decreases quantity of a single product in cart and updates cart info', async () => {
    const { getByTestId, queryByTestId } = renderWithRedux(<Cart />, {
      initialState: {
        cart: {
          items: [
            {
              id: generateUniqId(),
              name: 'test product',
              pictureUrl: 'https://ipsumimage.appspot.com/140x100.png',
              price: 5,
              quantity: 15,
            },
          ],
          isEmptyCartSet: true,
          numberOfItems: 0,
          totalSum: 0,
          loading: false,
        },
      },
    });
    const item = getByTestId('cart-item');
    const decreaseBtn = getByTestId('decrease-quantity-btn');
    const numberOfItemsInCart = getByTestId('number-of-cart-items');
    const cartSum = getByTestId('cart-sum');
    const finishOrderBtn = getByTestId('finish-order-btn');

    expect(item).toBeInTheDocument();
    expect(getByTestId('product-quantity')).toHaveTextContent('15');
    expect(numberOfItemsInCart).toHaveTextContent('15');
    expect(cartSum).toHaveTextContent('75.00 $');
    expect(finishOrderBtn).not.toBeDisabled();

    userEvent.click(decreaseBtn);

    expect(getByTestId('quantity-loader')).toBeInTheDocument();
    await waitForElementToBeRemoved(queryByTestId('quantity-loader'));
    expect(getByTestId('product-quantity')).toHaveTextContent('14');
    expect(numberOfItemsInCart).toHaveTextContent('14');
    expect(cartSum).toHaveTextContent('70.00 $');
    expect(finishOrderBtn).not.toBeDisabled();
  });

  it('removes one product from the cart and updates cart info', async () => {
    window.confirm = jest.fn(() => true);
    const { getByTestId, queryByTestId } = renderWithRedux(<Cart />, {
      initialState: {
        cart: {
          items: [
            {
              id: generateUniqId(),
              name: 'test product',
              pictureUrl: 'https://ipsumimage.appspot.com/140x100.png',
              price: 55,
              quantity: 1,
            },
          ],
          isEmptyCartSet: true,
          numberOfItems: 0,
          totalSum: 0,
          loading: false,
        },
      },
    });
    const item = getByTestId('cart-item');
    const removeBtn = getByTestId('remove-item-btn');
    const numberOfItemsInCart = getByTestId('number-of-cart-items');
    const cartSum = getByTestId('cart-sum');
    const finishOrderBtn = getByTestId('finish-order-btn');

    expect(item).toBeInTheDocument();
    expect(numberOfItemsInCart).toHaveTextContent('1');
    expect(cartSum).toHaveTextContent('55.00 $');
    expect(finishOrderBtn).not.toBeDisabled();

    userEvent.click(removeBtn);

    expect(window.confirm).toBeCalled();
    await waitForElementToBeRemoved(queryByTestId('cart-item'));
    expect(numberOfItemsInCart).toHaveTextContent('0');
    expect(cartSum).toHaveTextContent('0.00 $');
    expect(finishOrderBtn).toBeDisabled();
  });

  it('clears all the cart, checks the cart is empty and updates cart info', async () => {
    window.confirm = jest.fn(() => true);
    const { getByTestId, queryByTestId, getAllByTestId } = renderWithRedux(
      <Cart />,
      {
        initialState: {
          cart: {
            items: [
              {
                id: generateUniqId(),
                name: 'test product',
                pictureUrl: 'https://ipsumimage.appspot.com/140x100.png',
                price: 100,
                quantity: 5,
              },
              {
                id: generateUniqId(),
                name: 'test product',
                pictureUrl: 'https://ipsumimage.appspot.com/140x100.png',
                price: 33,
                quantity: 10,
              },
            ],
            isEmptyCartSet: true,
            numberOfItems: 0,
            totalSum: 0,
            loading: false,
          },
        },
      }
    );
    const listItems = getByTestId('cart-items-list');
    const items = getAllByTestId('cart-item');
    const clearCartBtn = getByTestId('clear-cart-btn');
    const numberOfItemsInCart = getByTestId('number-of-cart-items');
    const cartSum = getByTestId('cart-sum');
    const finishOrderBtn = getByTestId('finish-order-btn');

    expect(listItems).toBeInTheDocument();
    expect(items).toHaveLength(2);
    expect(numberOfItemsInCart).toHaveTextContent('15');
    expect(cartSum).toHaveTextContent('830.00 $');
    expect(finishOrderBtn).not.toBeDisabled();

    userEvent.click(clearCartBtn);

    expect(window.confirm).toBeCalled();

    await waitForElementToBeRemoved(queryByTestId('cart-items-list'));
    expect(numberOfItemsInCart).toHaveTextContent('0');
    expect(cartSum).toHaveTextContent('0.00 $');
    expect(finishOrderBtn).toBeDisabled();
  });
});
