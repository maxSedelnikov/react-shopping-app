import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { useDispatch } from 'react-redux';
import CartItems from './CartItems';

jest.mock('react-redux');

describe('CartItems', () => {
  const props = {
    items: [
      {
        id: '-MXGc7d2QzP8TTDWgBX_',
        name: 'test',
        pictureUrl: 'https://test.img',
        price: 2,
        quantity: 4,
      },
    ],
    loading: false,
    isEmptyCartSet: false,
  };

  it('renders cart items', () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    const { getByTestId, getAllByTestId } = render(
      <CartItems
        items={props.items}
        loading={props.loading}
        isEmptyCartSet={props.isEmptyCartSet}
      />
    );
    const listItems = getByTestId('cart-items-list');
    const items = getAllByTestId('cart-item');

    expect(listItems).toBeInTheDocument;
    expect(items).toHaveLength(1);
  });

  it('clears the cart', () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    window.confirm = jest.fn(() => true);
    const { getByTestId, getByText, rerender } = render(
      <CartItems
        items={props.items}
        loading={props.loading}
        isEmptyCartSet={props.isEmptyCartSet}
      />
    );
    const clearBtn = getByTestId('clear-cart-btn');
    userEvent.click(clearBtn);

    expect(window.confirm).toBeCalled();

    rerender(<CartItems items={[]} loading={false} isEmptyCartSet={true} />);

    expect(getByText(/Your cart is empty/i)).toBeInTheDocument();
  });
});
