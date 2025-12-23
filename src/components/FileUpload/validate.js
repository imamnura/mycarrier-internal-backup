// Example of validate
export const sizeValidate = ({ size }, maxSize) => {
  if (maxSize > 0 && size > maxSize) {
    return {
      passed: false,
      message: 'file is too big',
    };
  }

  return {
    passed: true,
    message: '',
  };
};
