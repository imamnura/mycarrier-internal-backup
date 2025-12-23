import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { phoneRegex } from '@utils/common';

const validation = yup.object().shape({
  // signatureType: yup.string().required().label('Signature Type'),
  agreement: yup.array().of(
    yup.object().shape({
      name: yup.string().required().label('Name'),
      position: yup.string().required().label('Position'),
      email: yup.string().required().email().label('Email'),
      phoneNumber: yup
        .string()
        .matches(
          phoneRegex,
          'Phone Number must use the correct format (+62xxx)',
        )
        .required()
        .min(12)
        .label('Phone Number'),
    }),
  ),
});

export default yupResolver(validation);
