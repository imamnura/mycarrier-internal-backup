import Joi from 'joi-browser';
import validateInput from '../../../utils/validateInput';
const validate = (values) => {
  const schema = {
    operatorId: Joi.required(),
    reportType: Joi.required(),
    reportTime: Joi.required(),
    date: Joi.required(),
    custAccntNum: Joi.required(),
    rangeTime: Joi.required(),
  };
  return validateInput({ values, schema });
};

export default validate;
