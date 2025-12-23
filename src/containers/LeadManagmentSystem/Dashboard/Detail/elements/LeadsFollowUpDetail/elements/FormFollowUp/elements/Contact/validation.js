import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { phoneRegex } from '@utils/common';

const validation = yup.object().shape({
  contactName: yup.string().required().label('Contact Name'),
  firstName: yup.string().required().label('First Name'),
  lastName: yup.string().required().label('Last Name'),
  email: yup.string().email().required().label('Email'),
  workPhone: yup
    .string()
    .matches(phoneRegex, 'Phone Number must use the correct format (+62xxx)')
    .required()
    .min(12)
    .label('Work Phone'),
  mobilePhone: yup
    .string()
    .matches(phoneRegex, 'Mobile Number must use the correct format (+62xxx)')
    .required()
    .min(12)
    .label('Mobile Phone'),
  twitter: yup.string().optional().label('Twitter'),
  // twitter: yup.string().matches(twitterRegex, `Twitter must start with the '@' character
  // and can't use spaces`).optional().label('Twitter'),
});

export default yupResolver(validation);
