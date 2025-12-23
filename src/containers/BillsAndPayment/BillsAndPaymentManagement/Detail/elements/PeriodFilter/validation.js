import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validation = yup.object().shape({
  period: yup
    .string()
    .required()
    .label('Period')
    .typeError('Period is a required field'),
});

export default yupResolver(validation);
