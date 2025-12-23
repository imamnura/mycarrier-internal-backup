import { phoneRegex } from '@utils/common';
import * as yup from 'yup';

const validation = yup.object().shape({
  name: yup.string().required().label('Name'),
  email: yup.string().required().email().label('Email'),
  phoneNumber: yup
    .string()
    .matches(phoneRegex, 'Phone Number must use the correct format (+62xxx)')
    .required()
    .min(12)
    .label('Phone Number'),
});

export default validation;
