import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validation = yup.object().shape({
  customer: yup.object().required().label('Customer'),
});

export default yupResolver(validation);
