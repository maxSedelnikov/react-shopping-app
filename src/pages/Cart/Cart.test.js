import React from 'react';
import renderWithRedux from '../../testUtils/renderWithRedux.js';
import Cart from './Cart';

describe('Cart', () => {
  it('starts loading cart', () => {
    const { getByTestId } = renderWithRedux(<Cart />, {
      initialState: {
        cart: {
          items: [],
          isEmptyCartSet: false,
          numberOfItems: 0,
          totalSum: 0,
          loading: true,
        },
      },
    });
    const loader = getByTestId('loader');
    const numberOfItemsInCart = getByTestId('number-of-cart-items');
    const cartSum = getByTestId('cart-sum');
    const finishOrderBtn = getByTestId('finish-order-btn');

    expect(loader).toBeInTheDocument();
    expect(numberOfItemsInCart).toHaveTextContent('0');
    expect(cartSum).toHaveTextContent('0.00 $');
    expect(finishOrderBtn).toBeDisabled();
  });

  it('renders empty cart', () => {
    const { getByTestId, getByText, queryByTestId } = renderWithRedux(
      <Cart />,
      {
        initialState: {
          cart: {
            items: [],
            isEmptyCartSet: true,
            numberOfItems: 0,
            totalSum: 0,
            loading: false,
          },
        },
      }
    );
    const loader = queryByTestId('loader');
    const heading = getByText(/Your cart is empty/i);
    const numberOfItemsInCart = getByTestId('number-of-cart-items');
    const cartSum = getByTestId('cart-sum');
    const finishOrderBtn = getByTestId('finish-order-btn');

    expect(loader).toBeNull();
    expect(heading).toBeInTheDocument();
    expect(numberOfItemsInCart).toHaveTextContent('0');
    expect(cartSum).toHaveTextContent('0.00 $');
    expect(finishOrderBtn).toBeDisabled();
  });

  it('renders cart with items', () => {
    const { getByTestId, getAllByTestId } = renderWithRedux(<Cart />, {
      initialState: {
        cart: {
          items: [
            {
              id: '-MXGc7d2QzP8TTDWgBX_',
              name: 'test',
              pictureUrl: 'https://test.img',
              price: 2,
              quantity: 4,
            },
          ],
          isEmptyCartSet: true,
          numberOfItems: 0,
          totalSum: 0,
          loading: false,
        },
      },
    });
    const listItems = getByTestId('cart-items-list');
    const items = getAllByTestId('cart-item');
    const numberOfItemsInCart = getByTestId('number-of-cart-items');
    const cartSum = getByTestId('cart-sum');
    const finishOrderBtn = getByTestId('finish-order-btn');

    expect(listItems).toBeInTheDocument();
    expect(items).toHaveLength(1);
    expect(numberOfItemsInCart).toHaveTextContent('4');
    expect(cartSum).toHaveTextContent('8');
    expect(finishOrderBtn).not.toBeDisabled();
  });
});
