import Joi from 'joi-browser';
import validateInput from '../../../utils/validateInput';
const validate = (values) => {
  const schema = {
    noteReview: Joi.string()
      .required()
      .max(1500)
      .error(() => ({ message: 'Maximum character is 1500' })),
  };
  return validateInput({ values, schema });
};

export default validate;
