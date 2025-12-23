import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validate = yup.object().shape({
  radioBakes: yup.string().required(),
  bakesNumberAuto: yup
    .string()
    .when('radioBakes', { is: '1', then: yup.string().required() })
    .label('Bakes Number'),
  bakesNumber: yup
    .string()
    .when('radioBakes', { is: '2', then: yup.string().required().max(27) })
    .label('Bakes Number'),
  media: yup
    .object()
    .when('radioBakes', { is: '2', then: yup.object().required() }),
});

export default yupResolver(validate);
