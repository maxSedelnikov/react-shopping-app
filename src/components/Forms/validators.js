// validation functions to use

export const validateNumber = (number) => {
  const rgxp = /[(0-9)+.?(0-9)*]+/gim;
  return rgxp.test(Number(number));
};

export const validateImgUrl = (url) => {
  const rgxp = /(https?:\/\/.*\.(?:png|jpg|gif))/i;
  return rgxp.test(url);
};

export const validateNotEmptyText = (text) => {
  return text.trim().length !== 0;
};

export const validateMinLength = (value, minLength) => {
  return value.length >= minLength;
};
