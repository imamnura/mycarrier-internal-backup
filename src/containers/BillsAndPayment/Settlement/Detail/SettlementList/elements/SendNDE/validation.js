import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { phoneRegex } from '@utils/common';

const validation = yup.object().shape({
  type: yup.string().optional(),
  accountManager: yup.object().shape({
    name: yup.string().required().label('Name'),
    phoneNumber: yup
      .string()
      .matches(phoneRegex, 'Phone Number must use the correct format (+62xxx)')
      .required()
      .min(12)
      .label('Phone Number'),
  }),
  generalManager: yup.object().required().label('General Manager Position'),
  reviewer: yup.array().when('type', {
    is: '1',
    then: yup.array().of(
      yup.object().shape({
        name: yup.string().required().label('Name'),
        position: yup.string().required().label('Job Title'),
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
    otherwise: yup.array().optional(),
  }),
});

export default yupResolver(validation);
