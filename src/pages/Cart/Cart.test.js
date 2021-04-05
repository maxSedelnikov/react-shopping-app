import { render } from '@testing-library/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './Cart';

jest.mock('react-redux');

describe('Cart', () => {
  it('starts loading cart', () => {
    useSelector.mockImplementation((cb) =>
      cb({
        cart: {
          items: [],
          isEmptyCartSet: false,
          numberOfItems: 0,
          totalSum: 0,
          loading: true,
        },
      })
    );
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    const { getByTestId } = render(<Cart />);
    const loader = getByTestId('loader');

    expect(loader).toBeInTheDocument();
  });

  it('renders empty cart initially', () => {
    useSelector.mockImplementation((cb) =>
      cb({
        cart: {
          items: [],
          isEmptyCartSet: true,
          numberOfItems: 0,
          totalSum: 0,
          loading: false,
        },
      })
    );
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    const { getByText, getByTestId, queryByTestId } = render(<Cart />);
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
    useSelector.mockImplementation((cb) =>
      cb({
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
          isEmptyCartSet: false,
          numberOfItems: 0,
          totalSum: 0,
          loading: false,
        },
      })
    );
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    const { getByTestId, getAllByTestId } = render(<Cart />);
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
