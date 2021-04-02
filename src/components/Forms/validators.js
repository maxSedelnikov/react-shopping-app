/**
 * RegExp patter to validate a number
 * @category Application
 * @subcategory Helpers
 * @constant rgxpNumber
 * @type {Object}
 */

/**
 * RegExp patter to validate an img url
 * @category Application
 * @subcategory Helpers
 * @constant rgxpImageUrl
 * @type {Object}
 */

const rgxpNumber = /[(0-9)+.?(0-9)*]+/gim;
const rgxpImageUrl = /(https?:\/\/.*\.(?:png|jpg|gif))/i;

/**
 * Validates value to be a number
 * @category Application
 * @subcategory Helpers
 * @function validateNumber
 * @param {number} number a number to check
 * @returns {boolean}
 */

export const validateNumber = (number) => {
  return rgxpNumber.test(Number(number));
};

/**
 * Validates value to be a url image
 * @category Application
 * @subcategory Helpers
 * @function validateImgUrl
 * @param {string} url a url to check
 * @returns {boolean}
 */

export const validateImgUrl = (url) => {
  return rgxpImageUrl.test(url);
};

/**
 * Validates value to be not empty
 * @category Application
 * @subcategory Helpers
 * @function validateNotEmptyText
 * @param {string} text a text to check
 * @returns {boolean}
 */

export const validateNotEmptyText = (text) => {
  return text.trim().length !== 0;
};

/**
 * Validates value to be more than min length set
 * @category Application
 * @subcategory Helpers
 * @function validateMinLength
 * @param {string} value a value to check
 * @param {minLength} number min length
 * @returns {boolean}
 */

export const validateMinLength = (value, minLength) => {
  return value.length >= minLength;
};
