import Joi from 'joi-browser';
import validateInput from '../../../utils/validateInput';

const validate = (values) => {
  const schema = {
    evidence: Joi.string()
      .required()
      .max(1500)
      .error((e) => {
        const type = e[0].type;
        let message = `You didn't give any reason, please describe it`;

        if (type === 'string.max') {
          message = `Maximum character is ${1500}`;
        }

        return {
          message,
        };
      }),
  };
  return validateInput({ values, schema });
};

export default validate;
