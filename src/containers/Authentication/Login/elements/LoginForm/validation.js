import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validation = yup.object().shape({
  username: yup.string().required().min(6).label('Email or NIK'),
  password: yup
    .string()
    .required()
    .min(6)
    .matches(/(?=.*[a-zA-Z])(?=.*[0-9])/, {
      message: 'Password must be a combination of letters and numbers',
    })
    .label('Password'),
});

export default yupResolver(validation);
