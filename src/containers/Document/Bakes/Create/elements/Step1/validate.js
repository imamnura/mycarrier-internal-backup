import Joi from 'joi-browser';
import validateInput from '@__old/utils/validateInput';
const validate = (values) => {
  const schema = {
    telkomPic: Joi.object({
      name: Joi.object({
        value: Joi.string().required().label('Nama'),
        label: Joi.string(),
        data: Joi.object(),
      }).required(),
      position: Joi.string().required().max(75).label('Jabatan'),
      unit: Joi.string().required().label('Unit'),
      alias: Joi.string().required().max(50).label('Alias'),
      nik: Joi.string().required().label('NIK'),
      email: Joi.string().required().email().label('Email'),
    }).required(),
    company: Joi.object({
      name: Joi.string().required().max(50).label('Nama Perusahaan'),
      custAccntNum: Joi.string().optional(),
      npwp: Joi.string().required().label('NPWP'),
      contactPosition: Joi.string().required().max(75).label('Jabatan'),
      contactName: Joi.string().required().max(75).label('Nama'),
      alias: Joi.string().required().max(50).label('Alias'),
    }).required(),
  };
  return validateInput({ values, schema });
};

export default validate;
