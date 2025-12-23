import Joi from 'joi-browser';
import validateInput from '@__old/utils/validateInput';

const validate = (values) => {
  const schema = {
    serviceSpecification: Joi.string().required().label('Spesification'),
    valueAgreement: Joi.string().required().label('Estimasi Value Agreement'),
    hjmPercentage: Joi.number().required().max(200).label('Persenan HJM'),
    hjm: Joi.string().allow(null, '').label('HJM'),
    price: Joi.string().allow(null, '').label('Price'),
    notes: Joi.string().required().max(600).label('Notes'),
    // .error(() => ({ message: 'Maximum character is 600' })),
  };
  return validateInput({ values, schema });
};

export default validate;
