import Joi from 'joi-browser';
import validateInput from '@__old/utils/validateInput';
const validate = (values) => {
  const schema = {
    toc: Joi.array().min(1),
    additionalToc: Joi.string(),
    period: Joi.array().min(2),
  };
  return validateInput({ values, schema });
};

export default validate;
