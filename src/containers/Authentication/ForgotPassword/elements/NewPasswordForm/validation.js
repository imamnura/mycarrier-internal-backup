import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validation = yup.object().shape({
  password: yup
    .string()
    .required()
    .min(6)
    .matches(/(?=.*[a-zA-Z])(?=.*[0-9])/, {
      message: 'Password must be a combination of letters and numbers',
    })
    .label('Password'),
  rePassword: yup
    .string()
    .required()
    .oneOf(
      [yup.ref('password'), null],
      'Your new password didn’t match, please type correctly',
    )
    .label('Retype New Password'),
});

export default yupResolver(validation);
