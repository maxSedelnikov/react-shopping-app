import { render } from '@testing-library/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { generateUniqId } from '../../helpers/functions';
import CartItems from './CartItems';

jest.mock('react-redux');

describe('CartItems', () => {
  const props = {
    items: [
      {
        id: generateUniqId(),
        name: 'test',
        pictureUrl: 'https://ipsumimage.appspot.com/140x100.png',
        price: 2,
        quantity: 4,
      },
    ],
    loading: false,
    isEmptyCartSet: false,
  };

  it('renders loader', () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    const { getByTestId } = render(
      <CartItems items={[]} loading={true} isEmptyCartSet={false} />
    );
    const loader = getByTestId('loader');

    expect(loader).toBeInTheDocument();
  });

  it('renders empty cart', () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    const { getByText, queryByTestId } = render(
      <CartItems items={[]} loading={false} isEmptyCartSet={true} />
    );
    const loader = queryByTestId('loader');
    const heading = getByText(/Your cart is empty/i);

    expect(loader).toBeNull();
    expect(heading).toBeInTheDocument();
  });

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

    expect(listItems).toBeInTheDocument();
    expect(items).toHaveLength(1);
  });
});
