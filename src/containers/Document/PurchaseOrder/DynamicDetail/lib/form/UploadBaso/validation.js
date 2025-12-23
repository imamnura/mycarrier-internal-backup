import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validation = yup.object().shape({
  media: yup.object().nullable().required().label('BASO'),
  basoType: yup.string().required().label('BASO Type'),
});

export default yupResolver(validation);
