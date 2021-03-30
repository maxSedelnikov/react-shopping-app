import {
  validateImgUrl,
  validateMinLength,
  validateNotEmptyText,
  validateNumber,
} from '../validators';

// default form controls set up

export const initialFormControls = {
  productName: {
    value: '',
    type: 'text',
    label: 'Product name',
    errorMessage: 'The name should be longer',
    valid: false,
    touched: false,
    validation: {
      required: true,
      minLength: 4,
    },
  },
  productUrl: {
    value: '',
    type: 'text',
    label: 'Product image url',
    errorMessage: 'The url should lead to the image',
    valid: false,
    touched: false,
    validation: {
      required: true,
      imgUrl: true,
    },
  },
  productPrice: {
    value: '',
    type: 'number',
    label: 'Product price',
    errorMessage: 'The price should be numeric',
    valid: false,
    touched: false,
    validation: {
      required: true,
      number: true,
    },
  },
};

// validation rules setting for adding to cart form

export const validateControl = (value, validation) => {
  if (!value) {
    return false;
  }

  let isValid = !validation.required || validateNotEmptyText(value);

  isValid = isValid && (!validation.number || validateNumber(value));
  isValid = isValid && (!validation.imgUrl || validateImgUrl(value));
  isValid =
    isValid &&
    (!validation.minLength || validateMinLength(value, validation.minLength));

  return isValid;
};
