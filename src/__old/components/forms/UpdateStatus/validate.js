/* eslint-disable no-useless-escape */
import Joi from 'joi-browser';
import validateInput from '../../../utils/validateInput';

export const NoteMessage = ({ errors, maxLength }) => {
  switch (errors[0].type) {
    case 'any.required': {
      return {
        message: 'Reason is required',
      };
    }
    case 'string.max': {
      return {
        message: `Reason length must be less than or equal to ${maxLength} characters long`,
      };
    }
    default: {
      return {
        message: 'Reason is error',
      };
    }
  }
};

const validate = (values, { maxLength }) => {
  const schema = {
    note: Joi.string()
      .required()
      .max(maxLength)
      .error((errors) => NoteMessage({ errors, maxLength })),
  };
  return validateInput({ values, schema });
};

export default validate;
