import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validate = yup.object().shape({
  date: yup.string().optional().label('Date'),
  customer: yup.string().optional().label('Customer'),
  dateRange: yup.array().optional().label('Date Range'),
});

export default yupResolver(validate);
