import Joi from 'joi-browser';
import validateInput from '../../../utils/validateInput';

const validate = (values, { maxLength }) => {
  const schema = {
    noteApprove: Joi.string()
      .required()
      .max(maxLength)
      .error(() => ({ message: `Maximum character is ${maxLength}` })),
  };
  return validateInput({ values, schema });
};

export default validate;
