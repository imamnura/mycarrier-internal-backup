import Joi from 'joi-browser';
import validateInput from '../../../utils/validateInput';
const validate = (values) => {
  const schema = {
    ip: Joi.string().optional(),
    port: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
  };
  return validateInput({ values, schema });
};

export default validate;
