import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validation = yup.object().shape({
  type: yup.string().required().label('Type'),
  description: yup.string().required().label('Description'),
  due_date: yup
    .string()
    .required()
    .label('Date')
    .typeError('Date format is not valid'),
  status: yup.string().required().label('Status'),
  priority: yup.string().required().label('Priority'),
  duration: yup.string().required().label('Duration'),
});

export default yupResolver(validation);
