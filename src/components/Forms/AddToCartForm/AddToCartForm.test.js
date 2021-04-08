import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { useDispatch } from 'react-redux';
import AddToCartForm from './AddToCartForm';

jest.mock('react-redux');

describe('AddToCartForm', () => {
  const labelName = 'Product name';
  const labelImg = 'Product image url';
  const labelPrice = 'Product price';
  const invalidNameMsg = 'The name should be longer';
  const invalidImgMsg = 'The url should lead to the image';
  const invalidPriceMsg = 'The price should be numeric';

  it('renders empty form', () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    const { getByRole, getByTestId } = render(<AddToCartForm />);
    const productNameInput = getByRole('textbox', { name: labelName });
    const productImageInput = getByRole('textbox', {
      name: labelImg,
    });
    const productPriceInput = getByRole('spinbutton', {
      name: labelPrice,
    });
    const createProductBtn = getByTestId('create-product-btn');

    expect(productNameInput).toHaveDisplayValue('');
    expect(productImageInput).toHaveDisplayValue('');
    expect(productPriceInput).toHaveDisplayValue('');
    expect(createProductBtn).toBeDisabled();
  });

  it('checks product name input valid', () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    const { getByRole, getByText, queryByText } = render(<AddToCartForm />);
    const productNameInput = getByRole('textbox', { name: labelName });

    userEvent.type(productNameInput, 'new');
    expect(getByText(invalidNameMsg)).toBeInTheDocument();

    userEvent.type(productNameInput, 'new product');
    expect(queryByText(invalidNameMsg)).toBeNull();
  });

  it('checks product image input valid', () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    const { getByRole, getByText, queryByText } = render(<AddToCartForm />);
    const productImageInput = getByRole('textbox', {
      name: labelImg,
    });

    userEvent.type(productImageInput, 'https://ipsumimage.appspot.com/140x100');
    expect(getByText(invalidImgMsg)).toBeInTheDocument();

    userEvent.type(
      productImageInput,
      'https://ipsumimage.appspot.com/140x100.png'
    );
    expect(queryByText(invalidImgMsg)).toBeNull();
  });

  it('checks product price input valid', () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    const { getByRole, getByText, queryByText } = render(<AddToCartForm />);
    const productPriceInput = getByRole('spinbutton', {
      name: labelPrice,
    });

    userEvent.type(productPriceInput, '44.');
    expect(getByText(invalidPriceMsg)).toBeInTheDocument();

    userEvent.type(productPriceInput, '44.99');
    expect(queryByText(invalidPriceMsg)).toBeNull();
  });

  it('checks form valid', () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    const { getByRole, getByTestId, queryByText } = render(<AddToCartForm />);
    const productNameInput = getByRole('textbox', { name: labelName });
    const productImageInput = getByRole('textbox', {
      name: labelImg,
    });
    const productPriceInput = getByRole('spinbutton', {
      name: labelPrice,
    });
    const createProductBtn = getByTestId('create-product-btn');

    userEvent.type(productNameInput, 'new product');
    userEvent.type(
      productImageInput,
      'https://ipsumimage.appspot.com/140x100.png'
    );
    userEvent.type(productPriceInput, '55.99');

    expect(queryByText(invalidNameMsg)).toBeNull();
    expect(queryByText(invalidImgMsg)).toBeNull();
    expect(queryByText(invalidPriceMsg)).toBeNull();
    expect(createProductBtn).not.toBeDisabled();
  });
});
