import { render } from '@testing-library/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { generateUniqId } from '../../helpers/functions';
import CartTotal from './CartTotal';

jest.mock('react-redux');

describe('CartTotal', () => {
  const props = {
    items: [
      {
        id: generateUniqId(),
        name: 'test',
        pictureUrl: 'https://ipsumimage.appspot.com/140x100.png',
        price: 5,
        quantity: 10,
      },
    ],
  };

  it('renders initial cart info', () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    const { getByTestId } = render(<CartTotal items={[]} />);
    const numberOfItemsInCart = getByTestId('number-of-cart-items');
    const cartSum = getByTestId('cart-sum');
    const finishOrderBtn = getByTestId('finish-order-btn');

    expect(numberOfItemsInCart).toHaveTextContent('0');
    expect(cartSum).toHaveTextContent('0.00 $');
    expect(finishOrderBtn).toBeDisabled();
  });

  it('renders updated cart info', () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    const { getByTestId } = render(<CartTotal items={props.items} />);
    const numberOfItemsInCart = getByTestId('number-of-cart-items');
    const cartSum = getByTestId('cart-sum');
    const finishOrderBtn = getByTestId('finish-order-btn');

    expect(numberOfItemsInCart).toHaveTextContent('10');
    expect(cartSum).toHaveTextContent('50.00 $');
    expect(finishOrderBtn).not.toBeDisabled();
  });
});
