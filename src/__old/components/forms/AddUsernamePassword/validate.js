/* eslint-disable no-useless-escape */
import Joi from 'joi-browser';
import validateInput from '../../../utils/validateInput';

export const NoteMessage = ({ errors }) => {
  switch (errors[0].type) {
    case 'any.required': {
      return {
        message: 'Reason is required',
      };
    }
    case 'string.max': {
      return {
        message: `Reason length must be less than or equal to 40 characters long`,
      };
    }
    default: {
      return {
        message: 'Reason is error',
      };
    }
  }
};

const validate = (values) => {
  const schema = {
    username: Joi.string()
      .required()
      .max(40)
      .error((errors) => NoteMessage({ errors })),
    password: Joi.string()
      .required()
      .max(40)
      .error((errors) => NoteMessage({ errors })),
  };
  return validateInput({ values, schema });
};

export default validate;
