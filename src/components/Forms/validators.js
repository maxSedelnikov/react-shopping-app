// validation functions to use

const rgxpNumber = /[(0-9)+.?(0-9)*]+/gim;
const rgxpImageUrl = /(https?:\/\/.*\.(?:png|jpg|gif))/i;

export const validateNumber = (number) => {
  return rgxpNumber.test(Number(number));
};

export const validateImgUrl = (url) => {
  return rgxpImageUrl.test(url);
};

export const validateNotEmptyText = (text) => {
  return text.trim().length !== 0;
};

export const validateMinLength = (value, minLength) => {
  return value.length >= minLength;
};
