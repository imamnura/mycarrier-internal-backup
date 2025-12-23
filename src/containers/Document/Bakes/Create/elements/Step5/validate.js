/* eslint-disable no-useless-escape */
import Joi from 'joi-browser';
import validateInput from '@__old/utils/validateInput';

export const phoneNumberMessage = (errors) => {
  switch (errors[0].type) {
    case 'any.required': {
      return {
        message: '"Phone Number" is required',
      };
    }
    case 'string.regex.base': {
      return {
        message: '"Phone Number" must number with +62',
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
    approvalType: Joi.string().required().label('Signature Type'),
    telkomApproval: Joi.array().items(
      Joi.object({
        name: Joi.string().required().max(75).label('Name'),
        position: Joi.string().required().max(75).label('Title'),
        phoneNumber: Joi.string()
          .required()
          .regex(/\+62\d+/)
          .error(phoneNumberMessage),
        email: Joi.string()
          .max(75)
          .required()
          .regex(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4}$)/)
          .error(() => ({
            message: "'Email' must be a valid email",
          })),
      }),
    ),
    customerApproval: Joi.array().items(
      Joi.object({
        name: Joi.string().required().max(75).label('Name'),
        position: Joi.string().required().max(75).label('Title'),
        phoneNumber: Joi.string()
          .required()
          .regex(/\+62\d+/)
          .error(phoneNumberMessage),
        email: Joi.string()
          .max(75)
          .required()
          .regex(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4}$)/)
          .error(() => ({
            message: "'Email' must be a valid email",
          })),
      }),
    ),
  };
  return validateInput({ values, schema });
};

export const isApprovalHasValue = (val) => {
  return val.some((item) => {
    return item.name || item.email || item.position;
  });
};

export default validate;
