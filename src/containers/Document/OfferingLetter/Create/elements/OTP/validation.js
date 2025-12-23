import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validation = yup.object().shape({
  otpCode: yup.string().required().label('OTP Code'),
});

export default yupResolver(validation);
