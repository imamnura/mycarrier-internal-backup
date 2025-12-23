import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validation = yup.object().shape({
  level: yup.string().required().label('Priority Level'),
});

export default yupResolver(validation);
