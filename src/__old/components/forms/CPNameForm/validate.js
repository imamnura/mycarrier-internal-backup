import Joi from 'joi-browser';
import validateInput from '../../../utils/validateInput';
const validate = (values) => {
  const schema = {
    cpname: Joi.string().required().min(17),
    sid: Joi.string().max(25),
    availableSenderId: Joi.string().error(() => ({
      message: 'Sender ID tidak boleh kosong',
    })),
    noteReview: Joi.optional(),
  };
  return validateInput({ values, schema });
};

export default validate;
