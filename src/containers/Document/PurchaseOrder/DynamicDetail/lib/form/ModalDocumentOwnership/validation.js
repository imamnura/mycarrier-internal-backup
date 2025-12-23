import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validation = yup.object().shape({
  bakes: yup.object().nullable().required().label('BAKES'),
  purchase: yup.object().nullable().required().label('Purchase Order Document'),
  // additional: yup.object().nullable().optional().label('Additional File'),
  bakesNumber: yup.string().required().label('BAKES Number'),
});

export default yupResolver(validation);
