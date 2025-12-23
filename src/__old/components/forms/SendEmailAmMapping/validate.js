import Joi from 'joi-browser';
import validateInput from '../../../utils/validateInput';

const phoneNumberMessage = (errors) => {
  switch (errors[0].type) {
    case 'any.required': {
      return {
        message: '"Phone Number (WA)" is required',
      };
    }
    case 'string.regex.base': {
      return {
        message: `"Phone Number (WA)" must be a number`,
      };
    }
    case '"string.max"': {
      return {
        message:
          '"Phone Number length must be less than or equal to 16 characters long"',
      };
    }
    default: {
      return {
        message: 'Phone Number is error',
      };
    }
  }
};

const validate = (values) => {
  const schema = {
    email: Joi.string()
      .max(40)
      .required()
      .regex(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4}$)/) // eslint-disable-line
      .error(() => ({
        message: 'Please type valid email',
      })),
    fullName: Joi.string().max(56).required().label('Fullname'),
    phoneNumber: Joi.string()
      .required()
      .max(17)
      .regex(/^[0-9].*/)
      .error(phoneNumberMessage),
  };
  return validateInput({ values, schema });
};

export default validate;
