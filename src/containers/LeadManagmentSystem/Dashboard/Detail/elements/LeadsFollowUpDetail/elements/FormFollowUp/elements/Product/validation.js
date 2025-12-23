import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validation = yup.object().shape({
  autoQuote: yup.boolean().label('Auto Quote'),
  product: yup.object().required().label('Product'),
  productLine: yup.string().optional().label('Product Line'),
  netPrice: yup.string().required().label('Net Price'),
  revenue: yup.string().required().label('Revenue'),
  probability: yup
    .number()
    .typeError('Probability (%) is a required field')
    .required()
    .min(0)
    .max(100)
    .label('Probability (%)'),
  quantity: yup
    .number()
    .typeError('Quantity is a required field')
    .required()
    .min(1)
    .label('Quantity'),
});

export default yupResolver(validation);
