import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validation = yup.object().shape({
  // document: yup.object().required().label('Agreement Document').typeError('Agreement Document is a required field'),
  product: yup.string().required().label('Product'),
  revenue: yup.string().required().label('Revenue'),
  subscriptionPeriod: yup
    .number()
    .min(0)
    .required()
    .label('subscriptionPeriod')
    .typeError('Subscription Period is a required field'),
});

export default yupResolver(validation);
