/* eslint-disable no-useless-escape */
import Joi from 'joi-browser';
import validateInput from '../../../utils/validateInput';

export const TicketNumberMessage = ({ errors, maxLength }) => {
  switch (errors[0].type) {
    case 'any.required': {
      return {
        message: 'Ticket Number is required',
      };
    }
    case 'string.max': {
      return {
        message: `Ticket Number length must be less than or equal to ${maxLength} characters long`,
      };
    }
    default: {
      return {
        message: 'Ticket Number is error',
      };
    }
  }
};

const validate = (values, { maxLength }) => {
  const schema = {
    ticketId: Joi.string()
      .required()
      .max(maxLength)
      .error((errors) => TicketNumberMessage({ errors, maxLength })),
  };
  return validateInput({ values, schema });
};

export default validate;
