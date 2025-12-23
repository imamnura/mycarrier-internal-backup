import Joi from 'joi-browser';
import validateInput from '@__old/utils/validateInput';
const validate = (values) => {
  const schema = {
    billingMethod: Joi.array().min(1).required(),
    // termOfPayment: Joi.array().min(1).required(),
    termOfPayment: Joi.array().items(Joi.string().required()),
    // termOfPayment: Joi.string().required().max(75).label('Term of Payment'),
    customerBilling: Joi.object({
      companyName: Joi.string().required().max(50).label('Nama Perusahaan'),
      picName: Joi.string().required().max(75).label('Nama'),
      position: Joi.string().required().max(75).label('Jabatan'),
      address: Joi.string().required().max(120).label('Alamat'),
      phoneNumber: Joi.string().required().max(20).label('Nomor Telepon'),
    }),
    paymentDueDate: Joi.string().required().max(75).label('Due Date'),
    paymentDueNote: Joi.string().required().max(20000).label('Notes'),
  };
  return validateInput({ values, schema });
};

export default validate;
