import {
  validateImgUrl,
  validateMinLength,
  validateNotEmptyText,
  validateNumber,
} from '../validators';

/**
 * default form controls set up
 * @memberof AddToCartForm
 * @inner
 * @type {object}
 */

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

/**
 * Validating inputs according to required rules
 * @memberof AddToCartForm
 * @inner
 * @function validateControl
 * @param {any} value input value
 * @param {object} validation validation rules for current input
 * @returns {boolean} valid status
 * @see validateNotEmptyText
 * @see validateNumber
 * @see validateImgUrl
 * @see validateMinLength
 */

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
