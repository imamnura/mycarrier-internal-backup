import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validation = yup.object().shape({
  companyName: yup.object().when('isOtherCustomer', {
    is: true,
    then: yup.object().optional().nullable(true).label('Company Name'),
    otherwise: yup
      .object()
      .required()
      .label('Company Name')
      .typeError('Company Name is a required field'),
  }),
  otherCompanyName: yup.string().when('isOtherCustomer', {
    is: true,
    then: yup.string().required().label('Company Name'),
    otherwise: yup.string().optional().label('Company Name'),
  }),
});

export default yupResolver(validation);
