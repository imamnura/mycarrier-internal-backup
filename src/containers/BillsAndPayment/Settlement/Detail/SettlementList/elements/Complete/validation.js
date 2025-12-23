import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validation = yup.object().shape({
  invoiceNumber: yup.string().required().label('Invoice Number'),
});

export default yupResolver(validation);
