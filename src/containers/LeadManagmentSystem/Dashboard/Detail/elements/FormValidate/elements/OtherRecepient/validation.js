import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { phoneRegex } from '@utils/common';

const validation = yup.object().shape({
  fullName: yup.string().required().label('Full Name'),
  phoneNumber: yup
    .string()
    .matches(phoneRegex, 'Phone Number must use the correct format (+62xxx)')
    .required()
    .min(12)
    .label('Phone Number'),
  email: yup.string().required().email().label('Email'),
});

export default yupResolver(validation);
