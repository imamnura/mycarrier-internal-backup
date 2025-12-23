import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validation = yup.object().shape({
  type: yup.string().required().label('Type'),
  description: yup.string().required().label('Description'),
});

export default yupResolver(validation);
