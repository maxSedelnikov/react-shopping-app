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
    errorMessage: 'Enter valid product name',
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
    errorMessage: 'Enter valid image url',
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
    errorMessage: 'Enter valid price number',
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

  let isValid = true;

  if (validation.required) {
    isValid = validateNotEmptyText(value) && isValid;
  }

  if (validation.number) {
    isValid = validateNumber(value) && isValid;
  }

  if (validation.imgUrl) {
    isValid = validateImgUrl(value) && isValid;
  }

  if (validation.minLength) {
    isValid = validateMinLength(value, validation.minLength) && isValid;
  }

  return isValid;
};
