import Joi from 'joi-browser';
import validateInput from '@__old/utils/validateInput';

const validate = (values) => {
  const schema = {
    productName: Joi.string().max(70).required(),
    productSlug: Joi.string().max(70).required(),
    metaTitle: Joi.string().max(265).required(),
    metaKeyword: Joi.string().max(70).required(),
    metaDesc: Joi.string().max(255).required(),
  };
  return validateInput({ values, schema });
};

export default validate;
