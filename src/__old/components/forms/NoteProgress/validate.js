import Joi from 'joi-browser';
import validateInput from '../../../utils/validateInput';
const validate = (values) => {
  const schema = {
    noteProgress: Joi.string()
      .required()
      .max(160)
      .error(() => ({ message: 'Maximum character is 160' })),
  };
  return validateInput({ values, schema });
};

export default validate;
